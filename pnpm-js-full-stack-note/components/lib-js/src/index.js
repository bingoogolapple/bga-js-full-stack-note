const pkg = require('../package.json')
console.log('这是', pkg.name, pkg.version)
const sum = (a, b) => {
  return a + b + 3
}
const print = (msg) => {
  console.log(`${pkg.name}::`, msg)
}

module.exports = {
  sum,
  print,
}
