/**
 * entrance file
 */
import {
  Container
} from 'pixi.js'
import * as config from './config'

import Application from './app'
import Loading from './loading'
import VideoAd from './ad'
import Scene from './scene'
import swal from 'sweetalert'

//layers of the game
const layers = {
  back: new Container(),
  scene: new Container(),
  ui: new Container()
}

/**
 * boot the application
 */
async function boot() {

  document.title = config.name

  window.app = new Application({
    width: config.width,
    height: config.height,
    view: document.querySelector('#scene'),
    transparent: true
  })

  //create layers and postioned at the center of the screen.
  for (const key in layers) {
    let layer = layers[key]
    app.stage.addChild(layer)
    layer.x = config.width / 2
    layer.y = config.height / 2
  }
}

/**
 * preload all game resoruces
 */
function loadRes() {

  let promise = new Promise((resolve, reject) => {

    let loading = new Loading()
    layers.ui.addChild(loading)

    app.on('loader:progress', progress => loading.progress = progress)
    app.on('loader:error', error => reject(error))

    app.on('loader:complete', () => {
      resolve()
      loading.destroy()
    })

    app.load()
  })

  return promise
}

/**
 * setup the game scene
 */
function setup() {

  let scene = new Scene()
  layers.scene.addChild(scene)

  //you can uncomment the code, you will play video first then start the game.
  // let ad = new VideoAd()
  // layers.ui.addChild(ad)
  // ad.on('over', () => {
  scene.start()
  // })
}

window.onload = async () => {

  boot()

  try {
    await loadRes()
  } catch (error) {
    let reload = await swal({
      title: 'load resource failed',
      text: error,
      icon: 'error',
      button: 'reload'
    })

    if (reload) {
      location.reload(true)
    }

    return
  }

  setup()

}