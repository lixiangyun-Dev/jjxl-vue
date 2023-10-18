const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false ,    // 关闭eslint检查
  
  devServer:{ //设置开发服务器
    port: 7000,
    proxy:{ //设置代理
      '/api':{ //当在程序中发送以 '/api' 开头的请求时, 会自动的将请求转发到 target 所表示的目标服务器
        target:'http://localhost:8088/',//设置目标服务器地址
        changeOrigin:true, //允许跨域
        pathRewrite:{
          '/api': ''
        } //重写请求地址
      }
    }
  }

})
