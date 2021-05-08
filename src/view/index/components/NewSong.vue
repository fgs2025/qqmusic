<template>
  <moban class="PlaylistRecommend" :loading="loading">
    <!-- 标题 -->
    <template slot="title-wrap">新歌首发</template>
    <!-- tab点击 -->
    <template slot="tab-wrap">
      <div class="allBtn pointer" @click="palyAll">播放全部</div>
      <span
        v-for="(item, index) in tabList"
        :key="index"
        @click="tabClick(item, index)"
        :class="['tabItem', 'pointer', item.active ? 'active' : '']"
        >{{ item.label }}</span
      >
    </template>
    <template slot="swiper">
      <div
        class="swiper-box"
        :class="['swiper-box', swipeTtransform ? 'swipeTtransform' : '']"
        :style="{ transform: `translateX(-${translateX * i}%)` }"
      >
        <ul v-for="(item, index) in itemlist" :key="index">
          <li class="item" v-for="(ite, inde) in item" :key="inde">
            <div class="img-box">
              <img :src="ite.album.pmid | imgURl" alt="" />
              <div class="mod_cover__mask"></div>
              <i
                class="el-icon-video-play item-i"
                @click="songListClick(ite)"
              ></i>
            </div>
            <div class="txt-box">
              <div class="title">
                <span>{{ ite.name }} {{ ite.subtitle }}</span>
              </div>
              <div class="Singer">
                <span>{{ ite.singer[0].title }}</span>
              </div>
            </div>
            <div class="songlist__time">{{ ite.interval | secondsFormat }}</div>
          </li>
        </ul>
      </div>
    </template>

    <template v-slot:paging>
      <div class="paging-box">
        <span
          v-for="(item, ind) in length"
          :key="ind"
          :class="[ind === isActive ? 'active' : '']"
          @click="pagingClick(ind)"
        ></span></div
    ></template>
    <!-- 右边按钮 -->
    <template v-slot:next-wrap>
      <div class="next-box" @click="next">
        <i class="el-icon-arrow-right"></i>
      </div>
    </template>
    <!-- 左边按钮 -->
    <template v-slot:prev-wrap>
      <div class="prev-box" @click="prev">
        <i class="el-icon-arrow-left"></i>
      </div>
    </template>
  </moban>
</template>

<script>
import { newSongs } from "@/api/recommend";
import { swiper } from "@/mixin/swiper.js";

export default {
  mixins: [swiper],
  data() {
    return {
      tabList: [
        {
          label: "最新",
          type: "0",
          active: true,
        },
        {
          label: "内地",
          type: "1",
          active: false,
        },
        {
          label: "港台",
          type: "2",
          active: false,
        },
        {
          label: "欧美",
          type: "3",
          active: false,
        },
        {
          label: "韩国",
          type: "4",
          active: false,
        },
        {
          label: "日本",
          type: "5",
          active: false,
        },
      ],
      size: 9, //分割二维数组的长度.几个一组
      loading: false,
    };
  },
  mounted() {
    this.newSong();
  },
  methods: {
    newSong(type) {
      this.loading = true;
      newSongs(type).then((res) => {
        this.start_itemlist = res.data.list;
        this.loading = false;
        this.initSwiper();
      });
    },
    tabClick(item) {
      if (!item.active) {
        this.tabList.forEach((row) => (row.active = false));
        item.active = true;
        this.swipeTtransform = false;
        this.i = 0;
        setTimeout(() => {
          this.swipeTtransform = true;
        });
        this.newSong(item.type);
      }
    },
    palyAll() {
      if (!this.loading) {
        let openActive = window.localStorage.getItem("openActive");
        let songlist = JSON.parse(localStorage.getItem("songList"));
        if (!songlist) {
          songlist = [];
        }
        songlist.unshift(...this.start_itemlist);
        if (openActive) {
          window.localStorage.setItem("songList", JSON.stringify(songlist));
        } else {
          let routeData = this.$router.resolve({
            name: "player",
          });
          window.open(routeData.href, "_blank");
          window.localStorage.setItem("openActive", true);
          window.localStorage.setItem("songList", JSON.stringify(songlist));
        }
      }
    },
    songListClick(ite) {
      let openActive = window.localStorage.getItem("openActive");
      let songlist = JSON.parse(localStorage.getItem("songList"));
      if (!songlist) {
        songlist = [];
      }
      songlist.unshift(ite);
      if (openActive) {
        window.localStorage.setItem("songList", JSON.stringify(songlist));
      } else {
        let routeData = this.$router.resolve({
          name: "player",
        });
        window.open(routeData.href, "_blank");
        window.localStorage.setItem("openActive", true);
        window.localStorage.setItem("songList", JSON.stringify(songlist));
      }
    },
  },
  filters: {
    imgURl(val) {
      return "https://y.gtimg.cn/music/photo_new/T002R90x90M000" + val + ".jpg";
    },
  },
  components: {
    moban: require("@/components/mod_index.vue").default, //导入模板
  },
};
</script>

