// 如果要直接使用 Chrome 自带的 ESM 能力，需要在引入模块时加上 .js 后缀
// 如果不使用 Chrome 自带的 ESM 能力，则引入模块时可以不加 .js 后缀，编译时相关工具会自动加上

// import {foo, bar} from './module1'
import * as module1 from './module1.js'
import { DATA_ARR } from './module1.js'
import { fun1, fun2 } from './module2.js'
import person from './module3.js'

// Chrome 自带的 ESM 能力不支持直接引入 node_modules 中的库
// import $ from 'jquery'
// $('body').css('background', 'red')

// foo()
// bar()
module1.foo()
module1.bar()
console.log(DATA_ARR)
fun1()
fun2()

person.setName('app.js')
console.log(person.name)
