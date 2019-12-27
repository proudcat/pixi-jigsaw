define(function (require) {
	
	const util = require('./util')
	const config = require('./config')
	
	/**
	 * 视口，封装了一下canvas，用于屏幕自适应
	 */
	class Viewport {
		/**
		 *
		 * @param {*} options.aspectRatio   视口宽高比,用于在缩放视口的时候保持canvas宽高比例不变，防止拉伸变形.
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
				//当视口大小发生变化时候，自适应canvas大小，并且throttle一下为了提高效率和防止自适应过快发生抖动
				window.addEventListener('resize', util.throttle(300, () => {
					this.resize(this.options.viewRect)
				}))
				window.addEventListener('orientationchange', util.throttle(300, () => {
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
			
			let currentRatio = this.$canvas.offsetWidth / this.$canvas.offsetHeight
			const defaultRatio = config.meta.width / config.meta.height
			const windowRatio = viewRect.width / viewRect.height
			
			if (currentRatio != defaultRatio) {
				currentRatio = defaultRatio
			}
			
			let canvas_w
			let canvas_h
			
			//这里看宽满屏就按照宽适配，高满屏则按照高适配
			if (windowRatio < currentRatio) {
				canvas_w = viewRect.width + 'px'
				canvas_h = viewRect.width / this.options.aspectRatio + 'px'
			} else {
				canvas_h = viewRect.height + 'px'
				canvas_w = viewRect.height * this.options.aspectRatio + 'px'
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
	
	return Viewport
	
})
