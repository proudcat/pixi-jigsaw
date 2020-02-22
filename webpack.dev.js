const path = require('path')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = merge(common, {
  devtool: 'inline-source-map',
  mode: 'none',//development
  devServer: {
    contentBase: path.join(__dirname, 'src'),
    port: 8080,
    host: '0.0.0.0',
    hot: true
  }
})