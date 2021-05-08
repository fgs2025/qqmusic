<template>
  <div class="player-ft">
    <div class="left">
      <i class="iconfont icon-shangyishou pointer" @click="prevSong"></i>
      <i class="iconfont icon-jiazai pointer loading" v-if="audio.loading"></i>
      <i
        class="iconfont icon-zanting pointer"
        v-if="audio.palyState"
        @click="palyStateChange"
      ></i>

      <i
        class="iconfont icon-play pointer"
        v-if="!audio.palyState && !audio.loading"
        @click="palyStateChange"
      ></i>
      <i class="iconfont icon-xiayishou pointer" @click="nextSong('next')"></i>
    </div>
    <div class="middle">
      <div class="m_top">
        <span>{{ songInfo.name }}- {{ songInfo.sing }}</span>
        <span>
          {{ audio.currentTime | secondsFormat }} /
          {{ audio.duration | secondsFormat }}</span
        >
      </div>
      <div class="m_bottom">
        <div class="slider__runway pointer" ref="musicSliderWrap">
          <div class="slider__bar" :style="{ width: audio.width + '%' }">
            <div class="slider__button" @mousedown="musicSlider"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="right">
      <template v-for="(item, index) in typeList">
        <i
          v-if="type == index"
          :key="index"
          :class="['iconfont', 'pointer', item.iconfont]"
          :title="item.title"
          @click="palyTyoe"
        ></i
      ></template>
      <div
        :class="['modelBtn', 'pointer', model ? 'on' : '']"
        @click="modelChange"
      >
        <div class="btn">
          <span class="btn-span">{{ model ? "ON" : "OFF" }}</span>
        </div>
        <span class="text">纯净</span>
      </div>
      <i class="iconfont icon-xiazai pointer" @click="download"></i>
      <i
        class="iconfont icon-jingyin pointer"
        v-if="audio.muted"
        @click="shengyin"
      ></i>
      <i class="iconfont icon-shengyin pointer" v-else @click="shengyin"></i>
      <div class="slider__runway pointer" ref="volumeSliderWrap">
        <div class="slider__bar" :style="{ width: audio.volume * 100 + '%' }">
          <div
            class="slider__button"
            ref="sliderButton"
            @mousedown="volumeSlider"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { songUrl } from "@/api/song.js";
export default {
  props: ["audio", "songInfo", "model", "type", "songlist", "ind", "indList"],
  data() {
    return {
      slider: {
        volumeSliderWrap: 0, //音量外层宽度
        volumeStartX: 0, //音量点击时的位置
        volumeBeginX: 0, //音量当前的位置
        musicSliderWrap: 0, //音乐进度条外层宽度
        musicStartX: 0, //音乐进度条点击时的位置
        musicBeginX: 0, //音乐进度条当前的位置
      },
      typeList: [
        {
          iconfont: "icon-xunhuan",
          title: "列表循环",
          type: 0,
        },
        {
          iconfont: "icon-singlecycle",
          title: "单曲循环",
          type: 1,
        },
        {
          iconfont: "icon-suijibofang",
          title: "随机播放",
          type: 2,
        },
      ],
      inds: 0,
      indLists: [],
    };
  },
  methods: {
    volumeSlider(event) {
      //音量按下事件
      this.slider.volumeStartX = event.clientX;
      this.slider.volumeSliderWrap = this.$refs.volumeSliderWrap.offsetWidth;
      this.slider.volumeBeginX = this.audio.volume;
      document.onmousemove = (event) => {
        let begin_x = this.slider.volumeBeginX;
        let scale =
          begin_x -
          (this.slider.volumeStartX - event.clientX) /
            this.slider.volumeSliderWrap;
        if (scale >= 1) {
          scale = 1;
        }
        if (scale <= 0) {
          scale = 0;
        }
        this.audio.volume = scale;
      };
      document.onmouseup = () => {
        document.onmousemove = null;
        document.onmouseup = null;
      };
    },

    musicSlider(event) {
      //音乐进度条按下事件
      if (this.audio.audioUrl) {
        if (!this.audio.loading) {
          let palyState = false;
          this.$emit("palyStateChange", palyState);
          this.slider.musicStartX = event.clientX;
          this.slider.musicSliderWrap = this.$refs.musicSliderWrap.offsetWidth;
          this.slider.musicBeginX = this.audio.width;
          document.onmousemove = (event) => {
            let begin_x = this.slider.musicBeginX;
            let scale =
              begin_x -
              ((this.slider.musicStartX - event.clientX) /
                this.slider.musicSliderWrap) *
                100;
            if (scale >= 100) {
              scale = 100;
            }
            if (scale <= 0) {
              scale = 0;
            }
            this.audio.width = scale;
            let currentTime = (this.audio.width / 100) * this.audio.duration;
            this.$emit("currentTimeChange", currentTime);
          };
          document.onmouseup = () => {
            document.onmousemove = null;
            document.onmouseup = null;
            let palyState = true;
            this.$emit("palyStateChange", palyState);
          };
        }
      }
    },

    palyStateChange() {
      if (this.audio.audioUrl) {
        let palyState = !this.audio.palyState;
        this.$emit("palyStateChange", palyState);
      }
    },
    prevSong() {
      //上一首
      this.indLists.splice(this.indLists.length - 1, 1);
      if (this.indLists.length > 0) {
        this.inds = this.indLists[this.indLists.length - 1];
      } else {
        if (this.type == 0 || this.type == 1) {
          if (this.inds == 0) {
            this.inds = this.songlist.length - 1;
          } else {
            this.inds--;
          }
        }
        this.randomPlay();
      }
    },
    nextSong(next) {
      //下一首
      if (this.type == 0 || this.type == 1) {
        //列表循环
        if (next || this.type != 1) {
          if (this.inds >= this.songlist.length - 1) {
            this.inds = 0;
          } else {
            this.inds++;
          }
        }
      }
      this.randomPlay();
    },
    randomPlay() {
      //随机播放
      if (this.type == 2) {
        if (this.songlist.length > 1) {
          let pInd = this.inds;
          let nInd = Math.floor(Math.random() * this.songlist.length);
          if (nInd == pInd) {
            this.randomPlay();
          } else {
            this.inds = nInd;
          }
        }
      }
    },
    palyTyoe() {
      //播放类型
      let types = this.type;
      if (types >= this.typeList.length - 1) {
        types = 0;
      } else {
        types++;
      }
      if (types == 1) {
        this.audio.loop = true;
      } else {
        this.audio.loop = false;
      }
      this.$emit("typeChange", types);
    },

    shengyin() {
      //音量静音事件
      this.audio.muted = !this.audio.muted;
    },

    download() {
      //音乐下载
      if (this.songlist.length > 0) {
        let id = "";
        if (this.songlist[this.ind].songmid) {
          id = this.songlist[this.ind].songmid;
        } else {
          id = this.songlist[this.ind].mid;
        }
        songUrl(id).then((res) => {
          window.open(res.data);
        });
      }
    },

    modelChange() {
      let models = !this.model;
      this.$emit("modelChange", models);
    },
  },
  watch: {
    ind(val) {
      this.inds = val;
    },
    inds(val) {
      this.$emit("nextplay", val);
    },
    indList(val) {
      this.indLists = val;
    },
    indLists(val) {
      this.$emit("indListChange", val);
    },
  },
};
</script>

