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
          <div class="sb_main" ref="main">
            <div class="header item-box">
              <div class="header-songname">歌曲</div>
              <div class="header-sing">歌手</div>
              <div class="header-time">时长</div>
            </div>
            <div
              :class="[
                'item-box',
                audio.palyState && index == ind ? 'paly' : '',
                audio.loading && index == ind ? 'loadingAnimation' : '',
              ]"
              v-for="(item, index) in songlist"
              :key="index"
              @dblclick="songPlay(item, index)"
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
            <div class="tick" v-if="tick" @click="tickClick">
              <i class="iconfont icon-ico_qiyeF9_baxin2x pointer"></i>
            </div>
          </div>
        </div>
        <div class="bd_right">
          <div class="songInfo">
            <img :src="imgUrl" alt="" />
            <div>歌曲名：{{ name }}</div>
            <div>歌手名：{{ sing }}</div>
            <div>专辑名：{{ album }}</div>
          </div>
          <div class="songLyric">
            <ul
              ref="lyricUL"
              :style="{ transform: `translateY(${transform}px)` }"
            >
              <li
                v-for="(item, i) in lyricsObjArr"
                :style="{
                  color: lyricIndex === i ? 'skyblue' : '#ded9d9',
                  fontSize: lyricIndex === i ? '18px' : '14px',
                }"
                :key="item.uid"
                :data-index="i"
                ref="lyric"
              >
                {{ item.lyric }}
              </li>
            </ul>
          </div>
        </div>
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
            <span>{{ name }} - {{ sing }}</span>
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
      name: "", //歌名
      sing: "", //歌手名
      album: "",
      lyricsObjArr: [],
      lyricIndex: 0,
      transform: 170,
      audio: {
        palyState: true, //播放状态
        audioUrl: "", //当前播放的音乐链接
        currentTime: 0, //当前播放的进度
        duration: 0, //当前歌曲的总长度
        width: 0, //歌曲播放进度条宽度
        volume: 0, //音量
        muted: false, //是否静音
        loop: false, //是否循环播放
        loading: false, //加载
      },
      type: 0, //播放类型,顺序，单曲，随机
      indList: [], //播放过的歌曲
      tick: false, //定位
      scrollTop: 0, //歌单列表的位置
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
    };
  },
  mounted() {
    this.getSongList();
    this.audio.volume = this.$refs.audio.volume;
    // this.sliderBtn();
  },
  methods: {
    // sliderBtn() {
    //   this.slider.width = this.$refs.sliderRunway.offsetWidth;
    //   this.$refs.sliderButton.addEventListener("mousedown", (e) => {
    //     let x = e.pageX;
    //     document.addEventListener("mousemove", (e) => {
    //       let _x = e.pageX;
    //       let scale = (_x - x + this.slider.width) / this.slider.width;
    //       if (scale >= 1) {
    //         scale = 1;
    //       }
    //       if (scale <= 0) {
    //         scale = 0;
    //       }
    //       this.audio.volume = scale;
    //       // this.$refs.audio.volume = scale;
    //     });
    //     document.addEventListener("mouseup", () => {
    //       document.onmousemove = null;
    //     });
    //   });
    // },
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
      for (let i = 0; i < this.lyricsObjArr.length; i++) {
        if (currentTime > parseInt(this.lyricsObjArr[i].time)) {
          const index = this.$refs.lyric[i].dataset.index;
          if (i === parseInt(index)) {
            this.lyricIndex = i;
            this.transform = 170 - 34 * (i + 1);
          }
        }
      }
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
      this.scroll();
      let id = this.songlist[this.ind].songmid;
      this.name = this.songlist[this.ind].songname;
      this.sing = this.songlist[this.ind].singer[0].name;
      this.album = this.songlist[this.ind].albumname;
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
      this.scroll();
      let id = this.songlist[this.ind].songmid;
      this.name = this.songlist[this.ind].songname;
      this.sing = this.songlist[this.ind].singer[0].name;
      this.album = this.songlist[this.ind].albumname;
      this.songUrls(id);
    },
    scroll(click) {
      //播放歌曲定位事件
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
    },
    tickClick() {
      //在播放歌曲定位事件
      this.$refs.main.scrollTop = this.scrollTop;
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
    songPlay(item, index) {
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
        this.scroll("click");
        let id = item.songmid;
        this.name = this.songlist[this.ind].songname;
        this.sing = this.songlist[this.ind].singer[0].name;
        this.album = this.songlist[this.ind].albumname;
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
      const min = parseInt(time.match(regMin)[0].slice(0, 2));
      let sec = parseInt(time.match(regSec)[0].slice(1, 3));
      const ms = time.slice(
        time.match(regMs).index + 1,
        time.match(regMs).index + 3
      );
      if (min !== 0) {
        sec += min * 60;
      }
      return Number(sec + "." + ms);
    },

    getSongList() {
      //获取歌单详情
      let id = window.localStorage.getItem("songListId");
      songlist(id).then((res) => {
        this.songlist = res.data.songlist.slice(0, 50);
        this.indList.push(this.ind);
        let songId = this.songlist[this.ind].songmid;
        this.name = this.songlist[this.ind].songname;
        this.sing = this.songlist[this.ind].singer[0].name;
        this.album = this.songlist[this.ind].albumname;
        this.songUrls(songId);
        this.$nextTick(() => {
          this.scroll();
        });
      });
    },
  },
  filters: {
    secondsFormat(value) {
      if (!value) return "00:00";
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
  components: {
    top: require("./components/top.vue").default, //顶部
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

      justify-content: space-between;
      overflow: hidden;

      .bd_left {
        display: flex;
        flex-direction: column;
        position: relative;
        margin-right: 20px;
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
            box-sizing: border-box;
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
      .bd_right {
        // flex: 1;
        // width: 400px;
        width: 340px;
        .songInfo {
          width: 100%;
          text-align: center;
          img {
            width: 186px;
            height: 186px;
          }
          div {
            font-size: 14px;
            margin-top: 10px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            color: #ccc;
          }
        }
        .songLyric {
          flex: 1;
          margin-top: 30px;
          text-align: center;
          overflow: hidden;
          ul {
            list-style: none;
            transition: all 0.5s;
            li {
              // height: 34px;
              font-size: 14px;
              line-height: 34px;
              color: #ccc;
            }
          }
        }
      }
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