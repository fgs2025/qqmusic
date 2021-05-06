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
  props: ["model", "imgUrl", "songInfo", "lyricsObjArr", "currentTime"],
  data() {
    return {
      lyricIndex: 0,
      transform: 170,
    };
  },
  watch: {
    currentTime(val) {
      for (let i = 0; i < this.lyricsObjArr.length; i++) {
        if (val > parseInt(this.lyricsObjArr[i].time)) {
          const index = this.$refs.lyric[i].dataset.index;
          if (i === parseInt(index)) {
            this.lyricIndex = i;
            this.transform = 170 - 34 * (i + 1);
          }
        }
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