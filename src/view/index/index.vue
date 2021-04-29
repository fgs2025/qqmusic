<template>
  <div>
    <!-- 歌单推荐 -->
    <RecommendPlatyList></RecommendPlatyList>
    <RecommendPlatyList></RecommendPlatyList>
  </div>
</template>

<script>
export default {
  components: {
    RecommendPlatyList: require("./components/RecommendPlatyList.vue").default, //歌单推荐
  },
};
</script>

<style lang="less" scoped>
</style>