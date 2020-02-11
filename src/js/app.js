import * as PIXI from 'pixi.js'

import Sound from './sound'
import I18N from './i18n'
import * as config from './config'

import {
  throttle
} from 'throttle-debounce'

/**
 * extends the PIXI.Application
 * add custom reize function
 */
export default class Application extends PIXI.Application {

  /**
   * constructor
   * @param {jsonobject} options same as PIXI.Application constrctor options parameter
   */
  constructor(options) {

    //to disable PIXI ResizePlugin to resize the canvas.
    options.resizeTo = undefined

    super(options)
    PIXI.utils.EventEmitter.call(this)

    //the viewport area of the canvas
    this.viewRect = config.viewRect

    //optimize the resize invoke rate
    window.addEventListener('resize', throttle(300, () => {
      this.autoResize(this.viewRect)
    }))
    window.addEventListener('orientationchange', throttle(300, () => {
      this.autoResize(this.viewRect)
    }))

    this.autoResize(this.viewRect)

    this.sound = new Sound()
    this.i18n = new I18N(config.i18n)
  }

  /**
   * resize the canvas size and position to the center of the container 
   * fill the canvas to container widh constant game ratio(config.js meta.width/meta.height).
   * 
   * pixi default ResizePlugin will change the canvas.width and canvas.height,thus it can't scale the canvas only padding the rest blank
   */
  autoResize() {

    let viewRect = Object.assign({
      x: 0,
      y: 0,
      width: window.innerWidth,
      height: window.innerHeight
    }, this.viewRect)

    const defaultRatio = this.view.width / this.view.height
    const windowRatio = viewRect.width / viewRect.height

    let width
    let height

    //autofit by width or height
    if (windowRatio < defaultRatio) {
      width = viewRect.width
      height = viewRect.width / defaultRatio
    } else {
      height = viewRect.height
      width = viewRect.height * defaultRatio
    }

    let x = viewRect.x + (viewRect.width - width) / 2
    let y = viewRect.y + (viewRect.height - height) / 2

    //center the canvas to the father
    this.view.style.left = `${x}px`
    this.view.style.top = `${y}px`
    // this.view.style.left = viewRect.x + 'px'
    // this.view.style.top = viewRect.y + 'px'

    this.view.style.width = `${width}px`
    this.view.style.height = `${height}px`

    let autofitItems = document.querySelectorAll('.autofit')
    autofitItems.forEach(item => {
      item.style.left = `${x}px`
      item.style.top = `${y}px`
      item.style.width = `${width}px`
      item.style.height = `${height}px`
    })
  }

  /**
   * load all resources
   * @param {*} baseUrl 
   */
  load(baseUrl) {

    let loader = new PIXI.Loader(baseUrl)
    loader.defaultQueryString = `v=${config.meta.version}`
    loader.add(this.i18n.file)

    config.resources.forEach(res => {
      if (res.i18n) {
        loader.add({
          name: res.name,
          url: res.i18n[this.i18n.language]
        })
      } else {
        loader.add(res)
      }
    })

    loader
      .on('start', () => {
        console.log('loader:start')
        this.emit('loader:start')
      })
      .on('progress', (loader, res) => {
        this.emit('loader:progress', parseInt(loader.progress))
      })
      .on('load', (loader, res) => {
        console.log(`loader:load ${res.url}`)
        // this.emit('load:res', res.url)
      })
      .on('error', (err, loader, res) => {
        console.warn(err)
        this.emit('loader:error', res.url)
      })
      .load((loader, res) => {
        console.log('loader:completed')
        app.res = res
        this.i18n.add(res[this.i18n.file].data)
        delete res[this.i18n.file]
        this.emit('loader:complete', res)
      })

    return loader
  }
}

Object.assign(Application.prototype, PIXI.utils.EventEmitter.prototype)