# js-modular

js 模块化开发学习笔记，参考 https://www.bilibili.com/video/BV1ZL4y1q7uW

## 模块化的理解

- 什么是模块?

  - 将一个复杂的程序依据一定的规则(规范)封装成几个块(文件)，并进行组合在一起
  - 块的内部数据/实现是私有的，只是向外部暴露一些接口(方法)与外部其它模块通信

- 一个模块的组成

  - 私有的数据--->内部的变量
  - 私有的行为(操作数据)--->内部的函数
  - 向外暴露 n 个行为

- 模块化

  - 编码时是按照模块一个一个编码的，整个项目就是一个模块化的项目

## 模块化的进化过程

- 全局 function 模式:

  - 编码: 全局变量/函数
  - 问题: 污染全局命名空间, 容易引起命名冲突/数据不安全

- namespace 模式:

  - 编码: 将数据/行为封装到对象中
  - 解决: 命名冲突(减少了全局变量)
  - 问题: 数据不安全(外部可以直接修改模块内部的数据)

- IIFE 模式/增强:

  - IIFE: 立即调用函数表达式--->匿名函数自调用
  - 编码: 将数据和行为封装到一个函数内部, 通过给 window 添加属性来向外暴露接口
  - 引入依赖: 通过函数形参来引入依赖模块

    ```js
    ;(function (window, module2) {
      var data = 'module1 data'
      function foo() {
        module2.xxx()
        console.log('foo()' + data)
      }
      function bar() {
        console.log('bar()' + data)
      }

      window.module = { foo }
    })(window, module2)
    ```

### 模块化规范

#### CommonJS(掌握)

- Node.js: 服务器端
- Browserify: 浏览器端，也称为 js 的打包工具
- 一个单独的文件就是一个模块。每一个模块都是一个单独的作用域，也就是说，在一个文件定义的变量（还包括函数和类），都是私有的，对其他文件是不可见的
- 基本语法:

  - 定义暴露模块: exports

    ```js
    exports.xxx = value
    module.exports = value
    ```

  - 引入模块: require

    ```js
    var module = require('模块名/模块相对路径')
    ```

- 引入模块发生在什么时候?

  - Node: 运行时，动态同步引入
    - 模块的加载是运行时同步加载的，所以只有加载完成才能执行后面的操作
    - 像 Node.js 主要用于服务器的编程，加载的模块文件一般都已经存在本地硬盘，所以加载起来比较快，不用考虑异步加载的方式，所以 CommonJS 规范比较适用
    - 但如果是浏览器环境，要从服务器加载模块，这是就必须采用异步模式。所以就有了 AMD、CMD 等解决方案
  - Browserify: 在运行前对模块进行编译/转译/打包的处理(已经将依赖的模块包含进来了)，运行的是打包生成的 js，运行时不存在需要再从远程引入依赖模块

#### AMD(异步模块定义 Asynchromous Module Definition): 浏览器端(了解)

- https://github.com/amdjs/amdjs-api/wiki/AMD
- AMD 是 RequireJS(require.js) 在推广过程中对模块定义的规范化产出
- 对于依赖的模块，AMD 是提前执行
- 基本语法

  - 定义暴露模块: define([依赖模块名], function(){return 模块对象})
  - 引入模块: require(['模块 1', '模块 2', '模块 3'], function(m1, m2){// 使用模块对象})
  - 配置:

    ```js
    require.config({
      // 基本路径
      baseUrl: 'js/',
      // 标识名称与路径的映射
      paths: {
        模块1: 'modules/模块1',
        模块2: 'modules/模块2',
        angular: 'libs/angular',
        'angular-messages': 'libs/angular-messages',
      },
      // 非 AMD 的模块
      shim: {
        angular: {
          exports: 'angular',
        },
        'angular-messages': {
          exports: 'angular-messages',
          deps: ['angular'],
        },
      },
    })
    ```

### UMD(Universal Module Definition)

- umd 是 AMD 和 CommonJS 的糅合，
- AMD 浏览器第一的原则发展异步加载模块
- CommonJS 模块以服务器第一原则发展，选择同步加载，它的模块无需包装(unwrapped modules)
- 这迫使人们又想出另一个更通用的模式 UMD。希望解决跨平台的解决方案。多被一些需要同时支持浏览器端和服务端引用的第三方库所使用。UMD 是一个时代的产物，当各种环境最终实现 ES harmony 的统一的规范后，它也将退出历史舞台
- UMD 先判断是否支持 Node.js 的模块（exports）是否存在，存在则使用 Node.js 模块模式，再判断是否支持 AMD（define 是否存在），存在则使用 AMD 方式加载模块；前两个都不存在，则将模块公开到全局（window 或 global）

#### CMD(通用模块定义 Common Module Definition): 浏览器端（了解，优先级最低）

- https://github.com/seajs/seajs/issues/242
- CMD 是 SeaJS(sea.js) 在推广过程中对模块定义的规范化产出
- 基本语法

  - 定义暴露模块:

    ```js
    define(function (require, module, exports) {
      // 通过 require 引入依赖模块
      // 通过 module / exports 来暴露模块
      exports.xxx = value
    })
    ```

  - 使用模块 seajs.use(['模块 1', '模块 2'])

##### CMD 和 AMD 的区别

- 对于依赖的模块，AMD 是提前执行，CMD 是延迟执行
- CMD 推崇依赖就近，按需加载；AMD 推崇依赖前置

#### ES6（掌握）

- ES6 内置了模块化的实现
- 基本语法

  - 定义暴露模块: export

    - 暴露一个对象:

      ```js
      export default 对象
      ```

    - 暴露多个:

      ```js
      export var xxx = value1
      export let yyy = value2

      var xxx = value1
      let yyy = value2
      export { xxx, yyy }
      ```

  - 引入使用模块: import

    - default 模块:

      ```js
      import xxx from '模块路径/模块名'
      ```

    - 其它模块

      ```js
      import { xxx, yyy } from '模块路径/模块名'
      import * as module1 from '模块路径/模块名'
      ```

- 问题: 所有浏览器还不能直接识别 ES6 模块化的语法
- 解决:
  - 使用 Babel 将 ES6 ---> ES5(使用了 CommonJS) ---- 浏览器还不能直接执行
  - 使用 Browserify ---> 打包处理 ---- 浏览器可以运行
