import {
  throttle
} from 'throttle-debounce'

import {
  META
} from './config.js'

/**
 * allowed canvas autofit when viewport(browser size) changed.
 * constrained by the father container.
 */
export default class Viewport {
  /**
   *
   * @param {*} options.autofit   is auto fit when viewport changed
   * @param {*} options.viewRect {x,y,width,height} position and size to constrain the canvas
   *    if set,the canvas will constrained inside the rectangle
   */
  constructor(options) {

    this.options = Object.assign({
      autofit: true,
    }, options)

    this.$container = document.querySelector('#container')
    this.$canvas = document.querySelector('#scene')

    if (this.options.autofit) {
      //当视口大小发生变化时候，自适应canvas大小，并且throttle一下为了提高效率和防止自适应过快发生抖动
      window.addEventListener('resize', throttle(300, () => {
        this.resize(this.options.viewRect)
      }))
      window.addEventListener('orientationchange', throttle(300, () => {
        this.resize(this.options.viewRect)
      }))
    }

    this.resize(this.options.viewRect)
  }

  /**
   * resize the canvas size and position to the center of the screen.
   */
  resize() {

    let viewRect = Object.assign({
      x: 0,
      y: 0,
      width: window.innerWidth,
      height: window.innerHeight
    }, this.options.viewRect)

    this.$container.style.left = viewRect.x + 'px'
    this.$container.style.top = viewRect.y + 'px'
    this.$container.style.width = viewRect.width + 'px'
    this.$container.style.height = viewRect.height + 'px'

    const defaultRatio = META.width / META.height
    const windowRatio = viewRect.width / viewRect.height

    let canvas_w
    let canvas_h

    //这里看宽满屏就按照宽适配，高满屏则按照高适配
    //autofit by width or height
    if (windowRatio < defaultRatio) {
      canvas_w = viewRect.width
      canvas_h = viewRect.width / defaultRatio
    } else {
      canvas_h = viewRect.height
      canvas_w = viewRect.height * defaultRatio
    }

    //center the canvas to the father
    this.$canvas.style.left = `${(viewRect.width - canvas_w) / 2}px`
    this.$canvas.style.top = `${(viewRect.height - canvas_h) / 2}px`

    this.$canvas.style.width = canvas_w + 'px'
    this.$canvas.style.height = canvas_h + 'px'

    let autofitItems = document.querySelectorAll('.autofit')
    autofitItems.forEach(item => {
      item.style.width = canvas_w + 'px'
      item.style.height = canvas_h + 'px'
    })
  }
}