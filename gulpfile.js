const {
  src,
  dest,
  series,
  parallel
} = require('gulp')

const fs = require('fs')
const del = require('del')
const argv = require('yargs').argv
const path = require('path')
const gulpif = require('gulp-if')
const imagemin = require('gulp-imagemin')
const webpack = require('webpack')
const MemoryFS = require('memory-fs')
const options = require('./webpack.config')

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

  options.mode = argv.mode

  const compiler = webpack(options)

  let memory = new MemoryFS()
  compiler.outputFileSystem = memory

  compiler.run((err, stats) => {
    if (err || stats.hasErrors()) {
      console.error(stats.toJson().errors)
    }
    let dest = path.join(options.output.path, options.output.filename)
    const bundle = memory.readFileSync(dest, 'utf-8')
    const js = concat(bundle)
    fs.writeFileSync(dest, js, 'utf8')
    next()
  })
}

function concat(bundle) {
  return bundle
  let libs = ['src/lib/pixi-sound.js']
  let js = ''
  libs.forEach(lib => {
    js += fs.readFileSync(lib, 'utf8')
    js += ';\n'
  })
  js += bundle

  return js
}

exports.dist = series(clean, parallel(copyAssets, jsBundle))