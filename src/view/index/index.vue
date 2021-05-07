<template>
  <div>
    <!-- 歌单推荐 -->
    <RecommendPlatyList></RecommendPlatyList>
  </div>
</template>

<script>
export default {
  mounted() {},
  components: {
    RecommendPlatyList: require("./components/RecommendPlatyList.vue").default, //歌单推荐
  },
};
</script>

<style lang="less" scoped>
</style>