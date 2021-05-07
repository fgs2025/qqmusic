module.exports = {
  devServer: {
    proxy: {
      "/api": {
        target: "http://120.78.214.15:3300", //后端接口地址
        changeOrigin: true, //是否允许跨越
        pathRewrite: {
          "^/api": "", //重写,
        },
      },
    },
  },
};
