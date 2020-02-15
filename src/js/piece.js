import {
  Sprite,
  utils
} from 'pixi.js'
/**
 * Piece class
 */
export default class Piece extends Sprite {

  /**
   * 
   * @param {*} texture picture of the piece
   * @param {*} currentIndex current index of the piece
   * @param {*} targetIndex the right index of the piece
   *            when targetIndex == currentIndex means the piece is in the right positon,
   *            if all pieces in the right position you win the game.
   * 
   * index of piece（level=3 3*3 etc.）
   * 0  1  2
   * 3  4  5
   * 6  7  8
   */
  constructor(texture, currentIndex, targetIndex) {
    super(texture)
    utils.EventEmitter.call(this)

    this.currentIndex = currentIndex
    this.targetIndex = targetIndex

    this.interactive = true

    //listen on the drag event
    this
      .on('pointerdown', this._onDragStart)
      .on('pointermove', this._onDragMove)
      .on('pointerup', this._onDragEnd)
      .on('pointerupoutside', this._onDragEnd)
  }

  /**
   * start drag
   * @param {*} event 
   */
  _onDragStart(event) {
    this.dragging = true
    this.data = event.data
    this.alpha = 0.5

    //position of the mouse pointer(relative to the parent)
    let pointer_pos = this.data.getLocalPosition(this.parent)

    //the offset between mouse pointer and piece positon
    this.offset_x = pointer_pos.x - this.x
    this.offset_y = pointer_pos.y - this.y

    //the piece original position
    this.origin_x = this.x
    this.origin_y = this.y

    this.emit('dragstart', this)
  }

  /**
   * dragging
   */
  _onDragMove() {
    if (this.dragging) {
      const pos = this.data.getLocalPosition(this.parent)
      this.x = pos.x - this.offset_x
      this.y = pos.y - this.offset_y
      this.emit('dragmove', this)
    }
  }

  /**
   * drop
   */
  _onDragEnd() {
    if (this.dragging) {
      this.dragging = false
      this.alpha = 1
      this.data = null
      this.emit('dragend', this)
    }
  }

  /**
   * center postion of the piece
   */
  get center() {
    return {
      x: this.x + this.width / 2,
      y: this.y + this.height / 2
    }
  }
}

Object.assign(Piece.prototype, utils.EventEmitter.prototype)