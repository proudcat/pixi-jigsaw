import {
  Texture,
  Container,
  Rectangle
} from 'pixi.js'
import Piece from './piece'


//gap between the piece
const GAP_SIZE = 2

/**
 * cut the picture into level * level pieces.
 * caculate the position of the piece, manage interacton of a piece, check the game is ended.
 */
export default class Jigsaw extends Container {
  constructor(level, texture) {
    super()

    //cut picture into level * level pieces
    this.level = level
    this.texture = texture

    //how many step have you moved
    this.moveCount = 0

    //layer of the pieces
    this.$pieces = new Container()
    this.$pieces.y = 208
    this.$pieces.x = -4
    this.addChild(this.$pieces)

    //front layer, selected piece will on top of other pieces
    this.$select = new Container()
    this.$select.y = 208
    this.$select.x = -4
    this.addChild(this.$select)

    this._createPieces()
  }

  /**
   * shuffle, random create the pieces index 
   * index of piece（level=3 3*3 etc.）
   * 0  1  2
   * 3  4  5
   * 6  7  8
   * 
   * suffle will return [3,8,6,2,5,1,4,0,7] etc.
   */
  _shuffle() {

    let index = -1
    let length = this.level * this.level
    const lastIndex = length - 1

    const result = Array.from({
      length
    }, (v, i) => i)

    while (++index < length) {
      const rand = index + Math.floor(Math.random() * (lastIndex - index + 1))
      const value = result[rand]
      result[rand] = result[index]
      result[index] = value
    }
    return result
  }

  /**
   * create pieces
   */
  _createPieces() {

    this.piece_width = this.texture.orig.width / this.level
    this.piece_height = this.texture.orig.height / this.level

    let offset_x = this.texture.orig.width / 2
    let offset_y = this.texture.orig.height / 2

    let shuffled_index = this._shuffle()

    for (let ii = 0; ii < shuffled_index.length; ii++) {

      //pick a piece from the big texture indicated by suffled indexes.
      let frame_row = parseInt(shuffled_index[ii] / this.level)
      let frame_col = shuffled_index[ii] % this.level
      let frame = new Rectangle(frame_col * this.piece_width, frame_row * this.piece_height, this.piece_width, this.piece_height)
      let piece = new Piece(new Texture(this.texture, frame), ii, shuffled_index[ii])
      
      
      //add the piece to ui
      let row = parseInt(ii / this.level)
      let col = ii % this.level
      piece.x = col * this.piece_width - offset_x + GAP_SIZE * col
      piece.y = row * this.piece_height - offset_y + GAP_SIZE * row

      piece
        .on('dragstart', (picked) => {
          //put the selected（drag and move） piece on top of the others pieces.
          this.$pieces.removeChild(picked)
          this.$select.addChild(picked)
        })
        .on('dragmove', (picked) => {
          //check if hover on the other piece
          this._checkHover(picked)
        })
        .on('dragend', (picked) => {

          //restore the piece layer
          this.$select.removeChild(picked)
          this.$pieces.addChild(picked)

          //check if can swap the piece
          let target = this._checkHover(picked)
          if (target) {
            this.moveCount++
            this._swap(picked, target)
            target.tint = 0xFFFFFF
          } else {
            picked.x = picked.origin_x
            picked.y = picked.origin_y
          }
        })
      this.$pieces.addChild(piece)
    }
  }
  /**
   * swap two pieces
   * @param {*} picked the picked one
   * @param {*} target the one under the picked
   */
  _swap(picked, target) {
    let pickedIndex = picked.currentIndex
    picked.x = target.x
    picked.y = target.y
    picked.currentIndex = target.currentIndex

    target.x = picked.origin_x
    target.y = picked.origin_y
    target.currentIndex = pickedIndex
  }

  /**
   * check is win the game
   */
  get success() {

    //if all pieces is in the right position
    let success = this.$pieces.children.every(piece => piece.currentIndex == piece.targetIndex)

    if (success) {
      console.log('success', this.moveCount)
    }

    return success
  }

  /**
   * is the picked piece hover on the other piece
   * @param {*} picked 
   */
  _checkHover(picked) {

    let overlap = this.$pieces.children.find(piece => {
      //the center position of the piece is in the other pieces boundry
      let rect = new Rectangle(piece.x, piece.y, piece.width, piece.height)
      return rect.contains(picked.center.x, picked.center.y)
    })

    this.$pieces.children.forEach(piece => piece.tint = 0xFFFFFF)

    //change tint color when picked piece is on me
    if (overlap) {
      overlap.tint = 0x00ffff
    }

    return overlap
  }

  // createBack() {
  //   const graphics = new Graphics()
  //   this.$pieces.children.forEach(piece => {
  //     graphics.lineStyle(2, 0xFEEB77, 1)
  //     graphics.beginFill(0x650a5A)
  //     graphics.drawRect(piece.x, piece.y, piece.width, piece.height)
  //     graphics.endFill()
  //     this.back.addChild(graphics)
  //   })
  // }
}