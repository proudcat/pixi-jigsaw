const {
  src,
  dest,
  series,
  parallel
} = require('gulp')

const del = require('del')
const argv = require('yargs').argv
const path = require('path')
const gulpif = require('gulp-if')
const imagemin = require('gulp-imagemin')
const webpack = require('webpack')
const webpack_config = require('./webpack.config')

function clean(next) {
  del.sync('dist')
  next()
}

function copyAssets() {
  return src(['src/**/*', '!src/js/**'], {
      nodir: false
    })
    .pipe(gulpif(
      file => {
        return path.extname(file.relative) === '.png'
      },
      imagemin([imagemin.optipng({
        optimizationLevel: 3
      })], {
        verbose: true
      })))
    .pipe(dest('dist'))
}

function jsBundle(next) {
  webpack_config.mode = argv.mode

  const compiler = webpack(webpack_config)

  compiler.run((err, stats) => {
    if (err || stats.hasErrors()) {
      console.error(stats.toJson().errors)
    }
    next()
  })
}

exports.dist = series(clean, parallel(copyAssets, jsBundle))