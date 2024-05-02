import { test } from './test/test'
test()

import pkg from '../package.json'
console.log('这是', pkg.name, pkg.version)

export const sum = (a: number, b: number) => {
  return a + b + 3
}

export const print = (msg: string | number) => {
  console.log(`${pkg.name}::`, msg)
}
