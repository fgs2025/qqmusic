<template>
  <div class="nav-wrap flex">
    <router-link v-for="(item, index) in navList" :key="index" :to="item.path">
      <div class="pointer">
        {{ item.title }}
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      navList: [
        {
          title: "音乐馆",
          path: "/musicHall",
        },
        {
          title: "我的音乐",
          path: "/myMusic",
        },
        {
          title: "客户端",
          path: "#",
        },
        {
          title: "开放平台",
          path: "#",
        },
        {
          title: "VIP",
          path: "#",
        },
      ],
    };
  },
};
</script>

<style lang="less" scoped>
.nav-wrap {
  margin-right: 40px;
  div {
    line-height: 90px;
    padding: 0 20px;
    font-size: 18px;
  }
  .router-link-active {
    background-color: #31c27c;
    color: #fff !important;
  }
}
</style>