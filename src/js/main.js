/**
 * entrance file
 */
import * as PIXI from 'pixi.js'
import {
  META,
  RESOURCES
} from './config'

import Sound from './sound'
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
  init()

  try {
    await load()
  } catch (error) {
    swal({
      title: 'load resource failed',
      text: error, icon: 'error',
      button: 'reload'
    })
      .then((value) => {
        if (value) {
          boot()
        }
      })
    return
  }
  create()
}

/**
 * init the application
 */
function init() {

  document.title = META.name

  window.app = new Application({
    width: META.width,
    height: META.height,
    view: document.querySelector('#scene'),
    transparent: true
  })

  app.sound = new Sound()

  //create layers and postioned at the center of the screen.
  for (const key in layers) {
    let layer = layers[key]
    app.stage.addChild(layer)
    layer.x = META.width / 2
    layer.y = META.height / 2
  }
}

/**
 * load all resources
 * @param {*} baseUrl 
 */
function load(baseUrl) {

  let promise = new Promise((resolve, reject) => {

    let loading = new Loading()
    layers.ui.addChild(loading)

    let loader = new PIXI.Loader(baseUrl)
    loader.defaultQueryString = `v=${META.version}`

    RESOURCES.forEach(res => loader.add(res))

    loader
      .on('progress', (loader, res) => {
        console.log(`loading: ${parseInt(loader.progress)}, ${res.url}`)
        loading.progress = loader.progress
      })
      .on('error', (err, ctx, res) => {
        console.error(`load res failed:${res.url}`)
        loader.reset()
        reject(res.url)
      })
      .load((loader, res) => {
        console.log('load res completed')
        loading.destroy()
        app.res = res
        resolve()
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
  let ad = new VideoAd()
  layers.ui.addChild(ad)
  ad.events.on('over', () => {
    scene.start()
  })
}

window.onload = () => {
  boot()
}
