/**
 * 视频广告模块
 */


import * as PIXI from 'pixi.js'
import Loading from './loading'
import {
  META
} from './config'

export default class VideoAd extends PIXI.Container {

  constructor() {
    super()
    this.events = new PIXI.utils.EventEmitter()

    this.bg = new PIXI.Graphics()
    this.bg.moveTo(0, 0)
    this.bg.beginFill(0x000000, 0.8)
    this.bg.drawRect(-META.width / 2, -META.height / 2, META.width, META.height)
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

  //正常通过pixi.js的loader加载视频，通过这个函数播放就可以，但是在微信浏览器pixi的loader无法加载video
  // play() {
  //   this.visible = false
  //   let video = app.res.ad.data
  //   app.viewport.$container.appendChild(video)
  //   video.className = 'autofit'
  //   app.viewport.resize()

  //   video.onended = () => {
  //     this.events.emit('over')
  //     video.remove()
  //   }

  //   video.play()
  // }

  //解决微信浏览器下视频无法通过pixi的loader直接加载的问题
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
      app.viewport.$container.appendChild(video)
      app.viewport.resize()
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