<template>
  <div :class="['bd_right', model ? 'model' : '']">
    <div class="songInfo" v-show="!model">
      <img :src="imgUrl" alt="" />
      <div>歌曲名：{{ songInfo.name }}</div>
      <div>歌手名：{{ songInfo.sing }}</div>
      <div>专辑名：{{ songInfo.album }}</div>
    </div>
    <div class="songLyric">
      <ul ref="lyricUL" :style="{ transform: `translateY(${transform}px)` }">
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
</template>

<script>
export default {
  props: ["model", "imgUrl", "songInfo", "lyric", "currentTime"],
  data() {
    return {
      lyricIndex: 0,
      transform: 170,
      lyricsObjArr: [],
    };
  },
  methods: {
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
  },
  watch: {
    lyric(val) {
      this.lyricsObjArr = [];
      const regNewLine = /\n/;
      const lineArr = val.split(regNewLine); // 每行歌词的数组
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
    },
    currentTime(val) {
      if (this.lyricsObjArr.length > 1) {
        for (let i = 0; i < this.lyricsObjArr.length; i++) {
          if (val > parseInt(this.lyricsObjArr[i].time)) {
            const index = this.$refs.lyric[i].dataset.index;
            if (i === parseInt(index)) {
              this.lyricIndex = i;
              this.transform = 170 - 34 * (i + 1);
            }
          }
        }
      } else {
        this.lyricIndex = 0;
        this.transform = 170 - 34 * (0 + 1);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.bd_right {
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  width: 396px;
  .songInfo {
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
    min-height: 400px;
    margin-top: 30px;
    text-align: center;
    overflow: hidden;
    ul {
      list-style: none;
      transition: all 0.5s;
      li {
        font-size: 14px;
        line-height: 34px;
        color: #ccc;
      }
    }
  }
}
.model {
  position: absolute;
  width: 100% !important;
}
</style>