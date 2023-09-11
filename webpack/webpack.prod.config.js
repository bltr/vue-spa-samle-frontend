const {merge} = require('webpack-merge')
const path = require('path')
const glob = require('glob')
const MiniCssExtactPlugin = require('mini-css-extract-plugin')
const baseWebpackConfig = require('./webpack.base.config')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const {PurgeCSSPlugin} = require('purgecss-webpack-plugin');

baseWebpackConfig.module.rules[0].use.unshift(MiniCssExtactPlugin.loader)

module.exports = merge(baseWebpackConfig, {
  mode: 'production',

  output: {
    filename: 'js/[name].[contenthash].js',
    chunkFilename: "js/[name].[contenthash].js",
    hashDigestLength: 8
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: "vendors",
          test: /node_modules/,
          chunks: "all",
          enforce: true
        }
      }
    }
  },

  plugins: [
    new PurgeCSSPlugin({
      paths: glob.sync(path.resolve(__dirname, '../src/**/*'), {nodir: true})
    }),
    new MiniCssExtactPlugin({
      filename: 'css/[name].[contenthash].css',
    }),
    new CleanWebpackPlugin()
  ]
})
