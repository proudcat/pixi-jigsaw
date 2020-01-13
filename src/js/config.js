//meta infomation
export const meta = {
  name: 'jigsaw puzzle',
  version: '1.0.0',
  width: 796,
  height: 1280
}

/**
 * i18n
 */
export const i18n = {
  'en': 'assets/i18n/en.json',
  'zh-cn': 'assets/i18n/zh-cn.json'
}

export const viewRect = null

//resouce list
export const resources = [
  //configuration for i18n images or sounds or atlas(.json) etc.
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