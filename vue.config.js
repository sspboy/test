const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // 关闭eslint
  lintOnSave: false,

  // 跨域设置
  devServer: {
    proxy: {
      '/api': {
       target: 'http://192.168.2.104:5000', // 你的后端服务地址
       //  target: 'http://192.168.3.120:5000', // 你的后端服务地址
        changeOrigin: true,
        pathRewrite: {
          '^/api': '', // 重写路径，去掉 /api 前缀
        },
      },
    },


    //  ResizeObserver loop completed with undelivered notifications.报错
    client: {

      overlay: false

 },
  },

})
