# cli-basic

## 脚手架原理

```bash
➜  ~ which pnpm
/Users/wanghao/.nvm/versions/node/v14.17.3/bin/pnpm
➜  ~ ll /Users/wanghao/.nvm/versions/node/v14.17.3/bin
-rwxr-xr-x  1 wanghao  staff    73M Jul  5  2021 node
lrwxr-xr-x  1 wanghao  staff    37B Oct 14 18:16 pnpm -> ../lib/node_modules/pnpm/bin/pnpm.cjs
lrwxr-xr-x  1 wanghao  staff    37B Oct 14 18:16 pnpx -> ../lib/node_modules/pnpm/bin/pnpx.cjs
➜  ~ ls /Users/wanghao/.nvm/versions/node/v14.17.3/lib/node_modules/pnpm
LICENSE      README.md    bin          dist         package.json
➜  ~ cat /Users/wanghao/.nvm/versions/node/v14.17.3/lib/node_modules/pnpm/bin/pnpm.cjs
#!/usr/bin/env node
const [major, minor] = process.version.slice(1).split('.')
const COMPATIBILITY_PAGE = `Visit https://r.pnpm.io/comp to see the list of past pnpm versions with respective Node.js version support.`

// We don't use the semver library here because:
//  1. it is already bundled to dist/pnpm.cjs, so we would load it twice
//  2. we want this file to support potentially older Node.js versions than what semver supports
if (major < 14 || major == 14 && minor < 6) {
  console.log(`ERROR: This version of pnpm requires at least Node.js v14.6
The current version of Node.js is ${process.version}
${COMPATIBILITY_PAGE}`)
  process.exit(1)
}

require('../dist/pnpm.cjs')

// if you want to debug at your local env, you can use this
// require('../lib/pnpm')
```

- 通过 `which pnpm` 来查看 pnpm 安装位置在 /Users/wanghao/.nvm/versions/node/v14.17.3/bin/pnpm，并且软链接到 /Users/wanghao/.nvm/versions/node/v14.17.3/lib/node_modules/pnpm/bin/pnpm.cjs
- pnpm.cjs 第一行指定在环境变量中查找 node 命名来执行该文件

  ```bash
  #!/usr/bin/env node
  ```

  - （另一种不推荐的方式）直接执行 /usr/bin 目录下的 node

  ```bash
  #!/usr/bin/node
  ```

- 为什么命令是叫 pnpm 呢？是因为在 package.json 中 bin 节点下指定了 key 为 pnpm

```json
"bin": {
    "pnpm": "bin/pnpm.cjs",
    "pnpx": "bin/pnpx.cjs"
},
```

- 执行 node xx.js 文件时，其实是把 js 文件中的代码变成了字符串传入到 node 中解释执行

```bash
➜  ~ node -e "console.log('bga')"
bga
```

## 脚手架开发流程

- 创建 npm 项目
- 创建脚手架入口文件，最上方添加

```bash
#!/usr/bin/env node
```

- 配置 package.json，添加 bin 属性
- 编写脚手架代码
- 将脚手架发布到 npm

## 难点

- 分包、命令注册、参数解析、options 全称、options 简写、带 params 的 options、帮助文档

## 发布

- 登录指定 npm 服务器

```bash
npm login --registry https://registry.npmjs.org/
```

- 在 package.json 中通过 publishConfig.registry 指定要发布的 npm 服务器地址

```bash
"publishConfig": {
    "registry": "https://registry.npmjs.org/"
},
```

- 发布

```bash
npm publish
```

- 使用

```bash
npm i bga-cli-basic -g --registry https://registry.npmjs.org/
```

## 调试

### 调试子包

- 在全局 node_modules 目录中创建 bga-cli-basic-lib 软链接到本地 cli-basic-lib 目录

```bash
➜  bga-js-full-stack-note git:(main) ✗ cd cli-basic-lib
➜  cli-basic-lib git:(main) ✗ npm link
npm WARN bga-cli-basic-lib@1.0.0 No description
npm WARN bga-cli-basic-lib@1.0.0 No repository field.

up to date in 10.073s
/Users/wanghao/.nvm/versions/node/v14.17.3/lib/node_modules/bga-cli-basic-lib -> /Users/wanghao/git/VSCode/BGA/bga-js-full-stack-note/cli-note/cli-basic-lib
```

- 在 cli-basic-main 中使用软链接到全局的 bga-cli-basic-lib

```bash
➜  bga-js-full-stack-note git:(main) ✗ cd cli-basic-main
➜  cli-basic-main git:(main) ✗ npm link bga-cli-basic-lib
/Users/wanghao/git/VSCode/BGA/bga-js-full-stack-note/cli-note/cli-basic-main/node_modules/bga-cli-basic-lib -> /Users/wanghao/.nvm/versions/node/v14.17.3/lib/node_modules/bga-cli-basic-lib -> /Users/wanghao/git/VSCode/BGA/bga-js-full-stack-note/cli-note/cli-basic-lib
```

- 如果要 unlink 的话，需要先到 cli-basic-main 中设置不软链接到全局的 bga-cli-basic-lib，然后再到 cli-basic-main 取消软链接到全局 node_modules。如果顺序反了的话会报错（解决方案一：直接删除 cli-basic-main/node_modules 中的 bga-cli-basic-lib；解决方案二：在 cli-basic-lib 中重新执行 link 到全局 node_modules 后才能在 cli-basic-main 中 unlink 成功），注意：unlink 的话会移除 package.json 的 dependencies 中的 bga-cli-basic-lib 依赖

```bash
cd cli-basic-main
# 先取消链接到全局的 bga-cli-basic-lib
npm unlink bga-cli-basic-lib
# 然后再重新安装发布后的 bga-cli-basic-lib
npm install -S bga-cli-basic-lib --registry https://registry.npmjs.org/
```

### 调试 cli

```bash
➜  cli-basic git:(main) ✗ npm link
npm notice created a lockfile as package-lock.json. You should commit this file.
npm WARN bga-cli-basic@1.0.0 No repository field.

