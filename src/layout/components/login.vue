<template>
  <div class="login-wrap">
    <div class="login-btn" @click="loginOpen = true" v-if="!img">登录</div>
    <!-- 用户信息 -->
    <info v-else :img="img"></info>
    <!-- 登陆弹窗 -->
    <loginForm v-model="loginOpen"></loginForm>
  </div>
</template>

<script>
import { Cookie, detail } from "@/api/user.js";
export default {
  data() {
    return {
      loginOpen: false,
      img: "",
    };
  },
  mounted() {
    Cookie().then((res) => {
      let cookie = res.data;
      this.$store.dispatch("user/setAccount", cookie.uin);
      if (cookie) {
        detail().then((res) => {
            this.img = res.data.creator.headpic;
            console.log(res);
          })
          .catch(() => {
            return;
          });
      }
    });
  },

  components: {
    info: require("./info.vue").default, //个人信息
    loginForm: require("./loginForm.vue").default, //登陆弹窗
  },
};
</script>

<style lang="less" scoped>
.login-wrap {
  margin-left: 20px;
  .login-btn {
    cursor: pointer;
    &:hover {
      color: #31c27c;
    }
  }
}
</style>