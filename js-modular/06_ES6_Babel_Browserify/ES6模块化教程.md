# ES6-Babel-Browserify 使用教程

1. 定义 package.json 文件

```json
{
  "name": "es6-babel-browserify",
  "version": "1.0.0"
}
```

2. 安装 babel-cli, babel-preset-es2015 和 browserify

- yarn add babel-cli babel-preset-es2015 browserify -D
  - preset 预设(将 es6 转换成 es5 的所有插件打包)

3. 定义 .babelrc 文件，rc => runtime configuration

```json
{
  "presets": ["es2015"]
}
```

4. 编码

- js/src/module1.js 分别暴露

  ```js
  export function foo() {
    console.log('module1 foo()')
  }
  export function bar() {
    console.log('module1 bar()')
  }
  export const DATA_ARR = [1, 3, 5, 1]
  ```

- js/src/module2.js 统一暴露

  ```js
  let data = 'module2 data'

  function fun1() {
    console.log('module2 fun1() ' + data)
  }

  function fun2() {
    console.log('module2 fun2() ' + data)
  }

  export { fun1, fun2 }
  ```

- js/src/module3.js

  ```js
  export default {
    name: 'Tom',
    setName: function (name) {
      this.name = name
    },
  }
  ```

- js/src/app.js

  ```js
  import { foo, bar } from './module1'
  import { DATA_ARR } from './module1'
  import { fun1, fun2 } from './module2'
  import person from './module3'

  import $ from 'jquery'

  $('body').css('background', 'red')

  foo()
  bar()
  console.log(DATA_ARR)
  fun1()
  fun2()

  person.setName('JACK')
  console.log(person.name)
  ```

5. 编译

- 使用 Babel 将 ES6 编译为 ES5 代码(但包含 CommonJS 语法): yarn babel src -d build/pre
- 使用 Browserify 编译 js: yarn browserify build/pre/app.js -o build/bundle.js

- 在 package.json 中添加 build 配置，然后执行 yarn build

  ```json
  "scripts": {
    "build": "babel src -d build/pre && browserify build/pre/app.js -o build/bundle.js"
  }
  ```

6. 也可以直接使用 Webpack 来打包

- 安装依赖 yarn add webpack webpack-cli -D
- 在 package.json 中添加 dist 配置，然后执行 yarn dist

  ```json
  "scripts": {
    "dist": "webpack ./src/app.js -o ./dist --mode=development"
  }
  ```

7. 页面中引入测试

```html
<!-- Babel、Browserify 打包 -->
<script type="text/javascript" src="build/bundle.js"></script>
<!-- Webpack 打包 -->
<script type="text/javascript" src="dist/main.js"></script>
```

8. 引入第三方模块(jQuery)

- 下载 jQuery 模块:

  - yarn add jquery@1

- 在 app.js 中引入并使用

  ```js
  import $ from 'jquery'
  $('body').css('background', 'red')
  ```
