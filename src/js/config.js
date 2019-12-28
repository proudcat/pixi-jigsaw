/**
 * 配置文件
 * 配置游戏所需的资源和游戏相关信息
 */
define({

  //游戏基本信息
  meta: {
    name: '疯狂拼图',
    version: '1.0.0',
    width: 796,
    height: 1280
  },

  //游戏难度
  level: 3,

  //游戏资源列表
  resources: [{
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
})