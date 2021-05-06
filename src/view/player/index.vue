<template>
  <div class="player-wrap">
    <div class="bg_player_mask absolute w100h100 left0top0"></div>
    <div
      class="bg_player absolute w100h100 left0top0"
      :style="{ backgroundImage: `url(${imgUrl})` }"
    ></div>
    <div class="player-box w100h100 left0top0">
      <top></top>
      <div class="player-main">
        <songLists
          :model="model"
          :audio="audio"
          :ind="ind"
          :songlist="songlist"
          @songPlay="songPlay"
          ref="songLists"
        ></songLists>
        <lyric
          :model="model"
          :imgUrl="imgUrl"
          :songInfo="songInfo"
          :currentTime="audio.currentTime"
          :lyricsObjArr="lyricsObjArr"
        ></lyric>
      </div>
      <div class="player-ft">
        <div class="left">
          <i class="iconfont icon-shangyishou pointer" @click="prevSong"></i>
          <i
            class="iconfont icon-jiazai pointer loading"
            v-if="audio.loading"
          ></i>
          <i
            class="iconfont icon-zanting pointer"
            v-if="audio.palyState"
            @click="audio.palyState = false"
          ></i>

          <i
            class="iconfont icon-play pointer"
            v-if="!audio.palyState && !audio.loading"
            @click="audio.palyState = true"
          ></i>
          <i
            class="iconfont icon-xiayishou pointer"
            @click="nextSong('next')"
          ></i>
        </div>
        <div class="middle">
          <div class="m_top">
            <span>{{ songInfo.name }} - {{ songInfo.sing }}</span>
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
            @click="model = !model"
          >
            <div class="btn">
              <span class="btn-span">{{ model ? "ON" : "OFF" }}</span>
            </div>
            <span class="text">纯净</span>
          </div>
          <i class="iconfont icon-xiazai pointer" @click="xiazai"></i>
          <i
            class="iconfont icon-jingyin pointer"
            v-if="audio.muted"
            @click="shengyin"
          ></i>
          <i
            class="iconfont icon-shengyin pointer"
            v-else
            @click="shengyin"
          ></i>
          <div class="slider__runway pointer" ref="volumeSliderWrap">
            <div
              class="slider__bar"
              :style="{ width: audio.volume * 100 + '%' }"
            >
              <div
                class="slider__button"
                ref="sliderButton"
                @mousedown="volumeSlider"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <audio
        ref="audio"
        :src="audio.audioUrl"
        autoplay
        :loop="audio.loop"
        @play="play"
        @loadedmetadata="onLoadedmetadata"
        @timeupdate="timeupdate"
        @ended="ended"
      ></audio>
    </div>
  </div>
</template>