up to date in 10.094s
/Users/wanghao/.nvm/versions/node/v14.17.3/bin/bga-cli-basic -> /Users/wanghao/.nvm/versions/node/v14.17.3/lib/node_modules/bga-cli-basic/bin/index.js
/Users/wanghao/.nvm/versions/node/v14.17.3/lib/node_modules/bga-cli-basic -> /Users/wanghao/git/VSCode/BGA/bga-js-full-stack-note/cli-note/cli-basic-main
```

## 痛点

- 重复操作
  - 多 package 本地 link
  - 多 package 依赖安装
  - 多 package 单元测试
  - 多 package 代码提交
  - 多 package 代码发布
- 版本一致性
  - 发布时版本一致性
  - 发布后相互依赖版本升级

## 脚手架开发常用库

- https://www.npmjs.com/package/yargs 是一个帮助构建交互式命令行工具的库，能够解析命令行参数并生成优雅的用户界面。提供了强大的 API 来定义命令、选项、参数等，支持链式调用，使得命令行工具的开发更加直观和简洁
- https://www.npmjs.com/package/commander 用于快速开发命令行应用的库，提供了用户命令行输入的高级抽象，包括命令解析、参数处理、帮助信息显示等功能。通过定义命令和选项，以及相关的回调函数，让命令行工具的开发变得简单而有条理
- https://www.npmjs.com/package/inquirer 是一个用户界面和查询会话流程的集合，用于在命令行应用中与用户交互。它可以创建各种类型的提示，例如确认、列表、输入、密码等，从而收集用户输入的信息。使得开发者能够以一种友好和交互式的方式向用户提问，并处理用户的回答

  - https://www.npmjs.com/package/@inquirer/prompts 和 inquirer 的区别是 inquirer 提供批量录入，一整个表单的提交；@inquirer/prompts 提供单个单个的录入，单个 Field 的提交

- https://en.wikipedia.org/wiki/ANSI_escape_code ANSI 转义码是一系列用于控制视频文本终端上的输出格式的代码。这些代码被嵌入到输出文本中，用于控制颜色、移动光标位置、清除屏幕等操作。它们被广泛用于命令行界面以增强文本的可读性和交互性

  - https://www.npmjs.com/package/chalk 用于在命令行中定制文本样式（如颜色、背景色、加粗等）。它通过链式调用的方式，让文本样式的设置变得简单直观。开发者可以轻松地为命令行工具的输出添加颜色和样式，提高用户体验
  - https://www.npmjs.com/package/ora 是一个用于命令行的优雅加载指示器（spinner），它可以在长时间运行的任务中显示一个旋转的指示器，以及可选的文本消息。这对于提升用户体验，特别是在执行一些耗时操作时，让用户知道程序正在运行而没有卡住，非常有帮助。ora 的 API 简单易用，允许自定义旋转器的样式、颜色和文本

- https://www.npmjs.com/package/lerna 是一个优化使用 git 和 npm 管理多包仓库（monorepo）的工作流的工具。它可以大大简化在单个仓库中管理多个包的过程，特别是在处理包之间的依赖、版本管理和发布时。lerna 能够自动解决包之间的依赖关系，以及在发布时自动更新包的版本号和依赖

  - 单一仓库管理多个包：lerna 允许你在一个仓库（monorepo）中管理多个独立发布的 npm 包，有助于提高项目的协作效率和模块化
  - 自动化版本管理和发布：lerna 可以自动为更改过的包更新版本号，并且可以一次性发布多个包，简化了版本控制和发布流程
  - 依赖关系管理：lerna 能够自动管理和链接仓库中包之间的依赖关系，使得本地开发和测试变得更加容易
  - 优化安装过程：通过使用 lerna bootstrap 命令，lerna 会自动将仓库中的包链接起来，并安装所有外部依赖，优化了安装过程

- https://www.npmjs.com/package/import-local 在全局安装的命令行工具中自动检测并使用本地安装的版本。当你在项目中同时拥有全局和本地安装的同一个包时，import-local 会确保优先使用项目内部的本地版本。这对于开发和使用命令行工具（如构建工具、脚手架等）非常有用，因为它确保了在任何给定的项目中都使用正确版本的工具，避免了全局和本地版本可能导致的冲突或不一致问题

- https://www.npmjs.com/package/npmlog 提供了一个灵活的日志记录系统，支持不同级别的日志消息（如 info、warn、error 等），并允许对这些消息进行颜色编码和样式化，以便于在控制台中的阅读和调试
