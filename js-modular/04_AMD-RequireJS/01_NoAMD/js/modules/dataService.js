;(function (window) {
  let msg = '我是 dataService.js'

  function getMsg() {
    return msg.toUpperCase()
  }

  window.dataService = { getMsg }
})(window)
