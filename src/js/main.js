/**
 * entrance file
 */
import * as PIXI from 'pixi.js'
import *  as config from './config'

import Application from './app'
import Loading from './loading'
import VideoAd from './ad'
import Scene from './scene'
import swal from 'sweetalert'

//layers of the game
const layers = {
  back: new PIXI.Container(),
  scene: new PIXI.Container(),
  ui: new PIXI.Container()
}

/**
 * boot the application
 */
async function boot() {

  document.title = config.META.name

  window.app = new Application({
    width: config.META.width,
    height: config.META.height,
    view: document.querySelector('#scene'),
    transparent: true
  })

  //create layers and postioned at the center of the screen.
  for (const key in layers) {
    let layer = layers[key]
    app.stage.addChild(layer)
    layer.x = config.META.width / 2
    layer.y = config.META.height / 2
  }

  try {
    await load()
  } catch (error) {
    swal({
      title: 'load resource failed',
      text: error, icon: 'error',
      button: 'reload'
    }).then((value) => {
      if (value) {
        boot()
      }
    })
    return
  }
  create()
}

function load() {

  let promise = new Promise((resolve, reject) => {

    let loading = new Loading()
    layers.ui.addChild(loading)

    let loader = app.load()

    loader.onProgress.add(() => loading.progress = parseInt(loader.progress))
    loader.onError.add((err, loader, res) => reject(res.url))
    loader.onComplete.add(() => {
      resolve()
      loading.destroy()
    })
  })

  return promise
}

/**
 * create the game scene
 */
function create() {

  let scene = new Scene()
  layers.scene.addChild(scene)

  //play the ads then start the game
  // let ad = new VideoAd()
  // layers.ui.addChild(ad)
  // ad.events.on('over', () => {
  scene.start()
  // })
}

window.onload = boot