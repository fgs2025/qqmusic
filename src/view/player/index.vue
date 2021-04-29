<template>
  <div class="player-wrap">
    <div class="top">
      <div class="logo">
        <img
          class="pointer"
          src="https://y.qq.com/mediastyle/yqq/img/player_logo.png"
          alt=""
        />
      </div>
      <div class="info">
        <img class="pointer" :src="img" alt="" />
        <span class="pointer">退出</span>
      </div>
    </div>
  </div>
</template>

<script>
import { Cookie, detail } from "@/api/user.js";
export default {
  data() {
    return {
      img: "",
    };
  },
  mounted() {
    Cookie().then((res) => {
      let cookie = res.data.cookie;
      if (cookie) {
        detail()
          .then((res) => {
            this.img = res.data.creator.headpic;
          })
          .catch(() => {
            return;
          });
      }
    });
  },
};
</script>

<style lang="less" scoped>
.player-wrap {
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.35);
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
  
}
</style>