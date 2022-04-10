/**
 * namespace模式: 简单对象封装
 * 作用: 减少了全局变量
 * 问题: 不安全(数据不是私有的)
 */
let myModule2 = {
  data: 'namespace 模式：module2 data',
  foo() {
    console.log(`namespace 模式：module2 foo() ${this.data}`)
  },
  bar() {
    console.log(`namespace 模式：module2 bar() ${this.data}`)
  },
}
