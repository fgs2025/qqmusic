<template>
  <div class="login-box" v-if="loginOpen" @click="loginOpen = false">
    <div class="login-form" @click.stop="() => false">
      <div class="form-title">
        <span class="pointer">登陆</span>
        <i class="iconfont icon-guanbi pointer" @click="loginOpen = false"></i>
      </div>
      <div class="form-body margin0Auto">
        <p>后端没有登陆接口，故此处随意填写即可登陆服务器设置好的账号</p>
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          class="demo-ruleForm"
        >
          <el-form-item prop="account">
            <el-input v-model="ruleForm.account" placeholder="账号"></el-input>
          </el-form-item>
          <el-form-item prop="Cookie">
            <el-input v-model="ruleForm.Cookie" placeholder="Cookie"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              class="form-btn"
              @click="login('ruleForm')"
              >登录</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { setCookie, getCookie } from "@/api/user.js";
export default {
  inject: ["reload"], //APP.vue导进来的刷新
  props: ["value"],
  data() {
    return {
      ruleForm: {
        account: "",
        Cookie: "",
      },
      rules: {
        account: [{ required: true, message: "请输入账号", trigger: "blur" }],
        Cookie: [{ required: true, message: "请输入Cookie", trigger: "blur" }],
      },
      loginOpen: false,
    };
  },
  methods: {
    login(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          setCookie(this.ruleForm.Cookie).then(() => {
            this.$store.dispatch("user/setAccount", this.ruleForm.account);
            getCookie().then((res) => {
              if (res.result == 100) {
                this.$message({
                  message: "登录成功",
                  type: "success",
                });
                this.loginOpen = false;
                this.reload();
              }
            });
          });
        } else {
          return false;
        }
      });
    },
  },
  watch: {
    value(val) {
      this.loginOpen = val;
    },
    loginOpen(val) {
      this.$emit("input", val);
    },
  },
};
</script>

<style lang="less" scoped>
.login-box {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 9999;
  .login-form {
    width: 700px;
    padding-bottom: 100px;
    background-color: #fff;
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .form-title {
      line-height: 55px;
      border-bottom: 1px solid #ccc;
      text-align: center;
      position: relative;
      span {
        &:hover {
          color: #31c27c;
        }
      }
      i {
        position: absolute;
        right: 10px;
        top: -10px;
      }
    }
    .form-body {
      width: 50%;
      margin-top: 50px;
      p {
        word-wrap: break-word;
        font-size: 12px;
        margin-bottom: 10px;
      }
      .form-btn {
        width: 100%;
      }
    }
  }
}
</style>
