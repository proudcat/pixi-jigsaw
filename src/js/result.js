/**
 * 游戏结果页面
 */
import * as PIXI from 'pixi.js'

import {
  META
} from './config.js'

export default class Result extends PIXI.Container {
  constructor() {
    super()
    this.visible = false

    let bg = new PIXI.Graphics()
    bg.moveTo(0, 0)
    bg.beginFill(0x000000, 0.8)
    bg.drawRect(-META.width / 2, -META.height / 2, META.width, META.height)
    bg.interactive = true
    this.addChild(bg)

    this.$win = new PIXI.Container()
    let win_icon = new PIXI.Sprite(app.res.main.textures.win)
    win_icon.anchor.set(0.5)
    win_icon.y = -160

    this.$win.addChild(win_icon)

    let win_text = new PIXI.Text('获得钻技UU锅一个', new PIXI.TextStyle({
      fontFamily: 'Arial',
      fontSize: 40,
      fontWeight: 'bold',
      fill: '#ffffff',
    }))
    win_text.anchor.set(0.5)
    this.$win.addChild(win_text)

    let win_button = new PIXI.Sprite(app.res.main.textures.button_get)
    win_button.anchor.set(0.5)
    win_button.y = 80
    win_button.interactive = true
    win_button.buttonMode = true
    win_button.on('pointertap', () => {
      console.log('win')
      location.href = location.href.replace(/mobile(\d)/, 'mobile0')
    })
    this.$win.addChild(win_button)

    this.$fail = new PIXI.Container()

    let fail_icon = new PIXI.Sprite(app.res.main.textures.fail)
    fail_icon.y = -200
    fail_icon.anchor.set(0.5)
    fail_icon.interactive = true
    fail_icon.buttonMode = true
    fail_icon.on('pointertap', () => {
      console.log('fail')
      location.href = location.href.replace(/mobile(\d)/, 'mobile0')
    })
    this.$fail.addChild(fail_icon)

    let fail_text = new PIXI.Text('获得钻技UU锅优惠券一张', new PIXI.TextStyle({
      fontFamily: 'Arial',
      fontSize: 40,
      fontWeight: 'bold',
      fill: '#ffffff',
    }))
    fail_text.anchor.set(0.5)
    this.$fail.addChild(fail_text)

    this.addChild(this.$fail)
    this.addChild(this.$win)
  }

  win() {
    this.visible = true
    this.$win.visible = true
    this.$fail.visible = false
  }

  fail() {
    this.visible = true
    this.$win.visible = false
    this.$fail.visible = true
  }
}