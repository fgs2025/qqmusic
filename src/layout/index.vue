<template>
  <div>
    <div class="head-wrap width1200 margin0Auto flex">
      <div class="logo pointer">
        <img :src="logoPath" alt="" class="imgMax" />
      </div>
      <!-- 顶部导航 -->
      <nav-box></nav-box>
      <!-- 搜索 -->
      <search></search>
      <!-- 登陆 -->
      <login></login>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  components: {
    navBox: require("./components/nav.vue").default, //顶部导航菜单
    search: require("./components/search.vue").default, //搜索
    login: require("./components/login.vue").default, //登陆
  },
  data() {
    return {
      logoPath: "https://y.gtimg.cn/mediastyle/yqq/img/logo@2x.png?nowebp=1", //logo地址
    };
  },
};
</script>

<style lang="less" scoped>
.head-wrap {
  align-items: center;
  .logo {
    width: 170px;
    height: 46px;
    margin-right: 30px;
  }
}
</style>