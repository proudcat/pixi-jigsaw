/**
 * 游戏入口文件
 */
import * as PIXI from 'pixi.js'
import {
  META,
  RESOURCES
} from './config.js'

import Sound from './sound.js'
import Viewport from './viewport.js'
import Loading from './loading.js'
import VideoAd from './ad.js'
import Scene from './scene.js'

//定义游戏的层
const layers = {
  back: new PIXI.Container(),
  scene: new PIXI.Container(),
  ui: new PIXI.Container()
}

/**
 * 启动游戏
 */
function boot() {

  document.title = META.name

  //创建视口
  const viewport = new Viewport()

  window.app = new PIXI.Application({
    width: META.width,
    height: META.height,
    view: viewport.$canvas,
    transparent: true
  })

  app.sound = new Sound()
  app.viewport = viewport

  //层级加入到游戏场景中,并将所有的层坐标设置为屏幕中心点
  for (const key in layers) {
    let layer = layers[key]
    app.stage.addChild(layer)
    layer.x = META.width / 2
    layer.y = META.height / 2
  }

  load()
}

/**
 * 加载所有的游戏资源
 * @param {*} baseUrl 
 */
function load(baseUrl) {

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
      console.warn(`load res failed:${res.url}`)
      loader.reset()
    })
    .load((loader, res) => {
      console.log('load res completed')
      loading.destroy()
      app.res = res
      create()
    })
}

/**
 * 创建游戏场景
 */
function create() {

  let scene = new Scene(3)
  layers.scene.addChild(scene)

  //创建广告
  let ad = new VideoAd()
  layers.ui.addChild(ad)
  ad.events.on('over', () => {
    scene.start()
  })
}

boot()
console.log('main')