/**
 * 游戏结果页面
 */
define(function (require) {

  const config = require('./config')

  let _root
  let _win
  let _fail

  return {
    create: function (parent) {

      _root = new PIXI.Container()
      _root.visible = false

      let bg = new PIXI.Graphics()
      bg.moveTo(0, 0)
      bg.beginFill(0x000000, 0.8)
      bg.drawRect(-config.meta.width / 2, -config.meta.height / 2, config.meta.width, config.meta.height)
      bg.interactive = true
      _root.addChild(bg)

      _win = new PIXI.Container()
      _win.visible = false
      let win_icon = new PIXI.Sprite(app.res.main.textures.win)
      win_icon.anchor.set(0.5)
      win_icon.y = -160

      _win.addChild(win_icon)

      let win_text = new PIXI.Text('获得钻技UU锅一个', new PIXI.TextStyle({
        fontFamily: 'Arial',
        fontSize: 40,
        fontWeight: 'bold',
        fill: '#ffffff',
      }))
      win_text.anchor.set(0.5)
      _win.addChild(win_text)

      let win_button = new PIXI.Sprite(app.res.main.textures.button_get)
      win_button.anchor.set(0.5)
      win_button.y = 80
      win_button.interactive = true
      win_button.buttonMode = true
      win_button.on('pointertap', () => {
        console.log('win')
      })
      _win.addChild(win_button)

      _fail = new PIXI.Container()
      _fail.visible = false

      let fail_icon = new PIXI.Sprite(app.res.main.textures.fail)
      fail_icon.y = -200
      fail_icon.anchor.set(0.5)
      fail_icon.interactive = true
      fail_icon.buttonMode = true
      fail_icon.on('pointertap', () => {
        console.log('fail')
      })
      _fail.addChild(fail_icon)

      let fail_text = new PIXI.Text('获得钻技UU锅优惠券一张', new PIXI.TextStyle({
        fontFamily: 'Arial',
        fontSize: 40,
        fontWeight: 'bold',
        fill: '#ffffff',
      }))
      fail_text.anchor.set(0.5)
      _fail.addChild(fail_text)

      _root.addChild(_fail)
      _root.addChild(_win)
      parent.addChild(_root)
    },

    win: function () {
      _root.visible = true
      _win.visible = true
      _fail.visible = false
    },

    fail: function () {
      _root.visible = true
      _win.visible = false
      _fail.visible = true
    }
  }
})