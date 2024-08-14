import { parse } from "@babel/parser"
import _traverse from "@babel/traverse"
import _generate from "@babel/generator"

const traverse = (_traverse as any).default as typeof _traverse
const generate = (_generate as any).default as typeof _generate

const code = `let a = 'let'; let b = 2;`

// 1、把代码变成 ast
const ast = parse(code, { sourceType: 'module' })
// 2、遍历 ast 进行修改
traverse(ast, {
    enter: (path) => {
        // console.log('enter type', path.node.type)
        if (path.node.type === 'VariableDeclaration') {
            if (path.node.kind === 'let') {
                path.node.kind = 'var'
            }
        }
        if (path.node.type === 'Identifier') {
            path.node.name += 1;
        }
    },
    exit: (path) => {
        // console.log('exit type', path.node.type)
    }
})
// 3、把 ast 生成新代码
const result = generate(ast, { sourceMaps: true }, code);

console.log('----- code start -----')
console.log(result.code)
console.log('----- code end -----')
console.log('----- map start -----')
console.log(result.map)
console.log('----- map end -----')