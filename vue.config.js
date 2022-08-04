const { defineConfig } = require('@vue/cli-service')
const path=require('path')
module.exports = defineConfig({
  transpileDependencies: true
  // configureWebpack:{
  //   resolve:{
  //     //别名
  //     alias:{
  //       'api':path.resolve(__dirname,'./src/api')
  //     }
  //   }
  // }
})
module.exports=({
  devServer:{
    proxy:{
      '/9yue':{
        target:'http://heima.9yuecloud.com:9988/api/private/v1',
        pathRewrite:{
          '^/9yue':''
        }
      },
      '/shiyan':{
        target:'http://shiyansong.cn:8888/api/private/v1',
        pathRewrite:{
          '^/shiyan':''
        }
      }
    }
  }
})