<template>
  <div class="mod_index-wrap">
    <div class="section_inner">
      <div class="loading-box" v-if="loading">
        <i class="iconfont icon-jiazai loading"></i>
        <p>正在加载中。。。</p>
      </div>
      <!-- 标题 -->
      <div class="mod_title">
        <slot name="title-wrap" />
      </div>
      <!-- 切换 -->
      <div class="mod_index_tab">
        <slot name="tab-wrap" />
      </div>
      <!-- swiper轮播 -->
      <div class="mod_swiper_wrap">
        <slot name="swiper" />
      </div>
      <!-- 轮播指示点 -->
      <div class="mod_paging_wrap">
        <slot name="paging" />
      </div>
    </div>
    <!-- 右按钮 -->
    <div class="mod_swiper_btn mod_next">
      <slot name="next-wrap" />
    </div>
    <!-- 左按钮 -->
    <div class="mod_swiper_btn mod_prev">
      <slot name="prev-wrap" />
    </div>
  </div>
</template>

<script>
export default {
  props: ["loading"],
};
</script>

<style lang="less" scoped>
.mod_index-wrap {
  background: url(https://y.gtimg.cn/mediastyle/yqq/img/bg_detail.jpg?max_age=2592000&v=05ddeeeeca10d505b8501911cfbda543)
    50% 0 repeat-x;
  position: relative;
  overflow: hidden;
  .section_inner {
    width: 1200px;
    margin: 0 auto;
    padding-bottom: 30px;

    .loading-box {
      position: absolute;
      z-index: 999;
      width: 100%;
      height: 70%;
      left: 0;
      bottom: 15px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      // background-color: rgba(204, 204, 204,0.5);
      i {
        font-size: 80px;
        color: rgb(22, 174, 235);
      }
      p{
        font-size: 20px;
        font-weight: 800;
        color: rgb(22, 174, 235);
      }
    }
    .mod_title {
      padding-top: 4.16667%;
      padding-bottom: 2%;
      text-align: center;
      font-size: 30px;
      font-weight: 700;
      letter-spacing: 10px;
    }
    .mod_index_tab {
      position: relative;
      text-align: center;
      font-size: 15px;
    }
    .mod_swiper_wrap {
      width: 1220px;
      overflow: hidden;
      margin-bottom: 30px;
    }
    
  }
  .mod_swiper_btn {
    position: absolute;
    top: 50%;
  }
  .mod_next {
    right: 0;
  }
  .mod_prev {
    left: 0;
  }
}
</style>