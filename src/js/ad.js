import * as PIXI from 'pixi.js'
import Loading from './loading'
import {
  meta
} from './config'

/**
 * video advertisement module
 */
export default class VideoAd extends PIXI.Container {

  constructor() {
    super()
    this.events = new PIXI.utils.EventEmitter()

    this.bg = new PIXI.Graphics()
    this.bg.moveTo(0, 0)
    this.bg.beginFill(0x000000, 0.8)
    this.bg.drawRect(-meta.width / 2, -meta.height / 2, meta.width, meta.height)
    this.bg.interactive = true
    this.addChild(this.bg)

    this.startButton = new PIXI.Graphics()
      .beginFill(0x0, 0.5)
      .drawRoundedRect(0, 0, 100, 100, 10)
      .endFill()
      .beginFill(0xffffff)
      .moveTo(36, 30)
      .lineTo(36, 70)
      .lineTo(70, 50)

    this.startButton.x = -this.startButton.width / 2
    this.startButton.y = -this.startButton.height / 2

    this.startButton.interactive = true
    this.startButton.buttonMode = true
    this.addChild(this.startButton)
    this.startButton.on('pointertap', () => {
      this.play()
    })
  }

  // normally we can load the video by pixi loader and play the video like this.
  // play() {
  //   this.visible = false
  //   let video = app.res.ad.data
  //   app.$container.appendChild(video)
  //   video.className = 'autofit'
  //   app.resize()

  //   video.onended = () => {
  //     this.events.emit('over')
  //     video.remove()
  //   }

  //   video.play()
  // }

  //wechat browser can not load video by pixi.js loader,so we manually load the video
  play() {
    this.startButton.visible = false
    this.bg.visible = false

    let loading = new Loading({
      progress: false
    })
    this.addChild(loading)

    let video = document.createElement('video')
    video.src = 'assets/video/ad.mp4'
    video.className = 'autofit'

    video.onloadeddata = () => {
      loading.destroy()
      video.currentTime = 0
      app.view.parentElement.append(video)
      app.autoResize()
    }

    video.onended = () => {
      video.remove()
      this.events.emit('over')
      this.destroy(true)
    }

    video.load()
    video.play()
  }
}