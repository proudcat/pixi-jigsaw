/**
 * 游戏入口文件
 */
define(function (require) {

  const Sound = require('./sound')
  const Viewport = require('./viewport')
  const Jigsaw = require('./jigsaw')
  const config = require('./config')
  const loading = require('./loading')
  const result = require('./result')
  const VideoAd = require('./ad')

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

    //创建视口
    const viewport = new Viewport({
      aspectRatio: config.meta.width / config.meta.height
    })

    // window.devicePixelRatio
    window.app = new PIXI.Application({
      width: config.meta.width,
      height: config.meta.height,
      backgroundColor: 0x666666,
      view: viewport.$canvas,
    })

    app.sound = new Sound()
    app.viewport = viewport

    //层级加入到游戏场景中
    for (const key in layers) {
      app.stage.addChild(layers[key])
    }

    load()
  }

  /**
   * 加载所有的游戏资源
   * @param {*} baseUrl 
   */
  function load(baseUrl) {

    loading.create(layers.ui)

    let loader = new PIXI.Loader(baseUrl)
    loader.defaultQueryString = `v=${config.meta.version}`

    for (let i = 0; i < config.resources.length; i++) {
      let resource = config.resources[i]
      loader.add(resource)
    }

    loader
      .on('progress', (loader, res) => {
        console.log(`loading: ${parseInt(loader.progress)}, ${res.url}`)
        loading.update(loader.progress)
      })
      .on('error', (err, ctx, res) => {
        console.warn(`load res failed:${res.url}`)
        loader.reset()
      })
      .load((loader, res) => {
        console.log('load res completed')
        loading.destroy()
        app.res = res
        create()
      })
  }


  /**
   * 创建游戏场景
   */
  function create() {

    //创建拼图参照图
    _txt_time = new PIXI.Text(_countdown + '″', STYLE_WHITE)
    _txt_time.anchor.set(0.5)
    _txt_time.y = 484
    _txt_time.x = 530
    layers.ui.addChild(_txt_time)

    //创建拼图模块
    _jigsaw = new Jigsaw(3, app.res.puzzle.texture)
    _jigsaw.x = config.meta.width / 2
    _jigsaw.y = config.meta.height / 2
    layers.board.addChild(_jigsaw)

    //创建结果页
    result.create(layers.ui)

    //创建广告
    let ad = new VideoAd(layers.ui)
    ad.events.on('over', () => {
      start()
    })
    ad.show()
  }

  function start() {
    app.sound.play('sound_bg', true)
    let timer = setInterval(() => {
      if (_jigsaw.success) {
        clearInterval(timer)
        app.sound.stop('sound_bg')
        app.sound.play('sound_win')
        result.win()
        return
      }

      _countdown--
      _txt_time.text = _countdown + '″'
      if (_countdown == 0) {
        clearInterval(timer)
        app.sound.stop('sound_bg')
        app.sound.play('sound_fail')
        result.fail()
      }
    }, 1000)
  }

  boot()
})