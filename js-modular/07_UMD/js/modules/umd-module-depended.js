;(function (root, factory) {
  if (typeof module === 'object' && typeof module.exports === 'object') {
    // CommonJS 模块规范，nodejs 环境
    module.exports = factory()
  } else if (typeof define === 'function' && define.amd) {
    // AMD 模块规范，如 require.js
    define(factory)
  } else if (typeof define === 'function' && define.cmd) {
    // CMD 模块规范，如 sea.js
    define(function (require, exports, module) {
      module.exports = factory()
    })
  } else {
    // 没有模块环境，直接挂载在全局对象上
    root.depModule = factory()
  }
})(this, function () {
  return {
    name: '我是一个被依赖的 umd 模块，umd-module-depended.js',
  }
})
