const path = require('path')

module.exports = {
  entry: ['./src/js/main.js'],
  // mode: 'none',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'game.min.js',
  },
  target: 'web',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 8080,
    host: '0.0.0.0',
    hot: true
  },
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
}