<template>
  <moban class="PlaylistRecommend" :loading="loading">
    <!-- 标题 -->
    <template slot="title-wrap">MV</template>
    <!-- tab点击 -->
    <template slot="tab-wrap">
      <div class="allBtn pointer">更多></div>
      <span
        class="tabItem pointer"
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
              <img :src="ite.picurl" alt="" />
              <div class="mod_cover__mask"></div>
              <i class="el-icon-video-play item-i" @click="palyMv(ite.vid)"></i>
            </div>
            <div class="title">{{ ite.mvtitle }}</div>
            <div class="magnitude">
              {{ ite.singer_name }}
            </div>
            <div class="listennum">{{ ite.listennum | PlayNum }}</div>
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
import { NewMv } from "@/api/recommend";
import { swiper } from "@/mixin/swiper.js";
export default {
  mixins: [swiper],
  data() {
    return {
      tabList: [
        {
          label: "精选",
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
      loading: false,
      size: 10,
    };
  },
  mounted() {
    this.NewMvs();
  },
  methods: {
    tabClick(item) {
      if (!item.active) {
        this.tabList.forEach((row) => (row.active = false));
        item.active = true;
        this.swipeTtransform = false;
        this.i = 0;
        setTimeout(() => {
          this.swipeTtransform = true;
        });
        this.NewMvs(item.type);
      }
    },
    NewMvs(type) {
      this.loading = true;
      NewMv(type).then((res) => {
        this.start_itemlist = res.data.list;
        this.loading = false;
        this.initSwiper();
      });
    },
    palyMv(vid) {
      this.$router.push({
        name: "palymv",
        params: { id: vid },
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
  .allBtn {
    position: absolute;
    right: 0;
    font-size: 14px;
    &:hover {
      color: #31c27c;
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

    .item {
      // display: flex;
      width: 224px;
      box-sizing: border-box;
      list-style: none;
      margin-right: 20px;
      padding: 10px 0;
      .img-box {
        height: 126px;
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
      .title {
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
      .listennum {
        font-size: 14px;
        color: #ccc;
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