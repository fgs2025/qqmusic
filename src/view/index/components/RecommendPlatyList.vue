<template>
  <moban class="PlaylistRecommend">
    <!-- 标题 -->
    <template slot="title-wrap">歌单推荐</template>
    <!-- tab点击 -->
    <template slot="tab-wrap">
      <span
        v-for="(item, index) in tabList"
        :key="index"
        @click="tabClick(item, index)"
        :class="['tabItem', 'pointer', item.active ? 'active' : '']"
        >{{ item.label }}</span
      >
    </template>
    <!-- 轮播图 -->
    <template slot="swiper">
      <div
        :class="['swiper-box', swipeTtransform ? 'swipeTtransform' : '']"
        :style="{ transform: `translateX(-${translateX * i}%)` }"
      >
        <ul v-for="(item, index) in itemlist" :key="index">
          <li class="item" v-for="(ite, ind) in item" :key="ind">
            <div class="img-box">
              <img :src="ite.cover || ite.cover_url_medium" alt="" />
              <div class="mod_cover__mask"></div>
              <i class="el-icon-video-play item-i"></i>
            </div>
            <div class="item-title">{{ ite.title }}</div>
            <div class="magnitude">
              播放量:{{ ite.listen_num || ite.access_num | PlayNum }} 万
            </div>
          </li>
        </ul>
      </div>
    </template>
    <!-- 轮播图指示点 -->
    <template v-slot:paging>
      <div class="paging-box">
        <span
          v-for="(item, ind) in length"
          :key="ind"
          @click="pagingClick(ind)"
          :class="[ind === isActive ? 'active' : '']"
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
import { playlistu, playlist } from "@/api/recommend";
import { swiper } from "@/mixin/swiper.js";
export default {
  mixins: [swiper],
  data() {
    return {
      tabList: [
        {
          label: "为你推荐",
          id: "",
          active: true,
        },
        {
          label: "官方歌单",
          id: "3317",
          active: false,
        },
        {
          label: "经典",
          id: "59",
          active: false,
        },
        {
          label: "情歌",
          id: "71",
          active: false,
        },
        {
          label: "网络歌曲",
          id: "3056",
          active: false,
        },
        {
          label: "KTY热歌",
          id: "64",
          active: false,
        },
      ],
      size: 5, //分割二维数组的长度.几个一组
    };
  },
  mounted() {
    this.playListuInit(); //初始化轮播图列表
  },
  computed: {
    isActive() {
      //轮播图指示点
      if (this.i == this.length) {
        return 0;
      } else {
        return this.i;
      }
    },
    length() {
      //轮播图列表长度
      if (this.itemlist.length == 0) {
        return 0;
      }
      return this.itemlist.length - 1;
    },
  },
  methods: {
    tabClick(item, index) {
      // tab点击事件
      this.tabList.forEach((row) => (row.active = false));
      item.active = true;
      this.swipeTtransform = false;
      this.i = 0;
      setTimeout(() => {
        this.swipeTtransform = true;
      });
      //为你推荐接口和按分类推荐接口不同,0为为你推荐接口,其它为按分类接口
      if (index == 0) {
        this.playListuInit(); //为你推荐接口
      } else {
        this.playList(item.id); //按分类推荐接口
      }
    },
    playListuInit() {
      //为你推荐接口
      playlistu().then((res) => {
        this.start_itemlist = res.data.list;
        this.initSwiper();
      });
    },
    playList(id) {
      //按分类推荐接口
      playlist(id).then((res) => {
        this.start_itemlist = res.data.list;
        this.initSwiper();
      });
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
  .active {
    color: #31c27c;
  }
  .swiper-box {
    display: flex;
    margin-top: 10px;
    ul {
      display: flex;
      flex-wrap: wrap;
      flex-shrink: 0;
      width: 1220px;
      .item {
        width: 224px;
        box-sizing: border-box;
        list-style: none;
        margin-right: 20px;
        padding: 10px 0;
        .img-box {
          height: 224px;
          margin-bottom: 20px;
          cursor: pointer;
          overflow: hidden;
          position: relative;
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
            transform: translate(-50%, -50%) scale(1.5);
            opacity: 1;
          }
          &:hover .mod_cover__mask {
            opacity: 0.2;
          }
        }
        .item-title {
          font-size: 14px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          cursor: pointer;
          &:hover {
            color: #31c27c;
          }
        }
        .magnitude {
          margin-top: 5px;
          font-size: 14px;
          color: #ccc;
        }
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