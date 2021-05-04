<template>
  <div class="player-wrap">
    <div class="bg_player_mask absolute w100h100 left0top0"></div>
    <div
      class="bg_player absolute w100h100 left0top0"
      :style="{ backgroundImage: `url(${imgUrl})` }"
    ></div>
    <div class="player-box w100h100 left0top0">
      <div class="top">
        <div class="logo">
          <img
            class="pointer"
            src="https://y.qq.com/mediastyle/yqq/img/player_logo.png"
            alt=""
          />
        </div>
        <div class="info">
          <!-- <img class="pointer" :src="img" alt="" />
          <span class="pointer">退出</span> -->
        </div>
      </div>
      <div class="player-main">
        <!-- <div class="player__bd"> -->
        <div class="bd_left">
          <div class="mod_songlist_toolbar">
            <div class="bar pointer">
              <i class="iconfont icon-shoucang"></i>
              收藏
            </div>
            <div class="bar pointer">
              <i class="iconfont icon-tianjia"></i>添加到
            </div>
            <div class="bar pointer">
              <i class="iconfont icon-xiazai"></i>下载
            </div>
            <div class="bar pointer">
              <i class="iconfont icon-shanchu"></i>删除
            </div>
            <div class="bar pointer">
              <i class="iconfont icon-qingkong"></i>清空列表
            </div>
          </div>
          <div class="sb_main">
            <div class="header item-box">
              <div class="header-songname">歌曲</div>
              <div class="header-sing">歌手</div>
              <div class="header-time">时长</div>
            </div>
            <div
              :class="[
                'item-box',
                audio.palyState && index == ind ? 'paly' : '',
              ]"
              v-for="(item, index) in songlist"
              :key="index"
              @dblclick="songPlay(item, index)"
            >
              <div class="num">
                <span
                  class="paly"
                  v-if="audio.palyState && index == ind"
                ></span>
                <template v-else>{{ index + 1 }}</template>
              </div>
              <div class="name-box">
                <span class="name">{{ item.songname }}</span>
                <span class="btn-box">
                  <span
                    class="btn pointer"
                    v-if="audio.palyState && index == ind"
                    @click="audio.palyState = false"
                  >
                    <i class="iconfont icon-zanting"></i>
                  </span>
                  <span
                    class="btn pointer"
                    v-else
                    @click="songPlay(item, index)"
                  >
                    <i class="iconfont icon-play"></i>
                  </span>
                  <!-- <span class="btn pointer">
                    <i class="iconfont icon-qingkong"></i>
                  </span> -->
                </span>
              </div>
              <div class="sing">
                <span class="pointer">{{ item.singer[0].name }}</span>
              </div>
              <div class="time-box">
                <span class="time">{{ item.interval | secondsFormat }}</span>
                <span class="delete-btn pointer">
                  <i class="iconfont icon-shanchu"></i>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="bd_right">2</div>
        <!-- </div> -->
      </div>
      <div class="player-ft">
        <div class="left">
          <i class="iconfont icon-shangyishou pointer" @click="prevSong"></i>
          <i
            class="iconfont icon-zanting pointer"
            v-if="audio.palyState"
            @click="audio.palyState = false"
          ></i>
          <i
            class="iconfont icon-play pointer"
            v-else
            @click="audio.palyState = true"
          ></i>
          <i
            class="iconfont icon-xiayishou pointer"
            @click="nextSong('next')"
          ></i>
        </div>
        <div class="middle">
          <div class="m_top">
            <span>{{ name }} - {{ sing }}</span>
            <span>
              {{ audio.currentTime | secondsFormat }} /
              {{ audio.duration | secondsFormat }}</span
            >
          </div>
          <div class="m_bottom">
            <div class="slider__runway pointer">
              <div class="slider__bar" :style="{ width: audio.width + '%' }">
                <div class="slider__button"></div>
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

          <i class="iconfont icon-pinglun pointer"></i>
          <i class="iconfont icon-shoucang pointer"></i>
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
          <div class="slider__runway pointer">
            <div
              class="slider__bar"
              :style="{ width: audio.volume * 100 + '%' }"
            >
              <div class="slider__button"></div>
            </div>
          </div>
        </div>
      </div>
      <audio
        ref="audio"
        :src="audio.audioUrl"
        controls
        autoplay
        @loadedmetadata="onLoadedmetadata"
        @timeupdate="timeupdate"
        @ended="ended"
        @volumechange="volumechange"
      ></audio>
    </div>
  </div>
</template>

