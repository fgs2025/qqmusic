<template>
  <div id="app">
    <router-view v-if="isRouterAlive" />
  </div>
</template>
<script>
export default {
  name: "App",
  provide() {
    //父组件中通过provide来提供变量，在子组件中通过inject来注入变量。
    return {
      reload: this.reload,
    };
  },
  data() {
    return {
      isRouterAlive: true, //控制视图是否显示的变量
    };
  },
  mounted() {
    alert(
      "本项目仅供学习使用，请尊重版权，请勿利用此项目从事商业行为!\n本项目还没全部完成"
    );
  },
  methods: {
    reload() {
      this.isRouterAlive = false; //先关闭，
      this.$nextTick(function () {
        this.isRouterAlive = true; //再打开
      });
    },
  },
};
</script>

<style lang="less">
@import url(./style/global.less);
@import url(./style/iconfont.css);
#app {
  height: 100vh;
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background: rgba(225, 225, 225, 0.4);
  }
  &::-webkit-scrollbar-track {
    border-radius: 5px;
  }
}
</style>
