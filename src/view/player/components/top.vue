<template>
  <div class="top">
    <div class="logo">
      <img
        class="pointer"
        src="https://y.qq.com/mediastyle/yqq/img/player_logo.png"
        alt=""
      />
    </div>
    <div class="info">
      <!-- <img class="pointer" :src="img" alt="" />
          <span class="pointer">退出</span> -->
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.top {
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .logo {
    img {
      opacity: 0.3;
      &:hover {
        opacity: 1;
      }
    }
  }
  .info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    img {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      margin-right: 20px;
    }
    span {
      font-size: 12px;
      color: #ccc;
    }
  }
}
</style>