/**
 * IIFE模式增强: 引入依赖
 * 这就是现代模块实现的基石
 */
;(function (window, $) {
  // 数据
  let data = 'IIFE 模式增强：module1 data'

  // 操作数据的函数
  function foo() {
    // 用于暴露有函数
    console.log(`IIFE 模式增强：module1 foo() ${data}`)
    $('body').css('background', 'red')
  }

  function bar() {
    // 用于暴露有函数
    console.log(`IIFE 模式增强：module1 bar() ${data}`)
    otherFun() // 内部调用
  }

  function otherFun() {
    // 内部私有的函数
    console.log(`IIFE 模式增强：module1 otherFun() ${data}`)
  }

  // 暴露行为
  window.myModule = { foo, bar }
})(window, jQuery)
