import { parse, transform } from "@babel/core"
import _traverse from "@babel/traverse"
import { resolve, dirname } from 'node:path'
import { readFileSync } from 'node:fs'

const traverse = (_traverse as any).default as typeof _traverse

const projectRoot = resolve(import.meta.dirname, '../test/project1')

interface FileInfo { deps: string[], code: string }

const depRecord: Record<string, FileInfo> = {}

// 获取相对于测试项目根目录的路径
const getProjectPath = (filePath: string) => {
    return filePath.substring(projectRoot.length + 1)
}

// 收集依赖
const collect = (filePath: string, parentKey?: string) => {
    const key = getProjectPath(filePath)
    if (depRecord[key]) {
        console.warn(`循环依赖 ${parentKey} ${key}`)
        return
    }

    const code = readFileSync(filePath, 'utf-8').toString()
    // 转换为 es5
    const es5Result = transform(code, {
        presets: ['@babel/preset-env'],
        ast: true, // 返回转换后的 ast
    })
    depRecord[key] = {
        deps: [],
        code: es5Result.code,
    }

    const addDep = (depPath: string) => {
        // 获取依赖的绝对路径
        const depAbsolutePath = resolve(dirname(filePath), depPath)
        // 转换为依赖的相对路径
        const depProjectPath = getProjectPath(depAbsolutePath)
        depRecord[key].deps.push(depProjectPath)
        // 收集嵌套依赖
        collect(depAbsolutePath, key)
    }

    const ast = parse(code, { sourceType: 'module' })
    // traverse(es5Result.ast, {
    traverse(ast, {
        enter: (path) => {
            // 从 cjs 的 ast 中解析 require
            if (path.node.type === 'Identifier' && path.node.name === 'require' && path.parent.type === 'CallExpression') {
                if (path.parent.arguments[0]?.type === 'StringLiteral') {
                    addDep(path.parent.arguments[0].value)
                }
            }
            // 从 esm 的 ast 中解析 import
            if (path.node.type === 'ImportDeclaration') {
                addDep(path.node.source.value)
            }
        }
    })
}

collect(resolve(projectRoot, 'index.js'))
console.log(depRecord)
