const { defineConfig } = require('@vue/cli-service')
const AutoImport = require('unplugin-auto-import/webpack').default
const Components = require('unplugin-vue-components/webpack').default
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      })
    ]
  },

  // generate by AI
  devServer: {
    client: {
      overlay: false // ✅ 关闭开发环境红色遮罩
    }
  }
  //ai
  
})