<style lang="less" scoped>
.PlaylistRecommend {
  .tabItem {
    margin: 0 24px;
    &:hover {
      color: #31c27c;
    }
  }
  .allBtn {
    position: absolute;
    left: 0;
    top: -10px;
    padding: 10px 20px;
    font-size: 14px;
    border: 1px solid #ccc;
    &:hover {
      background-color: rgba(204, 204, 204, 0.3);
    }
  }
  .active {
    color: #31c27c;
  }
  .swiper-box {
    display: flex;
    ul {
      display: flex;
      flex-wrap: wrap;
      flex-shrink: 0;
      width: 1220px;
      margin-top: 40px;
      align-content: flex-start;
      position: relative;
    }

    .item:nth-child(-n + 6) {
      border-bottom: 1px solid #ccc;
    }
    .item {
      display: flex;
      margin-right: 25px;
      padding: 10px 0;
      .img-box {
        width: 86px;
        height: 86px;
        position: relative;
        cursor: pointer;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
          transition: all 0.75s;
        }
        .item-i {
          position: absolute;
          left: 50%;
          top: 50%;
          font-size: 50px;
          transform: translate(-50%, -50%);
          opacity: 0;
          transition: all 0.75s;
          color: #fff;
        }
        .mod_cover__mask {
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          background-color: #000;
          opacity: 0;
          transition: opacity 0.5s;
        }
        &:hover img {
          transform: scale(1.07);
        }
        &:hover .item-i {
          transform: translate(-50%, -50%) scale(1);
          opacity: 1;
        }
        &:hover .mod_cover__mask {
          opacity: 0.2;
        }
      }
      .txt-box {
        display: flex;
        flex-direction: column;
        justify-content: center;
        font-size: 14px;
        margin-left: 10px;
        width: 190px;
        .title,
        .Singer {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          span {
            cursor: pointer;
            &:hover {
              color: #31c27c;
            }
          }
        }
        .Singer {
          color: #999;
          margin-top: 5px;
        }
      }
      .songlist__time {
        display: flex;
        align-items: center;
        color: #999;
        font-size: 14px;
        margin-left: 58px;
      }
    }
  }
  .swipeTtransform {
    transition: all 0.5s;
  }
  .paging-box {
    text-align: center;
    span {
      display: inline-block;
      width: 10px;
      height: 10px;
      background-color: rgba(0, 0, 0, 0.1);
      border-radius: 50%;
      cursor: pointer;
      & + span {
        margin-left: 20px;
      }
    }
    .active {
      background-color: rgba(0, 0, 0, 0.3);
    }
  }
  .next-box,
  .prev-box {
    width: 79px;
    height: 108px;
    font-size: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    outline: none;
    background: rgba(0, 0, 0, 0.05);
    cursor: pointer;
    &:hover {
      background: rgba(0, 0, 0, 0.1);
    }
  }
  .next-box {
    transform: translateX(100%) translatey(-50%);
    transition: all 0.3s;
  }
  .prev-box {
    transform: translateX(-100%) translatey(-50%);
    transition: all 0.3s;
  }
  &:hover .prev-box {
    transform: translateX(0) translatey(-50%);
  }
  &:hover .next-box {
    transform: translateX(0) translatey(-50%);
  }
}
</style>