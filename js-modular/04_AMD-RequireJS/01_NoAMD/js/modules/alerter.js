;(function (window, dataService) {
  let name = '我是 alerter.js'

  function showMsg() {
    alert(dataService.getMsg() + ', ' + name)
  }

  window.alerter = { showMsg }
})(window, dataService)
