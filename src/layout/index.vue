<template>
  <div>
    <div class="head-wrap">
      <div class="logo">
        <img :src="logoPath" alt="" />
      </div>
      <nav-box></nav-box>
      <search></search>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    navBox: require("./components/nav.vue").default, //顶部导航菜单
    search: require("./components/search.vue").default, //搜索
  },
  data() {
    return {
      logoPath: "https://y.gtimg.cn/mediastyle/yqq/img/logo@2x.png?nowebp=1",
    };
  },
};
</script>

<style lang="less" scoped>
.head-wrap {
  width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  .logo {
    width: 170px;
    height: 46px;
    margin-right: 30px;
    cursor: pointer;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>