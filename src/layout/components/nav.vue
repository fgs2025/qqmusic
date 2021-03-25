<template>
  <div class="nav-wrap">
    <div
      :class="[z_index == index ? 'active' : '']"
      v-for="(item, index) in navList"
      :key="index"
    >
      {{ item.title }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      navList: [
        {
          title: "音乐馆",
        },
        {
          title: "我的音乐",
        },
        {
          title: "客户端",
        },
        {
          title: "开放平台",
        },
        {
          title: "VIP",
        },
      ],
      z_index: 0,
    };
  },
};
</script>

<style lang="less" scoped>
.nav-wrap {
  display: flex;
  margin-right: 40px;
  div {
    line-height: 90px;
    padding: 0 20px;
    font-size: 18px;
    cursor: pointer;
    &:hover {
      color: #31c27c;
    }
  }
  .active {
    background-color: #31c27c;
    color: #fff !important;
  }
}
</style>