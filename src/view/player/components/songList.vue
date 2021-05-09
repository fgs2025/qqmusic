<template>
  <div :class="['bd_left', model ? 'opacity' : '']">
    <div class="mod_songlist_toolbar">
      <div class="bar pointer" @click="empty">清空列表</div>
    </div>
    <div class="sb_main" ref="main">
      <template v-if="songlist.length > 0">
        <div class="header item-box">
          <div class="num"></div>
          <div class="name-box">歌曲</div>
          <div class="sing">歌手</div>
          <div class="time-box">时长</div>
        </div>
        <div
          :class="[
            'item-box',
            audio.palyState && index == ind ? 'paly' : '',
            audio.loading && index == ind ? 'loadingAnimation' : '',
          ]"
          v-for="(item, index) in songlist"
          :key="index"
          @dblclick="songPlay(index)"
        >
          <div class="num">
            <i
              class="iconfont icon-jiazai pointer loading"
              v-if="audio.loading && index == ind"
            ></i>
            <template
              v-else-if="
                (audio.palyState && index != ind) ||
                audio.loading ||
                !audio.palyState
              "
              >{{ index + 1 }}</template
            >
            <span
              class="paly"
              v-if="!audio.loading && index == ind && audio.palyState"
            ></span>
          </div>
          <div class="name-box">
            <span class="name">{{
              item.songname || item.title || item.name
            }}</span>
            <span class="btn-box">
              <span
                class="btn pointer"
                v-if="audio.palyState && index == ind"
                @click="palyStateChange"
              >
                <i class="iconfont icon-zanting"></i>
              </span>
              <span class="btn pointer" v-else @click="songPlay(index)">
                <i class="iconfont icon-play"></i>
              </span>
            </span>
          </div>
          <div class="sing">
            <span class="pointer">{{ item.singer[0].name }}</span>
          </div>
          <div class="time-box">
            <span class="time">{{ item.interval | secondsFormat }}</span>
            <span class="delete-btn pointer" @click.stop="deleteSong(index)">
              <i class="iconfont icon-shanchu"></i>
            </span>
          </div>
        </div>
        <div class="tick" v-if="tick" @click="tickClick">
          <i class="iconfont icon-ico_qiyeF9_baxin2x pointer"></i>
        </div>
      </template>
      <div class="prompt" v-else>暂无歌曲，快去添加歌曲吧</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["model", "audio", "ind", "songlist"],
  data() {
    return {
      tick: false, //定位
      scrollTop: 0, //歌单列表的位置
    };
  },
  methods: {
    empty() {
      this.$emit("empty");
    },
    deleteSong(index) {
      this.$emit("deleteSong", index);
    },
    scroll(click) {
      //播放歌曲定位事件
      if (this.songlist.length > 0) {
        let childEl = this.$refs.main.children[this.ind + 1].offsetTop;
        let parentEl = this.$refs.main.offsetTop;
        this.scrollTop = childEl - parentEl - 55;
        if (!click) {
          this.$refs.main.scrollTop = this.scrollTop;
        }
        this.$refs.main.addEventListener("scroll", (e) => {
          let f = e.target.scrollTop;
          if (f - this.scrollTop >= 100 || this.scrollTop - f >= 100) {
            this.tick = true;
          } else {
            this.tick = false;
          }
        });
      }
    },
    songPlay(index) {
      //双击听歌
      if (index == this.ind && this.audio.loading) {
        return;
      }
      if (index == this.ind && this.audio.palyState) {
        let palyState = false;
        this.$emit("palyStateChange", palyState);
        return;
      }
      if (index == this.ind && !this.audio.palyState) {
        let palyState = true;
        this.$emit("palyStateChange", palyState);
        return;
      }
      if (index != this.ind) {
        this.$emit("nextplay", index);
      }
    },
    palyStateChange() {
      let palyState = false;
      this.$emit("palyStateChange", palyState);
    },
    tickClick() {
      //在播放歌曲定位事件
      this.$refs.main.scrollTop = this.scrollTop;
    },
  },
};
</script>

<style lang="less" scoped>
.bd_left {
  display: flex;
  flex-direction: column;
  position: relative;
  // opacity: 0;

  flex: 1;
  .mod_songlist_toolbar {
    display: flex;
    margin-bottom: 30px;
    line-height: 38px;
    font-size: 14px;
    color: #ccc;
    .bar {
      padding: 0 23px;
      border: 1px solid #ccc;
      cursor: pointer;
      &:hover {
        color: #fff;
        border-color: #fff;
      }
    }
  }
  .sb_main {
    overflow: auto;
    height: 100%;
    .prompt {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #ccc;
    }
    .header {
      border-top: 1px solid rgba(224, 224, 224, 0.2);
    }
    .item-box {
      height: 50px;
      line-height: 50px;
      padding-left: 4px;
      padding-right: 20px;
      display: flex;

      color: #ccc;
      font-size: 14px;
      border-bottom: 1px solid rgba(225, 225, 225, 0.2);
      box-sizing: border-box;
      .num {
        // width: 36px;
        width: 3%;
        text-align: center;
        .paly {
          display: inline-block;
          width: 10px;
          height: 10px;
          background-image: url(https://y.gtimg.cn/mediastyle/yqq/img/wave.gif?max_age=2592000&v=78979d47cc7dc55cab5d36b4c96168d5);
        }
      }
      .name-box {
        // width: 695px;
        width: 70%;
        padding-right: 20px;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        .name {
          overflow: hidden; /*超出部分隐藏*/
          white-space: nowrap; /*不换行*/
          text-overflow: ellipsis; /*超出部分文字以...显示*/
        }
        .btn-box {
          display: none;
          .btn {
            display: inline-block;
            width: 35px;
            height: 35px;
            text-align: center;
            line-height: 35px;
            border-radius: 50%;
            border: 1px solid #ccc;
            &:hover {
              color: #fff;
              border: 1px solid #fff;
            }
            & + .btn {
              margin-left: 10px;
            }
          }
        }
      }
      .sing {
        // width: 265px;
        width: 22%;
        span {
          &:hover {
            color: #fff;
          }
        }
      }
      .time-box {
        // width: 50px;
        width: 5%;
        display: flex;
        align-items: center;
        .delete-btn {
          display: none;
          width: 35px;
          height: 35px;
          text-align: center;
          line-height: 35px;
          border-radius: 50%;
          border: 1px solid #ccc;
          &:hover {
            color: #fff;
            border: 1px solid #fff;
          }
        }
      }
      &:hover .time-box > .time {
        display: none;
      }
      &:hover .time-box > .delete-btn {
        display: inline-block;
      }
      &:hover .name-box > .btn-box {
        display: block;
      }
    }
    .paly {
      .name {
        color: #fff;
      }
      .pointer {
        color: #fff;
      }
    }
    &::-webkit-scrollbar {
      width: 5px;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 5px;
      background: rgba(225, 225, 225, 0.4);
    }
    &::-webkit-scrollbar-track {
      border-radius: 5px;
    }
    .tick {
      position: absolute;
      bottom: 10px;
      right: 10px;
      width: 20px;
      height: 20px;
      text-align: center;
      line-height: 20px;
      background-color: rgba(250, 250, 250, 0.3);
      border-radius: 50%;
      i {
        opacity: 0.5;
      }
    }
  }
}
.opacity {
  opacity: 0;
}
</style>