const path = require("path");
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.js')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const externals = require('webpack-node-externals');


module.exports = merge(baseConfig, {
  // 将 entry 指向应用程序的 server entry 文件
  entry: {
    server: path.resolve(__dirname, "../src/entry-server.js")
  },

  externals: [externals()],

  // 这允许 webpack 以 Node 适用方式(Node-appropriate fashion)处理动态导入(dynamic import)，
  // 并且还会在编译 Vue 组件时，
  // 告知 `vue-loader` 输送面向服务器代码(server-oriented code)。
  target: 'node',

  // 对 bundle renderer 提供 source map 支持
  devtool: 'source-map',

  // 此处告知 server bundle 使用 Node 风格导出模块(Node-style exports)
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "../dist"),
    libraryTarget: 'commonjs2'
  },

  // 这是将服务器的整个输出
  // 构建为单个 JSON 文件的插件。
  // 默认文件名为 `vue-ssr-server-bundle.json`
  plugins: [
    new VueSSRServerPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index-server.html',
      template: path.resolve(__dirname, '../public/index-server.html'),
      excludeChunks: ['server']
  }) 
  ]
})