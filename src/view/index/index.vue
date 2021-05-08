<template>
  <div>
    <!-- 歌单推荐 -->
    <RecommendPlatyList></RecommendPlatyList>
    <!-- 新歌首发 -->
    <NewSong></NewSong>
  </div>
</template>

<script>
export default {
  mounted() {},
  components: {
    RecommendPlatyList: require("./components/RecommendPlatyList.vue").default, //歌单推荐
    NewSong: require("./components/NewSong.vue").default, //新歌首发
  },
};
</script>

<style lang="less" scoped>
</style>