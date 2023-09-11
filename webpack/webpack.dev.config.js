const HtmlWebPlugin = require('html-webpack-plugin')
const {merge} = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.config')

baseWebpackConfig.module.rules[0].use.unshift('vue-style-loader')

module.exports = merge(baseWebpackConfig, {
  mode: 'development',

  entry: {
    test: './tests/testStand/index.js'
  },

  devServer: {
    historyApiFallback: {
      rewrites: [
        {from: /^\/test/, to: '/test/index.html'},
      ]
    },
    port: 8081,
    hot: true,
    proxy: {
      context: ['/api', '/__cypress'],
      target: 'http://127.0.0.1:8080',
    }
  },

  // devtool: 'source-map',

  plugins: [
    new HtmlWebPlugin({
      template: './src/pages/index.html',
      filename: 'test/index.html',
      chunks: ['test']
    })
  ]
})
