const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({

  transpileDependencies: true,

  // 关闭eslint
  lintOnSave: false,

  // 跨域设置
  devServer: {
    proxy: {
      '/api': {
        // target: 'http://192.168.3.122:5000',
        target: 'http://192.168.100.55:5000',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '', // 重写路径，去掉 /api 前缀
        },
      },
    },
    // target: 'http://192.168.100.34:5000',// 公司内网IP地址
    // target: 'http://192.168.3.120:5000', // 公司本地后端服务地址
    // target: 'http://172.17.57.178:5000', // aliyun后端服务地址
    //  ResizeObserver loop completed with undelivered notifications.报错
    client: {

      overlay: false

    },
  },

})
