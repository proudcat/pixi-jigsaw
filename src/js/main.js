/**
 * 游戏入口文件
 */
define(function (require) {

  const config = require('./config')
  const Sound = require('./sound')
  const Viewport = require('./viewport')
  const Jigsaw = require('./jigsaw')
  const Loading = require('./loading')
  const VideoAd = require('./ad')
  const Result = require('./result')

  //定义游戏的层
  const layers = {
    back: new PIXI.Container(),
    board: new PIXI.Container(),
    ui: new PIXI.Container()
  }

  let _txt_time = 0

  //拼图倒计时
  const TOTAL_TIME = 30 //单位 秒

  //倒计时
  let _countdown = TOTAL_TIME

  //拼图模块
  let _jigsaw

  const STYLE_WHITE = new PIXI.TextStyle({
    fontFamily: 'Arial',
    fontSize: 46,
    fontWeight: 'bold',
    fill: '#ffffff',
  })

  /**
   * 启动游戏
   */
  function boot() {

    document.title = config.meta.name

    //创建视口
    const viewport = new Viewport()

    window.app = new PIXI.Application({
      width: config.meta.width,
      height: config.meta.height,
      backgroundColor: 0x666666,
      view: viewport.$canvas,
      transparent: true
    })

    viewport.resize()

    app.sound = new Sound()
    app.viewport = viewport

    //层级加入到游戏场景中,并将所有的层坐标设置为屏幕中心点
    for (const key in layers) {
      let layer = layers[key]
      app.stage.addChild(layer)
      layer.x = config.meta.width / 2
      layer.y = config.meta.height / 2
    }

    load()
  }

  /**
   * 加载所有的游戏资源
   * @param {*} baseUrl 
   */
  function load(baseUrl) {

    let loading = new Loading()
    layers.ui.addChild(loading)

    let loader = new PIXI.Loader(baseUrl)
    loader.defaultQueryString = `v=${config.meta.version}`

    config.resources.forEach(res => loader.add(res))

    loader
      .on('progress', (loader, res) => {
        console.log(`loading: ${parseInt(loader.progress)}, ${res.url}`)
        loading.progress = loader.progress
      })
      .on('error', (err, ctx, res) => {
        console.warn(`load res failed:${res.url}`)
        loader.reset()
      })
      .load((loader, res) => {
        console.log('load res completed')
        loading.destroy()
        app.res = res
        show()
      })
  }

  /**
   * 创建游戏场景
   */
  function show() {

    //背景
    let bg = new PIXI.Sprite(app.res.bg.texture)
    bg.anchor.set(0.5)
    layers.back.addChild(bg)

    //创建拼图模块
    _jigsaw = new Jigsaw(config.level, app.res.main.textures.puzzle)
    layers.board.addChild(_jigsaw)

    //创建参考图
    let idol = new PIXI.Sprite(app.res.main.textures.puzzle)
    idol.y = -198
    idol.x = -165
    idol.anchor.set(0.5)
    idol.scale.set(0.37)
    layers.board.addChild(idol)

    //创建倒计时文字
    _txt_time = new PIXI.Text(_countdown + '″', STYLE_WHITE)
    _txt_time.anchor.set(0.5)
    _txt_time.x = 170
    _txt_time.y = -156
    layers.board.addChild(_txt_time)

    //创建广告
    let ad = new VideoAd(layers.ui)
    ad.events.on('over', () => {
      start()
    })
  }

  function start() {

    let result = new Result()
    layers.ui.addChild(result)

    app.sound.play('sound_bg', true)
    let timer = setInterval(() => {
      if (_jigsaw.success) {
        clearInterval(timer)
        app.sound.stop('sound_bg')
        app.sound.play('sound_win')
        result.win()
      } else {
        _countdown--
        _txt_time.text = _countdown + '″'
        if (_countdown == 0) {
          clearInterval(timer)
          app.sound.stop('sound_bg')
          app.sound.play('sound_fail')
          result.fail()
        }
      }
    }, 1000)
  }

  boot()
})