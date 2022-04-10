# sea.js 简单使用教程

1. 下载 sea.js, 并引入

- 官网: http://seajs.org/
- github: https://github.com/seajs/seajs
- 将 sea.js 导入项目: js/libs/sea.js

2. 创建项目结构

```txt
|-js
  |-libs
    |-sea.js
  |-modules
    |-module1.js
    |-module2.js
    |-module3.js
    |-module4.js
    |-main.js
|-index.html
```

3. 定义 sea.js 的模块代码

- module1.js

  ```js
  define(function (require, exports, module) {
    // 内部变量数据
    var data = '我是 module1.js'
    // 内部函数
    function show() {
      console.log('module1 show() ' + data)
    }

    // 向外暴露
    exports.show = show
  })
  ```

- module2.js

  ```js
  define(function (require, exports, module) {
    module.exports = {
      msg: '我是 module2.js',
    }
  })
  ```

- module3.js

  ```js
  define(function (require, exports, module) {
    const API_KEY = '我是 module3.js'
    exports.API_KEY = API_KEY
  })
  ```

- module4.js

  ```js
  define(function (require, exports, module) {
    // 引入依赖模块(同步)
    var module2 = require('./module2')

    function show() {
      console.log('module4 show() ' + module2.msg)
    }

    exports.show = show
    // 引入依赖模块(异步)
    require.async('./module3', function (m3) {
      console.log('异步引入依赖模块3 ' + m3.API_KEY)
    })
  })
  ```

- main.js: 主(入口)模块

  ```js
  define(function (require) {
    var m1 = require('./module1')
    var m4 = require('./module4')
    m1.show()
    m4.show()
  })
  ```

4. index.html:

```html
<!--
使用 seajs:
  1. 引入 sea.js 库
  2. 如何定义导出模块:
    define()
    exports
    module.exports
  3. 如何依赖模块:
    require()
  4. 如何使用模块:
    seajs.use()
-->
<script type="text/javascript" src="js/libs/sea.js"></script>
<script type="text/javascript">
  seajs.use('./js/modules/main')
</script>
```
