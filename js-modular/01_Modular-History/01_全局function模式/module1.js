/**
 * 全局函数模式: 将不同的功能封装成不同的全局函数
 * 问题: Global 被污染了, 很容易引起命名冲突
 */
// 数据
let data = '全局 function：module1 data'
function foo() {
  console.log(`全局 function：module1 foo() ${data}`)
}
function bar() {
  console.log('全局 function：module1 bar()')
}
