;(function () {
  // 配置
  require.config({
    // 基本路径
    baseUrl: 'js/',
    // 映射: 模块标识名: 路径
    paths: {
      // 自定义模块
      alerter: 'modules/alerter',
      dataService: 'modules/dataService',
      modulea: 'modules/module-a',

      // 库模块
      /**
       * jQuery 内部暴露的是小写的 jquery，配置和使用时也都要使用小写的 jquery
       *
       * if ( typeof define === "function" && define.amd ) {
       *   define( "jquery", [], function () { return jQuery; } );
       * }
       */
      jquery: 'libs/jquery-1.10.1',
      angular: 'libs/angular',
    },

    // 配置不兼容 AMD 的模块
    shim: {
      angular: {
        exports: 'angular',
      },
    },
  })

  // 引入模块使用
  require(['alerter', 'angular'], function (alerter, angular) {
    alerter.showMsg()
    console.log(angular)

    var btnNode = document.querySelector('#btn-load')
    btnNode.addEventListener('click', function () {
      require(['modulea'], function (modulea) {
        var spanNode = document.createElement('span')
        spanNode.innerText = `modulea 已经加载：${modulea.msg}`
        btnNode.insertAdjacentElement('afterend', spanNode)
      })
    })
  })
})()
