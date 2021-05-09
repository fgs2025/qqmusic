<template>
  <moban class="PlaylistRecommend" :loading="loading">
    <!-- 标题 -->
    <template slot="title-wrap">精彩推荐</template>
    <!-- 轮播图 -->
    <template slot="swiper">
      <div
        class="swiper-box"
        :class="['swiper-box', swipeTtransform ? 'swipeTtransform' : '']"
        :style="{ transform: `translateX(-${translateX * i}%)` }"
      >
        <ul v-for="(item, index) in itemlist" :key="index">
          <li class="item pointer" v-for="(ite, inde) in item" :key="inde">
            <img :src="ite.picUrl" alt="" />
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
import { recommendBanner } from "@/api/recommend.js";
import { swiper } from "@/mixin/swiper.js";
export default {
  mixins: [swiper],
  data() {
    return {
      loading: false,
      size: 2,
    };
  },
  mounted() {
    this.loading=true
    recommendBanner().then((res) => {
      this.start_itemlist = res.data;
      this.loading=false
      this.initSwiper();
    });
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
      width: 1220px;
      flex-shrink: 0;
      .item {
        list-style: none;
        height: 236px;
        box-sizing: border-box;
        & + .item {
          margin-left: 20px;
        }
        img {
          height: 100%;
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