const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,
  pages: {
    index: {
      entry: './user/src/main.js',
      template: './user/public/index.html',
      title: '河马酒店'
    },
    admin: {
      entry: './admin/src/main.js',
      template: './admin/public/index.html',
      title: '管理员界面'
    }
  }
})
