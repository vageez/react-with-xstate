const merge = require('webpack-merge')
const common = require('./webpack.common')
const htmlWebpackPlugin = require('html-webpack-plugin')

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map', // inline-source map for production mode
  plugins: [
    new htmlWebpackPlugin({
      title: 'React with XState',
      inject: false,
      template: require('html-webpack-template'),
      appMountId: 'root'
    })
  ]
})
