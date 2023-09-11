const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const {VueLoaderPlugin} = require('vue-loader')

module.exports = {
  entry: {
    app: './src/index.js',
  },

  output: {
    filename: 'js/[name].js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: "/"
  },

  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: 'css-loader',
            options: {sourceMap: true}
          },
          {
            loader: 'postcss-loader',
            options: {sourceMap: true}
          },
          {
            loader: 'sass-loader',
            options: {sourceMap: true}
          },
        ]
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: '/node_modules/',
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '/img/[name].[ext]',
          esModule: false,
        }
      }
    ]
  },

  resolve: {
    extensions: ['.wasm', '.mjs', '.js', '.json', '.vue', '.scss'],
    alias: {
      "@": path.resolve(__dirname, "../src/"),
      vue$: "vue/dist/vue.runtime.esm.js"
    }
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/pages/index.html',
      excludeChunks: ['test']
    }),
    new CopyWebpackPlugin({
      patterns: [
        {from: 'src/assets'}
      ],
    }),
    new VueLoaderPlugin(),
  ]
}
