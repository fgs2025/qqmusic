<template>
  <div class="mod_index-wrap">
    <div class="section_inner">
      <!-- 标题 -->
      <div class="title">
        <slot name="title-wrap" />
      </div>
      <!-- 切换 -->
      <div class="mod_index_tab">
        <slot name="tab-wrap" />
      </div>
      <!-- swiper轮播 -->
      <div class="swiper-wrap">
        <slot name="swiper" />
      </div>
      <!-- 轮播指示点 -->
      <div class="paging-wrap">
        <slot name="paging" />
      </div>
    </div>
    <!-- 右按钮 -->
    <div class="swiper-btn next">
      <slot name="next-wrap" />
    </div>
    <!-- 左按钮 -->
    <div class="swiper-btn prev">
      <slot name="prev-wrap" />
    </div>
  </div>
</template>

<script>
export default {};
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
    .title {
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
    .swiper-wrap {
      width: 1220px;
      overflow: hidden;
      margin-bottom: 30px;
    }
    .paging-wrap {
    }
  }
  .swiper-btn {
    position: absolute;
    top: 50%;
  }
  .next {
    right: 0;
  }
  .prev {
    left: 0;
  }
}
</style>