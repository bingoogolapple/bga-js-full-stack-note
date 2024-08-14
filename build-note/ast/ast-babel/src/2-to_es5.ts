// @babel/core 里依赖了 @babel/parser、@babel/traverse、@babel/generator 的
import { parseSync, transformFromAstSync } from "@babel/core"
import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

// const code = `let a = 'let'; let b = 2; const c = 3;`
const code = readFileSync(resolve(import.meta.dirname, '../test/test1.js'), 'utf-8').toString()

const ast = parseSync(code, { sourceType: 'module' })
const result = transformFromAstSync(ast, code, {
    presets: ['@babel/preset-env'],
    sourceMaps: true,
})

console.log('----- code start -----')
console.log(result.code)
console.log('----- code end -----')
console.log('----- map start -----')
console.log(result.map)
console.log('----- map end -----')

writeFileSync(resolve(import.meta.dirname, '../build/test1.es5.js'), result.code, "utf-8")