const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    productionSourceMap: false, //打包不生成map
  transpileDependencies: true,
  lintOnSave:false,
  devServer:{
    proxy:{  // 重写的方式，把请求代理到express服务器上
        '/api':{
            target:'http://gmall-h5-api.atguigu.cn',
            // pathRewrite:{'/api':''} // 把/api 替换为空
        }
    }
},


})
