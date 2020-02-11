/* eslint-disable no-undef */
const {
  src,
  dest,
  // series,
  parallel
} = require('gulp')

const path = require('path')
const gulpif = require('gulp-if')
const imagemin = require('gulp-imagemin')
const webpack = require('webpack')
const webpack_config = require('./webpack.prod')

function copyAssets() {
  return src(['src/**/*', '!src/js/**'])
    .pipe(gulpif(
      file => path.extname(file.relative) === '.png',
      imagemin([imagemin.optipng({
        optimizationLevel: 3
      })], {
        verbose: true
      })))
    .pipe(dest('dist'))
}

function jsBundle(next) {
  const compiler = webpack(webpack_config)

  compiler.run((err, stats) => {
    if (err || stats.hasErrors()) {
      console.error(stats.toJson().errors)
    }
    next()
  })
}

// exports.dist = series(clean, parallel(copyAssets, jsBundle))
exports.dist = parallel(copyAssets, jsBundle)