<script>
import { songlist } from "@/api/songList.js";
import { songUrls, song, songUrl } from "@/api/song.js";
export default {
  data() {
    return {
      songlist: [], //歌单列表
      ind: 0, //第几首歌
      imgUrl: "", //背景虚化图
      name: "",
      sing: "",
      audio: {
        palyState: true, //播放状态
        audioUrl: "", //当前播放的音乐链接
        currentTime: 0, //当前播放的进度
        duration: 0, //当前歌曲的总长度
        width: 0,
        volume: 0,
        muted: false,
      },
      type: 0,
      indList: [],
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
    };
  },
  mounted() {
    this.getSongList();
    this.audio.volume = this.$refs.audio.volume;
  },
  methods: {
    xiazai() {
      let id = this.songlist[this.ind].songmid;
      songUrl(id).then((res) => {
        window.open(res.data);
      });
    },
    volumechange(e) {
      this.audio.volume = e.target.volume;
    },
    shengyin() {
      this.audio.muted = !this.audio.muted;
      this.$refs.audio.muted = this.audio.muted;
    },
    onLoadedmetadata(e) {
      this.audio.duration = Math.floor(e.target.duration);
    },
    timeupdate(e) {
      let currentTime = e.target.currentTime;
      this.audio.currentTime = currentTime;
      this.audio.width = parseInt((currentTime / this.audio.duration) * 100);
    },
    palyTyoe() {
      //播放类型
      if (this.type >= this.typeList.length - 1) {
        this.type = 0;
      } else {
        this.type++;
      }
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
      let id = this.songlist[this.ind].songmid;
      this.name = this.songlist[this.ind].songname;
      this.sing = this.songlist[this.ind].singer[0].name;
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
      this.audio.audioUrl = "";
      let id = this.songlist[this.ind].songmid;
      this.name = this.songlist[this.ind].songname;
      this.sing = this.songlist[this.ind].singer[0].name;
      this.songUrls(id);
    },
    randomPlay() {
      if (this.type == 2) {
        //随机播放
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
      this.audio.autoplay = false;
      this.nextSong();
    },
    songPlay(item, index) {
      //双击听歌
      if (index == this.ind && this.audio.palyState) {
        this.audio.palyState = false;
        return;
      }
      this.audio.palyState = true;
      if (index != this.ind) {
        this.ind = index;
        this.indList.push(this.ind);
      }
      let id = item.songmid;
      this.name = this.songlist[this.ind].songname;
      this.sing = this.songlist[this.ind].singer[0].name;
      this.songUrls(id);
    },
    songUrls(id) {
      //获取播放链接
      songUrls(id).then((res) => {
        this.audio.audioUrl = res.data[id];
      });
      //获取背景虚化图
      song(id).then((res) => {
        let mid = res.data.track_info.album.mid;
        this.imgUrl = `https://y.gtimg.cn/music/photo_new/T002R300x300M000${mid}.jpg`;
      });
    },
    getSongList() {
      //获取歌单详情
      let id = window.localStorage.getItem("songListId");
      songlist(id).then((res) => {
        this.songlist = res.data.songlist.slice(0, 10);
        this.indList.push(this.ind);
        let songId = this.songlist[this.ind].songmid;
        this.name = this.songlist[this.ind].songname;
        this.sing = this.songlist[this.ind].singer[0].name;
        this.songUrls(songId);
      });
    },
  },
  filters: {
    secondsFormat(value) {
      if (!value) return "";
      let interval = Math.floor(value);
      let minute = Math.floor(interval / 60)
        .toString()
        .padStart(2, "0");
      let second = (interval % 60).toString().padStart(2, "0");
      return `${minute}:${second}`;
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
};
</script>

<style lang="less" scoped>
.player-wrap {
  // height: 100vh;
  height: 100%;

  .bg_player {
    z-index: 1;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 50%;
    filter: blur(65px);
    opacity: 0.6;
    // background-image: url();
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
    .top {
      padding: 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .logo {
        img {
          opacity: 0.3;
          &:hover {
            opacity: 1;
          }
        }
      }
      .info {
        display: flex;
        align-items: center;
        justify-content: space-between;
        img {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          margin-right: 20px;
        }
        span {
          font-size: 12px;
          color: #ccc;
        }
      }
    }
    .player-main {
      flex: 1;
      margin: 0 7.638889%;
      display: flex;
      // flex-direction: column;
      justify-content: space-between;
      overflow: hidden;
      // .player__bd {
      //   display: flex;
      //   justify-content: space-between;
      //   // flex: 1;
      //   height: 100%;
      .bd_left {
        display: flex;
        flex-direction: column;
        .mod_songlist_toolbar {
          display: flex;
          margin-bottom: 30px;
          .bar {
            padding: 0 23px;
            height: 38px;
            line-height: 38px;
            border: 1px solid rgba(244, 244, 244, 0.3);
            min-width: 122px;
            text-align: center;
            box-sizing: border-box;
            font-size: 14px;
            color: #ccc;
            i {
              margin-right: 3px;
            }
            &:hover {
              border-color: #fff;
              color: #fff;
            }
            & + .bar {
              margin-left: 40px;
            }
          }
        }
        .sb_main {
          overflow: auto;
          .header {
            border-top: 1px solid rgba(224, 224, 224, 0.2);
            padding-left: 40px !important;
            .header-songname {
              width: 695px;
            }
            .header-sing {
              width: 265px;
            }
            .header-time {
              width: 50px;
            }
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
            .num {
              width: 36px;
              text-align: center;
              .paly {
                display: inline-block;
                width: 10px;
                height: 10px;
                background-image: url(https://y.gtimg.cn/mediastyle/yqq/img/wave.gif?max_age=2592000&v=78979d47cc7dc55cab5d36b4c96168d5);
              }
            }
            .name-box {
              width: 695px;
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
              width: 265px;
              span {
                &:hover {
                  color: #fff;
                }
              }
            }
            .time-box {
              width: 50px;
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
        }
      }
      // }
    }
    .player-ft {
      margin: 0 7.638889%;
      // width: 100%;
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
        .slider__runway {
          margin-left: 10px;
          width: 100%;
          height: 3px;
          background-color: rgba(204, 204, 204, 0.5);
          border-radius: 2px;
          position: relative;
          .slider__bar {
            width: 30%;
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