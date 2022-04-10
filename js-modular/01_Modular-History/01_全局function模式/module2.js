let data2 = 'module2 data'
function foo() {
  // 与另一个模块中的函数冲突了
  console.log(`全局 function：module2 foo() ${data2}`)
}
