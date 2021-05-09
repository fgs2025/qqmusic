<template>
  <div>
    <div class="mod_top_subnav-box">
      <div class="nav" v-for="(item, index) in nav_list" :key="index">
        <router-link :to="item.link">{{ item.nav }}</router-link>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {
      nav_list: [
        {
          nav: "首页",
          link: "/musicHall/index",
        },
        {
          nav: "歌手",
          link: "/musicHall/singer",
        },
         {
          nav: "mv",
          link: "/musicHall/mv",
        },
      ],
    };
  },
};
</script>

<style lang="less" scoped>
.mod_top_subnav-box {
  width: 1200px;
  margin: 0 auto;
  height: 51px;
  line-height: 51px;
  border-top: 1px solid #f2f2f2;
  padding-left: 230px;
  display: flex;
  box-sizing: border-box;
  .nav {
    cursor: pointer;
    font-size: 15px;
    & + .nav {
      margin-left: 47px;
    }
    &:hover {
      color: #31c27c;
    }
    a {
      display: flex;
      height: 100%;
      width: 100%;
    }
  }
}
.router-link-active {
  color: #31c27c!important;
}
</style>