<style lang="less" scoped>
.player-ft {
  margin: 0 7.638889%;

  height: 11%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 10px;
  .left {
    i {
      color: #ccc;
      font-size: 35px;
      &:hover {
        color: #fff;
      }
      & + i {
        margin-left: 20px;
      }
    }
  }
  .middle {
    flex: 1;
    margin-left: 30px;
    .m_top {
      color: #ccc;
      font-size: 14px;
      display: flex;
      justify-content: space-between;
    }
    .m_bottom {
      margin-top: 10px;
      .slider__runway {
        width: 100%;
        height: 3px;
        background-color: rgba(204, 204, 204, 0.5);
        border-radius: 2px;
        position: relative;
        .slider__bar {
          height: 3px;
          background-color: #fff;
          position: absolute;
          left: 0;
          top: 0;
          .slider__button {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background-color: #fff;
            position: absolute;
            top: 50%;
            right: -5px;
            transform: translate(0, -50%);
          }
        }
      }
    }
  }
  .right {
    width: 400px;
    margin-left: 20px;
    display: flex;
    align-items: center;
    i {
      color: #ccc;
      font-size: 30px;
      &:hover {
        color: #fff;
      }
      & + i {
        margin-left: 20px;
      }
    }
    .modelBtn {
      width: 70px;
      height: 26px;
      margin: 0 20px;
      border-radius: 20px;
      border: 2px solid #ccc;
      position: relative;

      .btn {
        width: 20px;
        height: 20px;
        background-color: #ccc;
        border-radius: 50%;
        position: absolute;
        top: 50%;
        left: 5px;
        transform: translateY(-50%);
        display: flex;
        align-items: center;
        justify-content: center;
        color: black;
        transition: all 1s;
        .btn-span {
          display: inline-block;
          font-size: 12px;
          transform: scale(0.7);
        }
      }
      .text {
        position: absolute;
        left: 30px;
        top: 50%;
        transform: translateY(-50%);
        color: #ccc;
        transition: all 1s;
      }
    }
    .on {
      .btn {
        left: 45px;
      }
      .text {
        left: 10px;
      }
    }
    .slider__runway {
      margin-left: 10px;
      // width: 100%;
      flex: 1;
      height: 3px;
      background-color: rgba(204, 204, 204, 0.5);
      border-radius: 2px;
      position: relative;
      .slider__bar {
        height: 3px;
        background-color: #fff;
        position: absolute;
        left: 0;
        top: 0;
        .slider__button {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background-color: #fff;
          position: absolute;
          top: 50%;
          right: -5px;
          transform: translate(0, -50%);
        }
      }
    }
  }
}
</style>