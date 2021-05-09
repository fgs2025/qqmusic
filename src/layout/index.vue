<template>
  <div>
    <div class="fixed-box">
      <div class="BackTop pointer" v-show="goTopShow" @click="goTop">TOP</div>
      <div class="play pointer" @click="palyPage">play</div>
    </div>
    <div class="head-wrap width1200 margin0Auto flex">
      <div class="logo pointer">
        <img :src="logoPath" alt="" class="w100h100" />
      </div>
      <!-- 顶部导航 -->
      <nav-box></nav-box>
      <!-- 搜索 -->
      <search></search>
      <!-- 登陆 -->
      <login></login>
    </div>
    <router-view />
    <footers></footers>
  </div>
</template>

<script>
export default {
  components: {
    navBox: require("./components/nav.vue").default, //顶部导航菜单
    search: require("./components/search.vue").default, //搜索
    login: require("./components/login.vue").default, //登陆
    footers: require("./components/footer.vue").default, //底部
  },
  data() {
    return {
      logoPath: "https://y.gtimg.cn/mediastyle/yqq/img/logo@2x.png?nowebp=1", //logo地址
      scrollTop: "",
      goTopShow: false,
    };
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      this.scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      if (this.scrollTop > 500) {
        this.goTopShow = true;
      } else {
        this.goTopShow = false;
      }
    },
    goTop() {
      let timer = null,
        _that = this;
      cancelAnimationFrame(timer);
      timer = requestAnimationFrame(function fn() {
        if (_that.scrollTop > 0) {
          _that.scrollTop -= 250;
          document.body.scrollTop = document.documentElement.scrollTop =
            _that.scrollTop;
          timer = requestAnimationFrame(fn);
        } else {
          cancelAnimationFrame(timer);
          _that.goTopShow = false;
        }
      });
    },
    palyPage() {
      let openActive = window.localStorage.getItem("openActive");
      if (openActive) {
        return;
      } else {
        let routeData = this.$router.resolve({
          name: "player",
        });
        window.open(routeData.href, "_blank");
        window.localStorage.setItem("openActive", true);
      }
    },
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
.fixed-box {
  position: fixed;
  bottom: 100px;
  right: 80px;
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 999999;
}
.BackTop,
.play {
  width: 40px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  font-size: 14px;
  border: 1px solid #ccc;
}
</style>