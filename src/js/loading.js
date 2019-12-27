/**
 * loading界面
 */
define(function (require) {

  const config = require('./config')

  let _spLoad1
  let _spLoad2
  let _mask

  return {
    create: function (parent) {

      let preloader1 = PIXI.Texture.from('assets/image/preloader1.png')
      _spLoad1 = new PIXI.Sprite(preloader1)
      _spLoad1.anchor.set(0.5, 0.5)
      _spLoad1.x = config.meta.width / 2
      _spLoad1.y = config.meta.height / 2
      parent.addChild(_spLoad1)

      let preloader2 = PIXI.Texture.from('assets/image/preloader2.png')
      _spLoad2 = new PIXI.Sprite(preloader2)
      _spLoad2.anchor.set(0.5, 0.5)
      _spLoad2.x = config.meta.width / 2
      _spLoad2.y = config.meta.height / 2
      parent.addChild(_spLoad2)

      _mask = new PIXI.Graphics()
      _mask.moveTo(0, 0)
      _mask.x = _spLoad1.x
      _mask.y = _spLoad1.y - 7
      parent.addChild(_mask)
      _spLoad2.mask = _mask
    },

    update(progress) {
      _mask.clear()
      _mask.moveTo(0, 0)
      _mask.beginFill(0xFFFF00, 1)
      _mask.lineStyle(0, 0xff0000)
      _mask.arc(0, 0, 50, -Math.PI / 2, -Math.PI / 2 + (progress / 100) * Math.PI * 2)
      _mask.endFill()
    },

    destroy: function () {
      _spLoad1.destroy()
      _spLoad2.destroy()
    }
  }
})