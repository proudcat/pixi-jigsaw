import * as PIXI from 'pixi.js'
import Piece from './piece'


//切片之间显示的间隙
const GAP_SIZE = 2

/**
 * 拼图类
 * 负责根据level切碎图片，计算每个切片的位置,拖拽时候是否需要交换图片位置等等。
 * 
 */
export default class Jigsaw extends PIXI.Container {
  constructor(level, texture) {
    super()

    //难度2的话就是将图片切成2*2块 3的话就是3*3
    this.level = level
    this.texture = texture

    //移动步数统计
    this.moveCount = 0
    // this.scale.set(1.4)

    //背景层
    // this.back = new PIXI.Container()
    // let bg = new PIXI.Sprite(app.res.bg.texture)
    // bg.anchor.set(0.5)
    // this.back.addChild(bg)
    // this.addChild(this.back)

    //切片层
    this.pieces = new PIXI.Container()
    this.pieces.y = 208
    this.pieces.x = -4
    this.addChild(this.pieces)

    //前景层，选中的图片要悬浮于所有其他切片之上
    this.select = new PIXI.Container()
    this.select.y = 208
    this.select.x = -4
    this.addChild(this.select)

    this.createPieces()
  }

  /**
   * 洗牌，随机生成图片位置
   */
  shuffle() {

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
   * 创建切片
   */
  createPieces() {

    this.piece_width = this.texture.orig.width / this.level
    this.piece_height = this.texture.orig.height / this.level

    let offset_x = this.texture.orig.width / 2
    let offset_y = this.texture.orig.height / 2

    let shuffled_index = this.shuffle()

    for (let ii = 0; ii < shuffled_index.length; ii++) {

      //随机从大图中选一块当做切片
      let row = parseInt(shuffled_index[ii] / this.level)
      let col = shuffled_index[ii] % this.level
      let frame = new PIXI.Rectangle(col * this.piece_width, row * this.piece_height, this.piece_width, this.piece_height)
      let piece = new Piece(new PIXI.Texture(this.texture, frame), ii, shuffled_index[ii])
      let current_row = parseInt(ii / this.level)
      let current_col = ii % this.level

      //切片的显示位置
      piece.x = current_col * this.piece_width - offset_x + GAP_SIZE * current_col
      piece.y = current_row * this.piece_height - offset_y + GAP_SIZE * current_row

      piece.events
        .on('dragstart', (picked) => {
          //选中切片的时候 将切片置于最顶层，拖拽时候会显示于其他切片的顶层。
          this.pieces.removeChild(picked)
          this.select.addChild(picked)
        })
        .on('dragmove', (picked) => {
          //检测是否可以和其他切片换位置
          this.checkHover(picked)
        })
        .on('dragend', (picked) => {

          //还原切片层级
          this.select.removeChild(picked)
          this.pieces.addChild(picked)

          //检测是否有可交换的切片，有就换之，没有则滚回原位
          let swapPiece = this.checkHover(picked)
          if (swapPiece) {
            this.moveCount++
            let pickedIndex = picked.currentIndex
            picked.x = swapPiece.x
            picked.y = swapPiece.y
            picked.currentIndex = swapPiece.currentIndex

            swapPiece.x = picked.origin_x
            swapPiece.y = picked.origin_y
            swapPiece.currentIndex = pickedIndex

            swapPiece.tint = 0xFFFFFF

            //检测游戏是否成功
            let success = this.checkSuccess()
            if (success) {
              this.success = true
              console.log('success', this.moveCount)
            }

          } else {
            picked.x = picked.origin_x
            picked.y = picked.origin_y
          }
        })
      this.pieces.addChild(piece)
    }
  }

  /**
   * 检测游戏是否成功
   */
  checkSuccess() {

    //所有块的当前位置和应该所在的位置一致则判断为成功
    let success = this.pieces.children.every(piece => {
      return piece.currentIndex == piece.targetIndex
    })

    return success
  }

  /**
   * 检测当前拖动的切片是否悬浮其他切片之上
   * @param {*} picked 
   */
  checkHover(picked) {

    let overlap = this.pieces.children.find(piece => {
      //判断当前拖动的切片的中心点是否在其他剩余图片范围(矩形边界)内
      let rect = new PIXI.Rectangle(piece.x, piece.y, piece.width, piece.height)
      return rect.contains(picked.center.x, picked.center.y)
    })

    this.pieces.children.forEach(piece => {
      piece.tint = 0xFFFFFF
    })

    //如果当前拖拽的切片位于其他切片之上则改变下底下切片的tint值
    if (overlap) {
      overlap.tint = 0x00ffff
    }

    return overlap
  }

  /**
   * 创建背景层
   */
  // createBack() {
  //   const graphics = new PIXI.Graphics()
  //   this.pieces.children.forEach(piece => {
  //     graphics.lineStyle(2, 0xFEEB77, 1)
  //     graphics.beginFill(0x650a5A)
  //     graphics.drawRect(piece.x, piece.y, piece.width, piece.height)
  //     graphics.endFill()
  //     this.back.addChild(graphics)
  //   })
  // }
}