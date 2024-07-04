import { parse, transform } from "@babel/core"
import _traverse from "@babel/traverse"
import { resolve, dirname } from 'node:path'
import { readFileSync, writeFileSync } from 'node:fs'

const traverse = (_traverse as any).default as typeof _traverse

const projectRoot = resolve(import.meta.dirname, '../test/project1')

interface ModuleInfo {
    key: string
    depPathToProjectPathMap: Record<string, string>
    code: string
}

const moduleInfoList: ModuleInfo[] = []

// 获取相对于测试项目根目录的路径
const getProjectPath = (filePath: string) => {
    return filePath.substring(projectRoot.length + 1)
}

// 收集依赖
const collect = (filePath: string, parentKey?: string) => {
    const key = getProjectPath(filePath)
    if (moduleInfoList.find(item => item.key === key)) {
        console.warn(`循环依赖 ${parentKey} ${key}`)
        return
    }

    const code = readFileSync(filePath, 'utf-8').toString()
    // 转换为 es5
    const es5Result = transform(code, {
        presets: ['@babel/preset-env'],
        ast: true, // 返回转换后的 ast
    })
    const moduleInfo = {
        key,
        depPathToProjectPathMap: {},
        code: es5Result.code,
    }
    moduleInfoList.push(moduleInfo)

    // 递归收集依赖
    const addDep = (depPath: string) => {
        // 获取依赖的绝对路径
        const depAbsolutePath = resolve(dirname(filePath), depPath)
        // 转换为依赖的相对路径
        const depProjectPath = getProjectPath(depAbsolutePath)
        moduleInfo.depPathToProjectPathMap[depPath] = depProjectPath
        // 收集嵌套依赖
        collect(depAbsolutePath, key)
    }

    // 解析模块的 ast
    const ast = parse(code, { sourceType: 'module' })

    // 遍历 ast 递归收集模块的依赖
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
// console.log(moduleInfoList)

const generateCode = () => {
    let code = ''
    code += `var moduleInfoList = [\n` + moduleInfoList.map(item => {
        const { key, depPathToProjectPathMap, code } = item
        return `    {
        key: "${key}",
        depPathToProjectPathMap: ${JSON.stringify(depPathToProjectPathMap)},
        code: function(require, module, exports) {
            ${code}
        }
    }`
    }).join(',\n') + `\n];\n`
    code += `
// 用于缓存已被 require 过的模块的结果
var moduleExportsMap = {};

// 返回值就是最终 require 的返回值，也就是被引入的模块的 module.exports
function execute(key) {
    const existModuleExports = moduleExportsMap[key];
    // 如果已经 require 过就直接返回上次的结果
    if (existModuleExports) {
        return existModuleExports;
    }

    const moduleInfo = moduleInfoList.find(item => item.key === key);
    if (!moduleInfo) {
        throw new Error(\`\${key} is not found\`);
    }

    // 模拟 cjs 全局上下文 require 函数
    function require(relativeDepPath) {
        // 将相对（当前文件）依赖路径转换为相对于项目路径的 key
        const projectPath = moduleInfo.depPathToProjectPathMap[relativeDepPath];
        // 执行相对于项目录路径的文件
        return execute(projectPath);
    }

    // 后面的值其实就是 cjs 全局上下文 exports
    moduleExportsMap[key] = { __esModule: true };

    // 模拟 cjs 全局上下文 module
    var module = { exports: moduleExportsMap[key] };

    // 引入对应模块其实就是调用 code 方法来执行一下模块中的代码，传入 cjs 中需要的 require、module、exports 等全局上下文参数
    moduleInfo.code(require, module, module.exports);

    return module.exports;
}

// 执行下入口文件代码，第 0 个就是入口文件
execute(moduleInfoList[0].key);
`
    return code
}

const code = generateCode()
writeFileSync(resolve(projectRoot, 'dist.es5.js'), code, "utf-8")