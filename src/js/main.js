/**
 * 游戏入口文件
 */
define(function (require) {

  const config = require('./config')
  const Viewport = require('./viewport')
  const Jigsaw = require('./jigsaw')
  const loading = require('./loading')

  //定义游戏的层
  const layers = {
    back: new PIXI.Container(),
    board: new PIXI.Container(),
    ui: new PIXI.Container()
  }

  /**
   * 启动游戏
   */
  function boot() {

    //创建视口
    const viewport = new Viewport({
      aspectRatio: config.meta.width / config.meta.height
    })

    window.app = new PIXI.Application({
      width: config.meta.width,
      height: config.meta.height,
      backgroundColor: 0x666666,
      view: viewport.$canvas,
    })

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

    let idol = new PIXI.Sprite(app.res.puzzle5.texture)
    idol.x = config.meta.width / 2
    idol.y = 345
    idol.x = 196
    idol.anchor.set(0.5, 0)
    idol.scale.set(0.37)
    app.stage.addChild(idol)

    //创建拼图模块
    let jigsaw = new Jigsaw(3, app.res.puzzle5.texture)
    jigsaw.x = config.meta.width / 2
    jigsaw.y = config.meta.height / 2
    layers.board.addChild(jigsaw)
  }

  boot()
})