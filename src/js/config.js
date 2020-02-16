/**
 * all configuration for the game
 */

//with of the canvas
export const width = 796

//height of the canvas
export const height = 1280

//game name
export const name='jigsaw'

//game version
export const version = '1.0.0'

/**
 * i18n
 */
export const i18n = {
  'en': 'assets/i18n/en.json',
  'zh-cn': 'assets/i18n/zh-cn.json'
}

export const viewRect = null

//resource list
export const resources = [
  {
    name: 'main',
    url: 'assets/image/main.json'
  }, {
    name: 'sound_bg',
    url: 'assets/audio/bg.mp3'
  }, {
    name: 'sound_win',
    url: 'assets/audio/win.mp3'
  }, {
    name: 'sound_fail',
    url: 'assets/audio/fail.mp3'
  },  
  
  //configuration for i18n image or sound or atlas(.json) etc.
  {
    name: 'bg',
    i18n: {
      'en': 'assets/image/bg_en.png',
      'zh-cn': 'assets/image/bg_zh-cn.png',
    }
  }]