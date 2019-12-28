/**
 * 配置文件
 * 配置游戏所需的资源和游戏相关信息
 */
define({
  meta: {
    name: '疯狂拼图',
    version: '1.0.0',
    width: 720,
    height: 1280
  },
  resources: [{
      name: 'puzzle',
      url: 'assets/image/puzzle.png'
    },
    {
      name: 'win',
      url: 'assets/image/win.png'
    }, {
      name: 'fail',
      url: 'assets/image/fail.png'
    }, {
      name: 'button_get',
      url: 'assets/image/button_get.png'
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
    }, {
      name: 'ad',
      url: 'assets/video/ad.mp4'
    }
  ]
})