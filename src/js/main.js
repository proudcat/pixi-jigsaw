define(function (require) {

  const config = require('./config')
  const Viewport = require('./viewport')
  const Jigsaw = require('./jigsaw')

  const layers = {
    back: new PIXI.Container(),
    ui: new PIXI.Container(),
  }

  function boot() {
    const viewport = new Viewport({
      aspectRatio: config.meta.width / config.meta.height
    })

    window.app = new PIXI.Application({
      width: config.meta.width,
      height: config.meta.height,
      backgroundColor: 0x666666,
      view: viewport.$canvas,
    })

    for (const key in layers) {
      app.stage.addChild(layers[key])
    }

    load()
  }

  function load(baseUrl) {

    let loader = new PIXI.Loader(baseUrl)
    loader.defaultQueryString = `v=${config.meta.version}`

    for (let i = 0; i < config.resources.length; i++) {
      let resource = config.resources[i]
      loader.add(resource)
    }

    loader
      .on('progress', (loader, res) => {
        console.log(`loading: ${parseInt(loader.progress)}, ${res.url}`)
      })
      .on('error', (err, ctx, res) => {
        console.warn(`load res failed:${res.url}`)
        loader.reset()
      })
      .load((loader, res) => {
        console.log('load res completed')
        app.res = res
        create()
      })
  }

  function create() {

    let idol = new PIXI.Sprite(app.res.puzzle1.texture)
    idol.x = config.meta.width / 2
    idol.y = 20
    idol.anchor.set(0.5, 0)
    app.stage.addChild(idol)

    let jigsaw = new Jigsaw(2)
    jigsaw.x = config.meta.width / 2
    jigsaw.y = config.meta.height / 2 + 200
    layers.ui.addChild(jigsaw)
  }

  boot()

})