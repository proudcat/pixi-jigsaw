import {
	throttle
} from './util.js'
import {
	META
} from './config.js'

/**
 * 视口，封装了一下canvas，用于屏幕自适应
 * 让canvas按照比例 在container范围内自适应
 */
export default class Viewport {
	/**
	 *
	 * @param {*} options.autofit   是否自动适配
	 * @param {*} options.viewRect   视口显示区域
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
	 * 调整视口大小和位置
	 * @param viewRect {Object} [option] {x:0,y:0,width:100,height:100}
	 *    如果设置了值 则canvas显示在这个区域内
	 *    如果没设置值 则居中显示，并且宽或者高肯定会铺满屏，但是会保证宽高比，防止出现拉伸。
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
		if (windowRatio < defaultRatio) {
			canvas_w = viewRect.width
			canvas_h = viewRect.width / defaultRatio
		} else {
			canvas_h = viewRect.height
			canvas_w = viewRect.height * defaultRatio
		}

		//居中对齐
		this.$canvas.style.left = `${(viewRect.width - canvas_w) / 2}px`
		this.$canvas.style.top = `${(viewRect.height - canvas_h) / 2}px`

		//按照计算比例计算宽高
		this.$canvas.style.width = canvas_w + 'px'
		this.$canvas.style.height = canvas_h + 'px'

		let autofitItems = document.querySelectorAll('.autofit')
		autofitItems.forEach(item => {
			item.style.width = canvas_w + 'px'
			item.style.height = canvas_h + 'px'
		})
	}
}