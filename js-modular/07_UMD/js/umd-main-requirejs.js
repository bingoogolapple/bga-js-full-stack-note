require.config({
  baseUrl: 'js/modules/', // 前面加或者不加 ./ 都能正常运行
  paths: {
    umd: 'umd-module',
    depModule: 'umd-module-depended',
  },
})

require(['umd'], function (umdModule) {
  document.querySelector('h2').innerText = 'require.js 方式引用了 umd 模块'
  document.querySelector('#content').innerText = umdModule.name
  console.log('require.js 方式引用了 umd 模块', umdModule.name)
})
