<template>
  <div>
    <!-- 歌单推荐 -->
    <RecommendPlatyList></RecommendPlatyList>
    <!-- 新歌首发 -->
    <NewSong></NewSong>
    <!-- 精彩推荐 -->
    <HotRecommended></HotRecommended>
    <!-- 新碟首发 -->
    <NewAlbum></NewAlbum>
    <!-- 排行榜 -->
    <Billboard></Billboard>
    <!-- MV -->
    <MVRecommend></MVRecommend>
  </div>
</template>

<script>
export default {
  methods: {},
  components: {
    RecommendPlatyList: require("./components/RecommendPlatyList.vue").default, //歌单推荐
    NewSong: require("./components/NewSong.vue").default, //新歌首发
    HotRecommended: require("./components/HotRecommended.vue").default, //精彩推荐
    NewAlbum: require("./components/NewAlbum.vue").default, //新碟首发
    Billboard: require("./components/Billboard.vue").default, //排行榜
    MVRecommend: require("./components/MVRecommend.vue").default, //MV
  },
};
</script>

<style lang="less" scoped>
</style>