<script>
import { songlist } from "@/api/songList.js";
import { songUrls, song, songUrl, songLyric } from "@/api/song.js";
export default {
  data() {
    return {
      songlist: [], //歌单列表
      ind: 0, //第几首歌
      imgUrl: "", //背景虚化图
      songInfo: {
        name: "", //歌名
        sing: "", //歌手名
        album: "",
      },
      lyricsObjArr: [],
      audio: {
        palyState: true, //播放状态
        audioUrl: "", //当前播放的音乐链接
        currentTime: 0, //当前播放的进度
        duration: 0, //当前歌曲的总长度
        width: 0, //歌曲播放进度条宽度
        volume: 1, //音量
        muted: false, //是否静音
        loop: false, //是否循环播放
        loading: false, //加载
      },
      type: 0, //播放类型,顺序，单曲，随机
      indList: [], //播放过的歌曲
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
      slider: {
        volumeSliderWrap: 0, //音量外层宽度
        volumeStartX: 0, //音量点击时的位置
        volumeBeginX: 0, //音量当前的位置
        musicSliderWrap: 0, //音乐进度条外层宽度
        musicStartX: 0, //音乐进度条点击时的位置
        musicBeginX: 0, //音乐进度条当前的位置
      },
      timer: null,
      model: false,
    };
  },
  mounted() {
    this.getSongList();
  },
  methods: {
    volumeSlider(event) {
      //音量按下事件
      this.slider.volumeStartX = event.clientX;
      this.slider.volumeSliderWrap = this.$refs.volumeSliderWrap.offsetWidth;
      this.slider.volumeBeginX = this.audio.volume;
      document.body.addEventListener("mousemove", this.volumeSlidermove);
      document.body.addEventListener("mouseup", this.volumeSliderRemove);
    },
    volumeSliderRemove() {
      //音量清除事件
      document.body.removeEventListener("mousemove", this.volumeSlidermove);
      document.body.removeEventListener("mouseup", this.volumeSliderRemove);
    },
    volumeSlidermove(event) {
      //音量按下的操作
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
      this.$refs.audio.volume = scale;
    },

    musicSlider(event) {
      //音乐进度条按下事件
      if (!this.audio.loading) {
        this.$refs.audio.pause();
        this.slider.musicStartX = event.clientX;
        this.slider.musicSliderWrap = this.$refs.musicSliderWrap.offsetWidth;
        this.slider.musicBeginX = this.audio.width;
        document.body.addEventListener("mousemove", this.musicSliderMove);
        document.body.addEventListener("mouseup", this.musicSliderRemove);
      }
    },
    musicSliderRemove() {
      //音乐进度条清除事件
      document.body.removeEventListener("mousemove", this.musicSliderMove);
      document.body.removeEventListener("mouseup", this.musicSliderRemove);
      this.$refs.audio.play();
    },
    musicSliderMove(event) {
      //音乐进度条的按下操作
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
      this.audio.currentTime = (this.audio.width / 100) * this.audio.duration;
      this.$refs.audio.currentTime = this.audio.currentTime;
    },

    play() {
      //音乐开始播放了
      this.audio.palyState = true;
      this.audio.loading = false;
    },
    xiazai() {
      //音乐下载
      let id = this.songlist[this.ind].songmid;
      songUrl(id).then((res) => {
        window.open(res.data);
      });
    },
    shengyin() {
      //音量静音事件
      this.audio.muted = !this.audio.muted;
      this.$refs.audio.muted = this.audio.muted;
    },
    onLoadedmetadata(e) {
      //音乐总长度
      this.audio.duration = Math.floor(e.target.duration);
    },
    timeupdate(e) {
      //音乐播放到哪了
      let currentTime = e.target.currentTime;
      this.audio.currentTime = currentTime;
      this.audio.width = (currentTime / this.audio.duration) * 100;
    },
    palyTyoe() {
      //播放类型
      if (this.type >= this.typeList.length - 1) {
        this.type = 0;
      } else {
        this.type++;
      }
      if (this.type == 1) {
        this.audio.loop = true;
      } else {
        this.audio.loop = false;
      }
    },
    setSongInfo() {
      this.songInfo.name = this.songlist[this.ind].songname;
      this.songInfo.sing = this.songlist[this.ind].singer[0].name;
      this.songInfo.album = this.songlist[this.ind].albumname;
    },
    prevSong() {
      //上一首
      this.indList.splice(this.indList.length - 1, 1);
      if (this.indList.length > 0) {
        this.ind = this.indList[this.indList.length - 1];
      } else {
        if (this.type == 0 || this.type == 1) {
          if (this.ind == 0) {
            this.ind = this.songlist.length - 1;
          } else {
            this.ind--;
          }
        }
        this.randomPlay();
      }
      // this.scroll();
       this.$nextTick(() => {
          this.$refs.songLists.scroll();
        });
      let id = this.songlist[this.ind].songmid;
      this.setSongInfo();
      this.songUrls(id);
    },
    nextSong(next) {
      //下一首
      if (this.type == 0 || this.type == 1) {
        //列表循环
        if (next || this.type != 1) {
          if (this.ind >= this.songlist.length - 1) {
            this.ind = 0;
          } else {
            this.ind++;
          }
        }
      }
      this.randomPlay();
      if (this.type != 1) {
        this.indList.push(this.ind);
      }
      // this.scroll();
       this.$nextTick(() => {
          this.$refs.songLists.scroll();
        });
      let id = this.songlist[this.ind].songmid;
      this.setSongInfo();
      this.songUrls(id);
    },

    randomPlay() {
      //随机播放
      if (this.type == 2) {
        let pInd = this.ind;
        let nInd = Math.floor(Math.random() * this.songlist.length);
        if (nInd == pInd) {
          this.randomPlay();
        } else {
          this.ind = nInd;
        }
      }
    },
    ended() {
      //歌曲播放结束
      this.nextSong();
    },
    songPlay(index) {
      //双击听歌
      if (index == this.ind && this.audio.loading) {
        return;
      }
      if (index == this.ind && this.audio.palyState) {
        this.audio.palyState = false;
        return;
      }
      if (index == this.ind && !this.audio.palyState) {
        this.audio.palyState = true;
        return;
      }
      if (index != this.ind) {
        this.ind = index;
        this.indList.push(this.ind);
        // this.scroll("click");
        let id = this.songlist[this.ind].songmid;
        this.setSongInfo();
        this.songUrls(id);
      }
    },
    songUrls(id) {
      //获取播放链接
      songUrls(id).then((res) => {
        clearTimeout(this.timer);
        this.audio.audioUrl = "";
        if (res.data[id]) {
          this.audio.audioUrl = res.data[id];
          this.audio.palyState = false;
          this.audio.loading = true;
        } else {
          this.audio.loading = true;
          this.audio.palyState = false;
          this.timer = setTimeout(() => {
            this.nextSong();
          }, 5000);
        }
      });
      songLyric(id).then((res) => {
        this.lyricsObjArr = [];
        let lyric = res.data.lyric;
        const regNewLine = /\n/;
        const lineArr = lyric.split(regNewLine); // 每行歌词的数组
        const regTime = /\[\d{2}:\d{2}.\d{2,3}\]/;
        lineArr.forEach((item) => {
          if (item === "") return;
          const obj = {};
          const time = item.match(regTime);
          obj.lyric =
            item.split("]")[1].trim() === "" ? "" : item.split("]")[1].trim();
          obj.time = time
            ? this.formatLyricTime(time[0].slice(1, time[0].length - 1))
            : 0;
          obj.uid = Math.random().toString().slice(-6);
          if (obj.lyric === "") {
            return;
          } else {
            this.lyricsObjArr.push(obj);
          }
        });
      });
      //获取背景虚化图
      song(id).then((res) => {
        let mid = res.data.track_info.album.mid;
        this.imgUrl = `https://y.gtimg.cn/music/photo_new/T002R300x300M000${mid}.jpg`;
      });
    },
    formatLyricTime(time) {
      // 格式化歌词的时间 转换成 sss:ms
      const regMin = /.*:/;
      const regSec = /:.*\./;
      const regMs = /\./;
      let sec = "";
      let ms = "";
      const min = parseInt(time.match(regMin)[0].slice(0, 2));
      if (time.match(regSec)) {
        sec = parseInt(time.match(regSec)[0].slice(1, 3));
      }
      if (time.match(regMs) && time.match(regMs)) {
        ms = time.slice(
          time.match(regMs).index + 1,
          time.match(regMs).index + 3
        );
      }
      if (min !== 0) {
        sec += min * 60;
      }
      return Number(sec + "." + ms);
    },
    getSongList() {
      //获取歌单详情
      let id = window.localStorage.getItem("songListId");
      songlist(id).then((res) => {
        this.songlist = res.data.songlist.slice(0, 200);
        this.indList.push(this.ind);
        let songId = this.songlist[this.ind].songmid;
        this.setSongInfo();
        this.songUrls(songId);
        this.$nextTick(() => {
          this.$refs.songLists.scroll();
        });
      });
    },
  },

  watch: {
    "audio.palyState"(val) {
      if (val) {
        this.$refs.audio.play();
      } else {
        this.$refs.audio.pause();
      }
    },
  },
  components: {
    top: require("./components/top.vue").default, //顶部
    songLists: require("./components/songList.vue").default, //歌曲列表
    lyric: require("./components/lyric.vue").default, //歌词
  },
};
</script>

<style lang="less" scoped>
.player-wrap {
  height: 100%;
  .bg_player {
    z-index: 1;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 50%;
    filter: blur(65px);
    opacity: 0.6;
    transition: background-image 1s;
  }
  .bg_player_mask {
    background-color: rgba(0, 0, 0, 0.35);
    z-index: 2;
  }
  .player-box {
    z-index: 9999;
    display: flex;
    flex-direction: column;
    position: relative;

    .player-main {
      flex: 1;
      margin: 0 7.638889%;
      display: flex;
      position: relative;
      justify-content: space-between;
      overflow: hidden;
    }

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
  }
}
</style>