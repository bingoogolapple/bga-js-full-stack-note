/*
 定义有依赖的模块
 */
define(['dataService', 'jquery'], function (dataService, $) {
  let name = '我是 alerter.js'

  function showMsg() {
    $('body').css('background', 'gray')
    alert(dataService.getMsg() + ', ' + name)
  }

  return { showMsg }
})
