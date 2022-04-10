define(function (require, exports, module) {
  var umdModule = require('umd')
  document.querySelector('h2').innerText = 'sea.js 方式引用了 umd 模块'
  document.querySelector('#content').innerText = umdModule.name
  console.log('sea.js 方式引用了 umd 模块', umdModule.name)
})
