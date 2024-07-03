import { parse } from "@babel/parser"
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
const collectDep = (filePath: string, parentKey?: string) => {
    const key = getProjectPath(filePath)
    if (depRecord[key]) {
        console.warn(`循环依赖 ${parentKey} ${key}`)
        return
    }

    const code = readFileSync(filePath, 'utf-8').toString()
    depRecord[key] = {
        deps: [],
        code,
    }

    const ast = parse(code, { sourceType: 'module' })
    traverse(ast, {
        enter: (path) => {
            if (path.node.type === 'ImportDeclaration') {
                // 获取依赖的绝对路径
                const depAbsolutePath = resolve(dirname(filePath), path.node.source.value)
                // 转换为依赖的相对路径
                const depProjectPath = getProjectPath(depAbsolutePath)
                depRecord[key].deps.push(depProjectPath)
                // 收集嵌套依赖
                collectDep(depAbsolutePath, key)
            }
        }
    })
}

collectDep(resolve(projectRoot, 'index.js'))
console.log(depRecord)
