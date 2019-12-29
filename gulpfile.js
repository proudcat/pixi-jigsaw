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
const rename = require('gulp-rename')
const gulpif = require('gulp-if')
const imagemin = require('gulp-imagemin')
const webpack = require('webpack')
const MemoryFS = require('memory-fs')

function clean(next) {
  del.sync('dist')
  next()
}

function copyAssets() {
  return src(['src/assets/**/*'], {
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
    .pipe(dest(path.join('dist', 'assets')))
}

// function copyLib() {
//   return src(['src/lib/vendor.js', 'src/lib/goooku.js'], {
//       nodir: false
//     })
//     .pipe(dest('dist'))
// }

function copyHtml() {
  return src('src/index_dist.html')
    .pipe(rename(file => {
      file.basename = 'index'
    }))
    .pipe(dest('dist'))
}

function jsBundle(next) {

  const options = {
    entry: './src/js/main.js',
    mode: argv.mode,
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'game.min.js',
    },
    target: 'web',
    module: {
      rules: [{
        test: /\.js$/,
        exclude: /lib/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: []
          }
        }
      }]
    }
  }

  const compiler = webpack(options)

  let memory = new MemoryFS()
  compiler.outputFileSystem = memory

  compiler.run((err, stats) => {
    if (err || stats.hasErrors()) {
      console.error(stats.toJson().errors)
    }
    let dest = path.join(options.output.path, options.output.filename)
    const bundle = memory.readFileSync(dest, 'utf-8')
    // const js = concat(bundle)
    fs.writeFileSync(dest, bundle, 'utf8')
    next()
  })
}

// function concat(bundle) {
//   let libs = ['src/lib/pixi.js', 'src/lib/pixi-sound.js']
//   let js = ''
//   libs.forEach(lib => {
//     js += fs.readFileSync(lib, 'utf8')
//     js += ';\n'
//   })
//   js += bundle

//   return js
// }

exports.dist = series(clean, parallel(copyAssets, jsBundle, copyHtml))