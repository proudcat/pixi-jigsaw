import {TextStyle,Container,Sprite,Text} from 'pixi.js'

import Jigsaw from './jigsaw'
import Result from './result'

const STYLE_WHITE = new TextStyle({
  fontFamily: 'Arial',
  fontSize: 46,
  fontWeight: 'bold',
  fill: '#ffffff',
})

//time limit
const TOTAL_TIME = 30 //second

//time countdown
let _countdown = TOTAL_TIME

/**
 * scene of the game
 */
export default class Scene extends Container {

  constructor() {
    super()

    let bg = new Sprite(app.res.bg.texture)
    bg.anchor.set(0.5)
    this.addChild(bg)

    //reference image
    let idol = new Sprite(app.res.main.textures.puzzle)
    idol.y = -198
    idol.x = -165
    idol.anchor.set(0.5)
    idol.scale.set(0.37)
    this.addChild(idol)

    //countdown text
    this.$time = new Text(_countdown + '″', STYLE_WHITE)
    this.$time.anchor.set(0.5)
    this.$time.x = 170
    this.$time.y = -156
    this.addChild(this.$time)

    //jigsaw puzzle module
    this.$jigsaw = new Jigsaw(3, app.res.main.textures.puzzle)
    this.addChild(this.$jigsaw)
  }

  /**
   * start the game
   */
  start() {

    let result = new Result()
    this.addChild(result)

    app.sound.play('sound_bg', true)
    let timer = setInterval(() => {
      if (this.$jigsaw.success) {
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