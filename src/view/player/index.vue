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
          @nextplay="nextplay"
          @palyStateChange="palyStateChange"
          @deleteSong="deleteSong"
          @empty="empty"
          ref="songLists"
        ></songLists>
        <lyric
          :model="model"
          :imgUrl="imgUrl"
          :songInfo="songInfo"
          :currentTime="audio.currentTime"
          :lyric="lyric"
        ></lyric>
      </div>
      <footBtn
        ref="footBtn"
        :audio="audio"
        :songInfo="songInfo"
        :model="model"
        :type="type"
        :songlist="songlist"
        :ind="ind"
        :indList="indList"
        @modelChange="modelChange"
        @typeChange="typeChange"
        @nextplay="nextplay"
        @indListChange="indListChange"
        @currentTimeChange="currentTimeChange"
        @palyStateChange="palyStateChange"
      ></footBtn>

      <audio
        ref="audio"
        :src="audio.audioUrl"
        :loop="audio.loop"
        autoplay
        @play="play"
        @loadedmetadata="onLoadedmetadata"
        @timeupdate="timeupdate"
        @ended="ended"
      ></audio>
    </div>
  </div>
</template>

<script>
import { songUrls, song, songLyric } from "@/api/song.js";
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
      lyric: "",
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
      timer: null,
      model: false,
    };
  },
  mounted() {
    this.getSongList();
    window.addEventListener("storage", (e) => {
      this.songlist = [];
      this.ind = 0;
      this.indList = [];
      this.songlist = JSON.parse(e.newValue);
      let songId = this.songlist[this.ind].songmid;
      this.songUrls(songId);
    });
    if (window.performance.navigation.type == 1) {
      window.localStorage.setItem("openActive", true);
    }
    window.addEventListener("beforeunload", () => {
      window.localStorage.setItem("songList", JSON.stringify(this.songlist));
      localStorage.removeItem("openActive");
    });
  },
  methods: {
    empty() {
      this.songlist = [];
      this.ind = 0; //第几首歌
      this.imgUrl = ""; //背景虚化图
      this.songInfo = {
        name: "", //歌名
        sing: "", //歌手名
        album: "",
      };
      this.lyric = "";
      this.audio.audioUrl = "";
      this.audio.loading = false;
      this.audio.palyState = false;
      window.localStorage.setItem("songList", JSON.stringify(this.songlist));
    },
    deleteSong(val) {
      this.songlist.splice(val, 1);
      this.indList.forEach((row, i) => {
        if (row == val) {
          this.indList.splice(i, 1);
        }
      });
    },
    palyStateChange(val) {
      //接受子组件点击播放暂停按钮的处理
      if (val) {
        this.audio.palyState = val;
        this.$refs.audio.play();
      } else {
        this.audio.palyState = val;
        this.$refs.audio.pause();
      }
    },
    nextplay(val) {
      //接受子组件点下一首按钮的处理
      if (this.songlist.length > 0) {
        this.ind = val;
        let id = this.songlist[this.ind].songmid;
        this.songUrls(id);
      }
    },
    currentTimeChange(val) {
      //接受子组件音乐拖动的处理
      this.audio.currentTime = val;
      this.$refs.audio.currentTime = val;
    },
    indListChange(val) {
      //接受子组件播放过的歌曲数组
      this.indList = val;
    },
    modelChange(val) {
      //接受子组件纯净模式的变更
      this.model = val;
    },
    typeChange(val) {
      //接受子组件播放模式的变更
      this.type = val;
    },
    play() {
      //音乐开始播放了
      this.audio.palyState = true;
      this.audio.loading = false;
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
    setSongInfo() {
      this.songInfo.name = this.songlist[this.ind].songname;
      this.songInfo.sing = this.songlist[this.ind].singer[0].name;
      this.songInfo.album = this.songlist[this.ind].albumname;
    },
    ended() {
      //歌曲播放结束
      this.$refs.footBtn.nextSong();
    },
    songUrls(id) {
      this.audio.palyState = false;
      this.audio.loading = true;
      this.$nextTick(() => {
        this.$refs.songLists.scroll();
      });
      //获取播放链接
      songUrls(id).then((res) => {
        clearTimeout(this.timer);
        this.audio.audioUrl = "";
        if (this.type != 1) {
          if (this.ind != this.indList[this.indList.length - 1]) {
            this.indList.push(this.ind);
          }
        }
        this.setSongInfo();
        if (res.data[id]) {
          this.audio.audioUrl = res.data[id];
        } else {
          this.timer = setTimeout(() => {
            this.$refs.footBtn.nextSong();
          }, 5000);
        }
      });
      //获取歌词
      songLyric(id).then((res) => {
        this.lyric = res.data.lyric;
      });
      //获取背景虚化图
      song(id).then((res) => {
        let mid = res.data.track_info.album.mid;
        this.imgUrl = `https://y.gtimg.cn/music/photo_new/T002R300x300M000${mid}.jpg`;
      });
    },
    getSongList() {
      //获取歌单详情
      this.songlist = JSON.parse(localStorage.getItem("songList"));
      if (this.songlist.length > 0) {
        let songId = this.songlist[this.ind].songmid;
        this.songUrls(songId);
      }
    },
  },
  watch: {
    "audio.volume"(val) {
      this.$refs.audio.volume = val;
    },
    "audio.muted"(val) {
      this.$refs.audio.muted = val;
    },
  },
  components: {
    top: require("./components/top.vue").default, //顶部
    songLists: require("./components/songList.vue").default, //歌曲列表
    lyric: require("./components/lyric.vue").default, //歌词
    footBtn: require("./components/footBtn.vue").default, //底部按钮
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
  }
}
</style>