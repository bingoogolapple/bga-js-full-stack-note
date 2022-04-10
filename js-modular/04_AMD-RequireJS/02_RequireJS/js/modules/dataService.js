/*
 定义没有依赖的模块
 */
define(function () {
  let msg = '我是 dataService.js'

  function getMsg() {
    return msg.toUpperCase()
  }

  return { getMsg }
})
