const merge = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = merge(common, {
  mode:'production',
  devtool: 'source-map',
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: [
            ['@babel/preset-env', {
              'corejs': '3',
              'useBuiltIns': 'usage'
            }]
          ],
          plugins: ['@babel/plugin-transform-runtime']
        }
      }
    }]
  }
})