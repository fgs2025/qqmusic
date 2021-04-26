<template>
  <div class="login-box" v-if="loginOpen" @click="loginOpen = false">
    <div class="login-form" @click.stop="() => false">
      <div class="form-title">
        <span>登陆</span>
        <i class="iconfont icon-guanbi" @click="loginOpen = false"></i>
      </div>
      <div class="form-body">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          class="demo-ruleForm"
        >
          <el-form-item prop="account">
            <el-input v-model="ruleForm.account" placeholder="账号"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="ruleForm.password" placeholder="密码"></el-input>
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
  inject: ["reload"],
  props: ["value"],
  data() {
    return {
      ruleForm: {
        account: "",
        password: "",
      },
      rules: {
        account: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
      loginOpen: false,
    };
  },
  methods: {
    login(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          setCookie().then(() => {
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
  .login-form {
    width: 700px;
    //   height: 500px;
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
        cursor: pointer;
        &:hover {
          color: #31c27c;
        }
      }
      i {
        position: absolute;
        right: 10px;
        top: -10px;
        cursor: pointer;
      }
    }
    .form-body {
      width: 50%;
      // height: 50%;
      margin: 0 auto;
      margin-top: 50px;
      .form-btn {
        width: 100%;
      }
    }
  }
}
</style>