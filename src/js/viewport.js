define(function () {

  function debounce(delay, atBegin, callback) {
    return callback === undefined ? this.throttle(delay, atBegin, false) : this.throttle(delay, callback, atBegin !== false)
  }

  /**
   * @see  https://github.com/niksy/throttle-debounce
   * 
   * throttle(300, function () {
   *  // Throttled function
   * });
   */
  function throttle(delay, noTrailing, callback, debounceMode) {

    let timeoutID

    let lastExec = 0

    if (typeof noTrailing !== 'boolean') {
      debounceMode = callback
      callback = noTrailing
      noTrailing = undefined
    }

    function wrapper() {

      let self = this
      let elapsed = Number(new Date()) - lastExec
      let args = arguments

      function exec() {
        lastExec = Number(new Date())
        callback.apply(self, args)
      }

      function clear() {
        timeoutID = undefined
      }

      if (debounceMode && !timeoutID) {
        exec()
      }

      if (timeoutID) {
        clearTimeout(timeoutID)
      }

      if (debounceMode === undefined && elapsed > delay) {
        exec()

      } else if (noTrailing !== true) {
        timeoutID = setTimeout(debounceMode ? clear : exec, debounceMode === undefined ? delay - elapsed : delay)
      }

    }

    wrapper.cancel = function () {
      clearTimeout(timeoutID)
    }

    return wrapper
  }

  return class Viewport {
    /**
     * 
     * @param {*} options.aspectRatio   视口宽高比
     * @param {*} options.autofit   是否自动适配
     * @param {*} options.viewRect   视口显示区域
     */
    constructor(options) {

      this.options = Object.assign({
        aspectRatio: 1,
        autofit: true,
      }, options)

      this.$container = document.querySelector('.container')
      this.$canvas = document.querySelector('#game')

      if (this.options.autofit) {
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
     * 调整视口大小和位置
     * @param aspectRatio {Number} [option] 游戏宽高比例
     * @param viewRect {Object} [option] {x:0,y:0,width:100,height:100}
     *    如果设置了值 则canvas显示在这个区域内
     *    如果没设置值 则全屏显示并自适应
     */
    resize(viewRect) {

      viewRect = Object.assign({
        x: 0,
        y: 0,
        width: window.innerWidth,
        height: window.innerHeight
      }, viewRect)

      this.$container.style.left = viewRect.x + 'px'
      this.$container.style.top = viewRect.y + 'px'
      this.$container.style.width = viewRect.width + 'px'
      this.$container.style.height = viewRect.height + 'px'

      //宽高比  视口宽度/canvas 宽度
      let ratio_w = viewRect.width / this.$canvas.offsetWidth
      let ratio_h = viewRect.height / this.$canvas.offsetHeight

      let canvas_w
      let canvas_h

      if (ratio_w < ratio_h) {
        canvas_w = viewRect.width + 'px'
        canvas_h = viewRect.width / this.options.aspectRatio + 'px'
      } else if (ratio_w > ratio_h) {
        canvas_h = viewRect.height + 'px'
        canvas_w = viewRect.height * this.options.aspectRatio + 'px'
      } else {
        canvas_w = viewRect.width + 'px'
        canvas_h = viewRect.height + 'px'
      }

      this.$canvas.style.width = canvas_w
      this.$canvas.style.height = canvas_h

      let autofitItems = document.querySelectorAll('.autofit')
      autofitItems.forEach(item => {
        item.style.width = canvas_w
        item.style.height = canvas_h
      })
    }
  }

})