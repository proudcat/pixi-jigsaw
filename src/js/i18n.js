import { parseQueryString } from './util'
import mustache from 'mustache'

/**
 * internationalization module
 */
export default class I18N {

  /**
   * 
   * @param config: i18n configuration
   * the key must be compatible with window.navigator.language
   * {
   *  'en': 'assets/i18n/en.json',
   *  'zh-cn': 'assets/i18n/zh-cn.json'
   * }
   */
  constructor(config) {
    this.config = config
    this.words = {}
  }

  add(words) {
    Object.assign(this.words, words)
  }

  /**
   * detect user language
   */
  get language() {

    let lang = parseQueryString().lang

    let languages = Object.keys(this.config)

    if (lang && languages.indexOf(lang) !== -1) {
      return lang
    }

    lang = window.navigator.userLanguage || window.navigator.language

    if (lang && languages.indexOf(lang) !== -1) {
      return lang
    }

    return 'en'
  }

  /**
   * get uri of the current language config file
   */
  get file() {
    let uri = this.config[this.language]
    return uri
  }

  /**
   * get words from user language
   * @param {string} key :key of i18n
   * @param {object} options : data(if have) to fill the `Mustache` template
   * example
      get('hello {{ user }}', {user:'jack'})
      // return 'hello jack'。
   */
  get(key, options) {

    let text = this.words[key]

    if (text) {
      if (options) {
        return mustache.render(text, options)
      }
      return text
    } else {
      console.warn('can not find key:' + key)
      return ''
    }
  }
}