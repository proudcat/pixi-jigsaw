const path = require('path')

module.exports = {
  entry: ['./src/js/main.js'],
  // mode: 'none', // none development production
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'game.min.js',
  },
  target: 'web'
}