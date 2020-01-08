/**
 * 帮助类
 */

/**
 * @see  https://github.com/niksy/throttle-debounce
 * 
 * throttle(300, function () {
 *  // Throttled function
 * });
 * 
 * delay时间内，无论对callback调用多少次，最终只会调用一次callback, 用于防止函数调用过快。
 */
export function throttle(delay, noTrailing, callback, debounceMode) {

  let timeoutID

  let lastExec = 0

  if (typeof noTrailing !== 'boolean') {
    debounceMode = callback
    callback = noTrailing
    noTrailing = undefined
  }

  function wrapper() {

    let self = this
    let elapsed = Number(new Date()) - lastExec
    let args = arguments

    function exec() {
      lastExec = Number(new Date())
      callback.apply(self, args)
    }

    function clear() {
      timeoutID = undefined
    }

    if (debounceMode && !timeoutID) {
      exec()
    }

    if (timeoutID) {
      clearTimeout(timeoutID)
    }

    if (debounceMode === undefined && elapsed > delay) {
      exec()

    } else if (noTrailing !== true) {
      timeoutID = setTimeout(debounceMode ? clear : exec, debounceMode === undefined ? delay - elapsed : delay)
    }

  }

  wrapper.cancel = function () {
    clearTimeout(timeoutID)
  }

  return wrapper
}