import * as PIXI from 'pixi.js'

/**
 * 图片切片类
 */
export default class Piece extends PIXI.Sprite {

  /**
   * 
   * @param {*} texture 切片显示的图片
   * @param {*} currentIndex 这个切片当前位置索引
   * @param {*} targetIndex 这个切片的正确位置索引
   * 
   * 切片的索引（3*3为例）
   * 0  1  2
   * 3  4  5
   * 6  7  8
   */
  constructor(texture, currentIndex, targetIndex) {
    super(texture)

    //该切片当前位置的索引
    this.currentIndex = currentIndex

    //该切片目标(正确)位置的索引
    this.targetIndex = targetIndex

    //游戏是否成功
    this.success = false

    //让sprite可被点击
    this.interactive = true

    //事件发射器,当发生拖拽事件通过这个将事件广播出去
    this.events = new PIXI.utils.EventEmitter()

    //监听拖拽事件
    this
      .on('pointerdown', this._onDragStart)
      .on('pointermove', this._onDragMove)
      .on('pointerup', this._onDragEnd)
      .on('pointerupoutside', this._onDragEnd)
  }

  /**
   * 拖拽开始
   * @param {*} event 
   */
  _onDragStart(event) {
    this.dragging = true
    this.data = event.data
    this.alpha = 0.5

    //鼠标点击的位置(相对于父节点的坐标)
    let pointer_pos = this.data.getLocalPosition(this.parent)

    //鼠标点击位置的坐标和点击目标自身坐标的偏移量
    this.offset_x = pointer_pos.x - this.x
    this.offset_y = pointer_pos.y - this.y

    //记录原始坐标位置(移动之前坐标的位置)
    this.origin_x = this.x
    this.origin_y = this.y

    this.events.emit('dragstart', this)
  }

  /**
   * 拖拽中
   */
  _onDragMove() {
    if (this.dragging) {
      const pos = this.data.getLocalPosition(this.parent)
      this.x = pos.x - this.offset_x
      this.y = pos.y - this.offset_y
      this.events.emit('dragmove', this)
    }
  }

  /**
   * 松开
   */
  _onDragEnd() {
    if (this.dragging) {
      this.dragging = false
      this.alpha = 1
      this.data = null
      this.events.emit('dragend', this)
    }
  }

  /**
   * 切片中心点坐标
   */
  get center() {
    return {
      x: this.x + this.width / 2,
      y: this.y + this.height / 2
    }
  }
}
