# Browserify 模块化使用教程

1. 创建项目结构

```txt
|-js
  |-dist // 打包生成文件的目录
  |-src // 源码所在的目录
    |-module1.js
    |-module2.js
    |-module3.js
    |-app.js // 应用主源文件
|-index.html
|-package.json
  {
    "name": "browserify-test",
    "version": "1.0.0"
  }
```

2. 下载 browserify

- yarn add browserify -D

3. 定义模块代码

- module1.js

  ```js
  module.exports = {
    foo() {
      console.log('moudle1 foo()')
    },
  }
  ```

- module2.js

  ```js
  module.exports = function () {
    console.log('module2()')
  }
  ```

- module3.js

  ```js
  exports.foo = function () {
    console.log('module3 foo()')
  }

  exports.bar = function () {
    console.log('module3 bar()')
  }
  ```

- app.js (应用的主 js)

  ```js
  // 引用模块
  let module1 = require('./module1')
  let module2 = require('./module2')
  let module3 = require('./module3')

  let uniq = require('uniq')

  // 使用模块
  module1.foo()
  module2()
  module3.foo()
  module3.bar()

  console.log(uniq([1, 3, 1, 4, 3]))
  ```

- 打包处理 js:

  - 方式 1：yarn browserify src/app.js -o build/bundle.js
  - 方式 2：在 package.json 中添加 build 配置，然后执行 yarn build

  ```json
  "scripts": {
    "build": "browserify src/app.js -o build/bundle.js"
  }
  ```

  - 页面使用引入:

    ```html
    <script type="text/javascript" src="js/build/bundle.js"></script>
    ```

- 也可以使用 Webpack 打包

  - 安装依赖 yarn add webpack webpack-cli -D
  - 在 package.json 中添加 dist 配置，然后执行 yarn dist

    ```json
    "scripts": {
      "dist": "webpack ./src/app.js -o ./dist --mode=development"
    }
    ```

  - 页面使用引入:

    ```html
    <script type="text/javascript" src="js/dist/main.js"></script>
    ```
