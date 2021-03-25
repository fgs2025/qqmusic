module.exports = {
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:3300", //后端接口地址
        changeOrigin: true, //是否允许跨越
        pathRewrite: {
          "^/api": "", //重写,
        },
      },
    },
  },
};
