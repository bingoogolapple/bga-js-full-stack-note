/**
 * namespace模式: 简单对象封装
 * 作用: 减少了全局变量
 * 问题: 不安全(数据不是私有的, 外部可以直接修改)
 */
let myModule = {
  data: 'namespace 模式：module1 data',
  foo() {
    console.log(`namespace 模式：module1 foo() ${this.data}`)
  },
  bar() {
    console.log(`namespace 模式：module1 bar() ${this.data}`)
  },
}
