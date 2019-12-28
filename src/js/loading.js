/**
 * loading界面
 */
define(function (require) {

  // function randomColor() {
  //   let letters = '0123456789ABCDEF'
  //   let color = '0x'
  //   for (let i = 0; i < 6; i++) {
  //     color += letters[Math.floor(Math.random() * 16)]
  //   }
  //   return parseInt(color)
  // }

  class Loading extends PIXI.Container {

    constructor() {
      super()
      let arcAngle = Math.PI * 0.2
      let gapAngle = Math.PI * 0.05

      let offsetAngle = -arcAngle * 0.5

      for (let i = 0; i < 8; i++) {
        let arc = new PIXI.Graphics()
        arc.lineStyle(16, 0xffffff, 1, 0.5)
        arc.arc(0, 0, 80, offsetAngle + gapAngle * i + arcAngle * i, offsetAngle + arcAngle * (i + 1) + gapAngle * i)
        this.addChild(arc)
      }

      let mask = new PIXI.Graphics()
      this.addChild(mask)

      this.indicatorText = new PIXI.Text('0%', new PIXI.TextStyle({
        fontFamily: 'Arial',
        fontSize: 20,
        fill: '#ffffff',
      }))
      this.indicatorText.anchor.set(0.5)
      this.addChild(this.indicatorText)

      let maskIndex = 0

      this.timer = setInterval(() => {
        mask.clear()
        mask.lineStyle(16, 0x000000, 0.5, 0.5)
        mask.arc(0, 0, 80, offsetAngle + gapAngle * maskIndex + arcAngle * maskIndex, offsetAngle + arcAngle * (maskIndex + 1) + gapAngle * maskIndex)
        maskIndex = (maskIndex + 1) % 8
      }, 100)
    }

    /**
     * @param {number} newValue
     */
    set progress(newValue) {
      this.indicatorText.text = `${newValue}%`
    }

    destroy() {
      clearInterval(this.timer)
      super.destroy(true)
    }
  }

  return Loading
})