<template>
  <div class="info pointer">
    <img :src="img" alt="" class="w100h100 border-radius50" />
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
}
</style>