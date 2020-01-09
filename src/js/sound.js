import sound from 'pixi-sound'

/**
 * sound module
 */
export default class Sound {
  constructor() {
    // this.playlist = {}
  }

  /**
   * set volumn  0 ~ 1
   * @param {Number} volume [required] : volumn  0≤volume≤1
   */
  setVolume(volume) {
    sound.volumeAll = Math.max(0,
      Math.min(1, parseFloat(volume))
    )
  }

  /**
   * play the sound
   * @param {String} name [required]: name of the sound in resouces
   * @param {Boolean} loop [optional]: loop the sound true:loop false:once
   * @param {String} tag [required]: music or effect (not used now)
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
   * stop the sound
   * @param {String} name [required]: the name of the sound
   */
  stop(name) {
    app.res[name].sound.stop()
  }

  /**
   * mute unmute
   */
  toggleMuteAll() {
    sound.toggleMuteAll()
  }
}