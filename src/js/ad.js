/**
 * 视频广告模块
 */

define(function (require) {

  const config = require('./config')

  class VideoAd extends PIXI.Container {

    constructor(parent) {
      super()
      this.visible = false
      this.events = new PIXI.utils.EventEmitter()
      this.x = config.meta.width / 2
      this.y = config.meta.height / 2

      let bg = new PIXI.Graphics()
      bg.moveTo(0, 0)
      bg.beginFill(0x000000, 0.8)
      bg.drawRect(-config.meta.width / 2, -config.meta.height / 2, config.meta.width, config.meta.height)
      bg.interactive = true
      this.addChild(bg)

      let playButton = new PIXI.Graphics()
        .beginFill(0x0, 0.5)
        .drawRoundedRect(0, 0, 100, 100, 10)
        .endFill()
        .beginFill(0xffffff)
        .moveTo(36, 30)
        .lineTo(36, 70)
        .lineTo(70, 50)

      playButton.x = -playButton.width / 2
      playButton.y = -playButton.height / 2

      playButton.interactive = true
      playButton.buttonMode = true
      this.addChild(playButton)
      playButton.on('pointertap', () => {
        this.play()
      })

      if (parent) {
        parent.addChild(this)
      }
    }

    play() {
      this.visible = false
      let video = app.res.ad.data
      app.viewport.$container.appendChild(video)
      video.className = 'autofit'
      app.viewport.resize()

      video.onended = () => {
        this.events.emit('over')
        video.remove()
      }

      video.play()
    }

    show() {
      this.visible = true
    }

  }

  return VideoAd

})