<template>
  <div class="info">
    <img :src="img" alt="" />
  </div>
</template>

<script>
export default {
  props: ["img"],
};
</script>

<style lang="less" scoped>
.info {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>