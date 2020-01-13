/**
 * configuration file
 * to config all the resouces and contant here
 */

//basic game infomation
export const META = {
  name: 'jigsaw puzzle',
  version: '1.0.0',
  width: 796,
  height: 1280
}

export const i18n = {
  'en': 'assets/i18n/en.json',
  'zh-cn': 'assets/i18n/zh-cn.json'
}

export const viewRect = null

//resouce list
export const RESOURCES = [
  // {
  //   name: 'result',
  //   i18n: {
  //     'en': 'assets/image/result.json',
  //     'zh-cn': 'assets/image/result.json',
  //   }
  // },
  {
    name: 'main',
    url: 'assets/image/main.json'
  }, {
    name: 'bg',
    url: 'assets/image/bg.png'
  }, {
    name: 'sound_bg',
    url: 'assets/audio/bg.mp3'
  }, {
    name: 'sound_win',
    url: 'assets/audio/win.mp3'
  }, {
    name: 'sound_fail',
    url: 'assets/audio/fail.mp3'
  }]