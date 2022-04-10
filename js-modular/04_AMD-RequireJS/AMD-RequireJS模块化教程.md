# require.js 使用教程

1. 下载 require.js, 并引入

- 官网: https://requirejs.org
- github: https://github.com/requirejs/requirejs
- 将 require.js 导入项目: js/libs/require.js

2. 创建项目结构

```txt
|-js
  |-libs
    |-require.js
  |-modules
    |-alerter.js
    |-dataService.js
  |-main.js
|-index.html
```

3. 定义 require.js 的模块代码

- dataService.js

  ```js
  // 无依赖
  define(function () {
    let msg = '我是 dataService.js'

    function getMsg() {
      return msg.toUpperCase()
    }

    return { getMsg }
  })
  ```

- alerter.js

  ```js
  // 依赖两个模块，以形参的方式注入；显示声明依赖注入
  define(['dataService', 'jquery'], function (dataService, $) {
    let name = '我是 alerter.js'

    function showMsg() {
      $('body').css('background', 'gray')
      alert(dataService.getMsg() + ', ' + name)
    }

    return { showMsg }
  })
  ```

4. 应用主(入口)js: main.js

```js
;(function () {
  // 配置
  requirejs.config({
    // 基本路径
    baseUrl: 'js/',
    // 模块标识名与模块路径映射
    paths: {
      alerter: 'modules/alerter',
      dataService: 'modules/dataService',
    },
  })

  // 引入使用模块
  requirejs(['alerter'], function (alerter) {
    alerter.showMsg()
  })
})()
```

5. 页面使用模块:

```html
<script data-main="js/main" src="js/libs/require.js"></script>
```

6. 使用第三方基于 require.js 的框架(jquery)

- 将 jquery 的库文件导入到项目:

  - js/libs/jquery-1.10.1.js

- 在 main.js 中配置 jquery 路径

  ```js
  paths: {
            'jquery': 'libs/jquery-1.10.1'
        }
  ```

- 在 alerter.js 中使用 jquery

  ```js
  define(['dataService', 'jquery'], function (dataService, $) {
    var name = 'xfzhang'
    function showMsg() {
      $('body').css({ background: 'red' })
      alert(name + ' ' + dataService.getMsg())
    }
    return { showMsg }
  })
  ```

7. 使用第三方不基于 require.js 的框架(angular)

   - 将 angular.js 导入项目
   - js/libs/angular.js

- 在 main.js 中配置

  ```js
  ;(function () {
    require.config({
      // 基本路径
      baseUrl: 'js/',
      // 模块标识名与模块路径映射
      paths: {
        // 第三方库
        /**
         * jQuery 内部暴露的是小写的 jquery，配置和使用时也都要使用小写的 jquery
         *
         * if ( typeof define === "function" && define.amd ) {
         *   define( "jquery", [], function () { return jQuery; } );
         * }
         */
        jquery: './libs/jquery-1.10.1',
        angular: './libs/angular',
        // 自定义模块
        alerter: './modules/alerter',
        dataService: './modules/dataService',
      },
      /*
       配置不兼容 AMD 的模块
       exports: 指定与相对应的模块名对应的模块对象
       */
      shim: {
        angular: {
          exports: 'angular',
        },
      },
    })
    // 引入使用模块
    require(['alerter', 'angular'], function (alerter, angular) {
      alerter.showMsg()
      console.log(angular)
    })
  })()
  ```
