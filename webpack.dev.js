const merge = require('webpack-merge')
const common = require('./webpack.common')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const htmlWebpackPlugin = require('html-webpack-plugin')
const { HotModuleReplacementPlugin } = require('webpack')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    port: 3030,
    hot: true
  },
  plugins: [
    // Hot reloading of webpack dev server
    new HotModuleReplacementPlugin(),
    new CleanWebpackPlugin(),
    //
    new htmlWebpackPlugin({
      title: 'React with XState',
      inject: false,
      template: require('html-webpack-template'),
      appMountId: 'root',
      devServer: 'http://localhost:3030'
    })
  ]
})
