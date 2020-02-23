
export function randomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

/**
 * Returns the Query String as an object.
 * If you specify a parameter it will return just the value of that parameter, should it exist.
 *
 * @param {string} [parameter=''] - If specified this will return just the value for that key.
 * @return {string|object} An object containing the key value pairs found in the query string or just the value if a parameter was given.
 */
export function parseQueryString(url) {

  if (url === undefined || url === '' || url === null) {
    url = location.search.substring(1)
  }

  let result = {}

  if (url === '') {
    return result
  }

  let params = url.split('&')

  for (let i in params) {
    let pair = params[i].split('=')
    let key = decodeURI(pair[0])
    let value = decodeURI(pair[1])
    result[key] = value
  }
  return result
}

/**
 * Returns the Query String as an object.
 * If you specify a parameter it will return just the value of that parameter, should it exist.
 *
 * @param {string} value - The URI component to be decoded.
 * @return {string} The decoded value.
 */
export function decodeURI(value) {
  return decodeURIComponent(value.replace(/\+/g, ' '))
}

export function getExtension(uri) {

  let ext = uri

  let queryIndex = uri.indexOf('?')
  if(queryIndex>0){
    ext = uri.substr(0,queryIndex)
  }

  let index = ext.lastIndexOf('.')
  if (index != -1) {
    ext = ext.substring(index + 1)
  }
  return ext
}


export function isVideo(uri) {
  let ext = getExtension(uri)
  return ['mp4', 'webm'].indexOf(ext) !== -1
}

export function isAudio(uri) {
  let ext = getExtension(uri)
  return ['mp3', 'ogg'].indexOf(ext) !== -1
}