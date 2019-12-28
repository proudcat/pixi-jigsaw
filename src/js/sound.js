/**
 * 音频模块
 */

define(function () {

  class Sound {
    constructor() {

      //播放列表，暂时无用，如果以后要做音乐音效区分等再用。
      this.playlist = {}
    }

    /**
     * 设置音频音量 数值为 0 ~ 1
     * @param {Number} volume [required] : 音量 数值范围  0≤volume≤1
     */
    setVolume(volume) {
      PIXI.sound.volumeAll = Math.max(0,
        Math.min(1, parseFloat(volume))
      )
    }

    /**
     * 播放音乐或音效
     * @param {String} name [required]: 名字
     * @param {Boolean} loop [optional]: 是否循环 true循环 false不循环 
     * @param {String} tag [required]: 标签,此音频是音乐还是音效
     */
    play(name, loop) {

      if (typeof loop !== 'boolean') {
        loop = false
      }

      let sound = app.res[name].sound
      sound.loop = loop
      return sound.play()
    }

    /**
     * 停止音乐或者音效
     * @param {String} name [required]: 名字
     */
    stop(name) {
      app.res[name].sound.stop()
    }

    /**
     * 静音、取消静音
     */
    toggleMuteAll() {
      PIXI.sound.toggleMuteAll()
    }

  }

  return Sound
})