/**
 * 游戏入口文件
 */
define(function (require) {

  const Jigsaw = require('./jigsaw')
  const Result = require('./result')

  const STYLE_WHITE = new PIXI.TextStyle({
    fontFamily: 'Arial',
    fontSize: 46,
    fontWeight: 'bold',
    fill: '#ffffff',
  })

  //拼图倒计时
  const TOTAL_TIME = 30 //单位 秒

  //倒计时
  let _countdown = TOTAL_TIME

  class Scene extends PIXI.Container {
    constructor(level) {
      super()

      //背景
      let bg = new PIXI.Sprite(app.res.bg.texture)
      bg.anchor.set(0.5)
      this.addChild(bg)

      //创建参考图
      let idol = new PIXI.Sprite(app.res.main.textures.puzzle)
      idol.y = -198
      idol.x = -165
      idol.anchor.set(0.5)
      idol.scale.set(0.37)
      this.addChild(idol)

      //创建倒计时文字
      this.$time = new PIXI.Text(_countdown + '″', STYLE_WHITE)
      this.$time.anchor.set(0.5)
      this.$time.x = 170
      this.$time.y = -156
      this.addChild(this.$time)

      //创建拼图模块
      this.jigsaw = new Jigsaw(level, app.res.main.textures.puzzle)
      this.addChild(this.jigsaw)
    }

    /**
     * 开始游戏
     */
    start() {

      let result = new Result()
      this.addChild(result)

      app.sound.play('sound_bg', true)
      let timer = setInterval(() => {
        if (this.jigsaw.success) {
          clearInterval(timer)
          app.sound.stop('sound_bg')
          app.sound.play('sound_win')
          result.win()
        } else {
          _countdown--
          this.$time.text = _countdown + '″'
          if (_countdown == 0) {
            clearInterval(timer)
            app.sound.stop('sound_bg')
            app.sound.play('sound_fail')
            result.fail()
          }
        }
      }, 1000)
    }
  }


  return Scene
})