var moduleInfoList = [
    {
        key: "index.js",
        depPathToProjectPathMap: {"./a/a.js":"a/a.js","./b/b.js":"b/b.js"},
        code: function(require, module, exports) {
            "use strict";

var _a = require("./a/a.js");
var _b = require("./b/b.js");
// 测试注释

console.log((0, _a.getA)());
console.log((0, _b.getB)());
        }
    },
    {
        key: "a/a.js",
        depPathToProjectPathMap: {"../b/b.js":"b/b.js"},
        code: function(require, module, exports) {
            "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getA = exports.a = void 0;
var _b = require("../b/b.js");
var a = exports.a = "a-value";
var getA = exports.getA = function getA() {
  return "\u5728 a.js \u4E2D\u6253\u5370\uFF1A".concat(_b.b);
};
        }
    },
    {
        key: "b/b.js",
        depPathToProjectPathMap: {"../a/a.js":"a/a.js"},
        code: function(require, module, exports) {
            "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getB = exports.b = void 0;
var _a = require("../a/a.js");
var b = exports.b = "b-value";
var getB = exports.getB = function getB() {
  return "\u5728 b.js \u4E2D\u6253\u5370\uFF1A".concat(_a.a);
};
        }
    }
];

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
        throw new Error(`${key} is not found`);
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
