;(function (root, factory) {
  if (typeof module === 'object' && typeof module.exports === 'object') {
    console.log('CommonJS 模块规范，nodejs 环境')
    var depModule = require('./umd-module-depended')
    module.exports = factory(depModule)
  } else if (typeof define === 'function' && define.amd) {
    console.log('AMD 模块规范，如 require.js')
    define(['depModule'], factory)
  } else if (typeof define === 'function' && define.cmd) {
    console.log('CMD 模块规范，如 sea.js')
    define(function (require, exports, module) {
      var depModule = require('depModule')
      module.exports = factory(depModule)
    })
  } else {
    console.log('没有模块环境，直接挂载在全局对象上')
    root.umdModule = factory(root.depModule)
  }
})(this, function (depModule) {
  console.log('我调用了依赖模块', depModule.name)
  if (typeof window !== 'undefined') {
    // 判断一下，因为 nodejs 没有 dom 的
    if (document.querySelector('#content2')) {
      document.querySelector('#content2').innerText = '我调用了依赖模块：' + depModule.name
    } else {
      window.addEventListener('load', function () {
        document.querySelector('#content2').innerText = '我调用了依赖模块：' + depModule.name
      })
    }
  }
  return {
    name: '我是一个 umd 模块，umd-modules.js',
  }
})
