import * as PIXI from 'pixi.js'

import {
  throttle
} from 'throttle-debounce'

/**
 * extends the PIXI.Application
 * add custom reize function
 */
export default class Application extends PIXI.Application {

  /**
   * constructor
   * @param {jsonobject} options same as PIXI.Application constrctor options parameter
   * @param {*} viewRect the viewport area of the canvas
   */
  constructor(options, viewRect) {

    //to disable PIXI ResizePlugin to resize the canvas.
    options.resizeTo = undefined

    super(options)
    this.viewRect = viewRect

    //constrain the canvas to the boundry of the container 
    this.$container = document.querySelector('#container')

    //optimize the resize invoke rate
    window.addEventListener('resize', throttle(300, () => {
      this.autoResize(this.viewRect)
    }))
    window.addEventListener('orientationchange', throttle(300, () => {
      this.autoResize(this.viewRect)
    }))

    this.autoResize(this.viewRect)
  }

  /**
   * resize the canvas size and position to the center of the container 
   * fill the canvas to container widh constant game ratio(config.js meta.width/meta.height).
   * 
   * pixi default ResizePlugin will change the canvas.width and canvas.height,thus it can't scale the canvas only padding the rest blank
   */
  autoResize() {

    let viewRect = Object.assign({
      x: 0,
      y: 0,
      width: window.innerWidth,
      height: window.innerHeight
    }, this.viewRect)

    this.$container.style.left = viewRect.x + 'px'
    this.$container.style.top = viewRect.y + 'px'
    this.$container.style.width = viewRect.width + 'px'
    this.$container.style.height = viewRect.height + 'px'

    const defaultRatio = this.view.width / this.view.height
    const windowRatio = viewRect.width / viewRect.height

    let canvas_w
    let canvas_h

    //autofit by width or height
    if (windowRatio < defaultRatio) {
      canvas_w = viewRect.width
      canvas_h = viewRect.width / defaultRatio
    } else {
      canvas_h = viewRect.height
      canvas_w = viewRect.height * defaultRatio
    }

    //center the canvas to the father
    this.view.style.left = `${(viewRect.width - canvas_w) / 2}px`
    this.view.style.top = `${(viewRect.height - canvas_h) / 2}px`

    this.view.style.width = canvas_w + 'px'
    this.view.style.height = canvas_h + 'px'

    let autofitItems = document.querySelectorAll('.autofit')
    autofitItems.forEach(item => {
      item.style.width = canvas_w + 'px'
      item.style.height = canvas_h + 'px'
    })
  }

}