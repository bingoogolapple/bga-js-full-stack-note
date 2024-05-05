# cli-lerna

## 初始化项目

- 通过 npx 使用 lerna 来初始化

```bash
npx lerna@5.6.2 -v
npx lerna@5.6.2 init
```

- 或者全局安装 lerna 来初始化

```bash
npm install -g lerna@5.6.2
lerna init
```

## 初始化 cli-lerna-cli 并发布

- 创建包

```bash
lerna create cli-lerna-cli --es-module --bin cli-lerna-cli
```

- 该命令用于重新安装依赖
  - 安装所有包的依赖：对于仓库中的每个包，lerna bootstrap 会安装其在 package.json 中声明的所有依赖项。这相当于在每个包的目录中分别运行 npm install 或 yarn install（取决于 Lerna 配置或者环境）
  - 链接相互依赖的包：如果仓库中的包相互依赖，lerna bootstrap 会自动处理这些依赖关系。它通过创建符号链接（symlinks），将依赖包链接到依赖它的包的 node_modules 目录中。这样，包就可以直接引用仓库中的其他包，而不是从 npm 下载已发布的版本
  - 优化安装过程：通过链接本地包，lerna bootstrap 减少了重复安装相同包的需要，从而优化了整个安装过程。这对于开发效率和构建速度都是有益的
  - 支持 hoisting：lerna bootstrap 支持一个称为 "hoisting" 的特性，它会将所有包的依赖尽可能地提升到仓库的根目录下的 node_modules 中。这进一步减少了重复安装相同依赖的次数，节省了磁盘空间并加快了安装速度

```bash
lerna bootstrap
```

- 然后就能看到 node_modules/.bin 目录下会有 cli-lerna-cli 可执行文件

```bash
➜  node_modules git:(main) ✗ pwd
/Users/wanghao/git/VSCode/BGA/bga-js-full-stack-note/cli-note/cli-lerna/node_modules

➜  node_modules git:(main) ✗ ll .bin
lrwxr-xr-x  1 wanghao  staff    44B May  4 23:01 cli-lerna-cli -> ../@bga-note/cli-lerna-cli/bin/cli-lerna-cli

➜  node_modules git:(main) ✗ ll @bga-note/cli-lerna-cli
lrwxr-xr-x  1 wanghao  staff    28B May  4 23:01 @bga-note/cli-lerna-cli -> ../../packages/cli-lerna-cli
```

- 此时还不能在全局使用 cli-lerna-cli 命令，先在 scripts 中加个 dev 来在项目中直接使用 cli-lerna-cli 命令

```bash
"dev": "cli-lerna-cli -h"
```

- `lerna run` 执行 scripts

```bash
# 仅 @bga-note/cli-lerna-cli 这个包执行 dev
lerna run --scope @bga-note/cli-lerna-cli dev
# 仅 @bga-note/cli-lerna-cli 这个包执行 test
lerna run --scope @bga-note/cli-lerna-cli test
# 多个包中都执行 test
lerna run test
```

- `lerna exec` 执行 shell 命令

```bash
# 所有包中都执行 ls -al
lerna exec -- ls -al
# 仅 @bga-note/cli-lerna-cli 这个包执行 ls -al
lerna exec --scope @bga-note/cli-lerna-cli -- ls -al
lerna exec --scope=@bga-note/cli-lerna-cli -- ls -al

# 仅 @bga-note/cli-lerna-cli 这个包执行 npm link
lerna exec --scope @bga-note/cli-lerna-cli -- npm link
```

- npk link 下 @bga-note/cli-lerna-cli 后就能在全局使用 cli-lerna-cli 命令了

```bash
➜  cli-lerna git:(main) ✗ lerna exec --scope @bga-note/cli-lerna-cli -- npm link
info cli using local version of lerna
lerna notice cli v5.6.2
lerna notice filter including "@bga-note/cli-lerna-cli"
lerna info filter [ '@bga-note/cli-lerna-cli' ]
lerna info Executing command in 1 package: "npm link"

up to date in 286ms
lerna success exec Executed command in 1 package: "npm link"

➜  cli-lerna git:(main) ✗ npm root -g
/Users/wanghao/.nvm/versions/node/v20.12.2/lib/node_modules

➜  cli-lerna git:(main) ✗ ll /Users/wanghao/.nvm/versions/node/v20.12.2/lib/node_modules/@bga-note/cli-lerna-cli
lrwxr-xr-x  1 wanghao  staff   100B May  4 23:43 /Users/wanghao/.nvm/versions/node/v20.12.2/lib/node_modules/@bga-note/cli-lerna-cli -> ../../../../../../../git/VSCode/BGA/bga-js-full-stack-note/cli-note/cli-lerna/packages/cli-lerna-cli

➜  cli-lerna git:(main) ✗ cli-lerna-cli -h
cli-lerna-cli

我是描述信息

Options:
  -h, --help     Show help                                             [boolean]
  -v, --version  Show version number                                   [boolean]
```

- 添加依赖

```bash
lerna add import-local --scope @bga-note/cli-lerna-cli
# 或
lerna add import-local --scope=@bga-note/cli-lerna-cli
# 或
lerna add import-local packages/cli-lerna-cli

lerna add commander --scope @bga-note/cli-lerna-cli
```

- 链接依赖，会把我们自己开发的模块软链接到最外层的 node_modules 中

```bash
lerna link
```

- 从所有包中删除 node_modules 目录

```bash
lerna clean
```

- 修改版本（可选，因为发布时也可以修改版本）

```bash
lerna version
```

- `lerna publish` 发布
  - 发布时必须要有 LICENSE.md 文件
  - 如果是发布到组织，默认认为是私有的，需要在 package.json 中通过将 publishConfig.access 指定为 public 才能发布成功

```bash
➜  cli-lerna git:(main) ✗ lerna publish
info cli using local version of lerna
lerna notice cli v5.6.2
lerna info current version 0.0.4
Enter passphrase for key '/Users/wanghao/.ssh/bga_rsa':
lerna info Assuming all packages changed
? Select a new version (currently 0.0.4) Patch (0.0.5)

Changes:
 - @bga-note/cli-lerna-cli: 0.0.4 => 0.0.5

? Are you sure you want to publish these packages? Yes
lerna info execute Skipping releases
lerna info git Pushing tags...
Enter passphrase for key '/Users/wanghao/.ssh/bga_rsa':
lerna info publish Publishing packages to npm...
lerna notice Skipping all user and access validation due to third-party registry
lerna notice Make sure you're authenticated properly ¯\_(ツ)_/¯
lerna success published @bga-note/cli-lerna-cli 0.0.5
lerna notice
lerna notice 📦  @bga-note/cli-lerna-cli@0.0.5
lerna notice === Tarball Contents ===
lerna notice 356B  bin/cli-lerna-cli
lerna notice 110B  lib/cli-lerna-cli.js
lerna notice 1.3kB lib/cli.js
lerna notice 585B  lib/entry-yargs.js
lerna notice 1.1kB package.json
lerna notice 0B    LICENSE.md
lerna notice 116B  README.md
lerna notice === Tarball Details ===
lerna notice name:          @bga-note/cli-lerna-cli
lerna notice version:       0.0.5
lerna notice filename:      bga-note-cli-lerna-cli-0.0.5.tgz
lerna notice package size:  1.7 kB
lerna notice unpacked size: 3.6 kB
lerna notice shasum:        2af96bd72f04f424edfeb191f0611c8dcd41e070
lerna notice integrity:     sha512-iDeUoOg3KxNOh[...]9smFm0yQfV6+w==
lerna notice total files:   7
lerna notice
Successfully published:
 - @bga-note/cli-lerna-cli@0.0.5
lerna success published 1 package
```

- 使用

```bash
# 取消链接到全局
rm /Users/wanghao/.nvm/versions/node/v20.12.2/bin/cli-lerna-cli
rm -rf /Users/wanghao/.nvm/versions/node/v20.12.2/lib/node_modules/@bga-note/cli-lerna-cli

npm i @bga-note/cli-lerna-cli -g --registry https://registry.npmjs.org/

cli-lerna-cli -h
```

## 初始化各种 command

- 创建包

```bash
lerna create cli-lerna-utils --es-module
lerna create cli-lerna-command --es-module
lerna create cli-lerna-command-init --es-module
```

- 添加依赖

```bash
# esm 读取 __dirname 和 __filename
lerna add dirname-filename-esm --scope @bga-note/cli-lerna-cli
# 文件操作
lerna add fs-extra --scope @bga-note/cli-lerna-cli
# 用于比较 Node 版本
lerna add semver --scope @bga-note/cli-lerna-cli
# 用于输出特定样式的文字
lerna add chalk --scope @bga-note/cli-lerna-cli
# 用于封装日志库
lerna add npmlog --scope @bga-note/cli-lerna-utils

lerna add @bga-note/cli-lerna-utils --scope @bga-note/cli-lerna-command
# 或
lerna add @bga-note/cli-lerna-utils --scope= @bga-note/cli-lerna-command
# 或
lerna add @bga-note/cli-lerna-utils packages/cli-lerna-command

lerna add @bga-note/cli-lerna-utils --scope @bga-note/cli-lerna-command-init
lerna add @bga-note/cli-lerna-utils --scope @bga-note/cli-lerna-cli

lerna add @bga-note/cli-lerna-command --scope @bga-note/cli-lerna-command-init
lerna add @bga-note/cli-lerna-command-init --scope @bga-note/cli-lerna-cli
```

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
- https://www.npmjs.com/package/semver 提供了一系列函数，用于比较、分析和操作遵循语义版本控制规范的版本号
- https://www.npmjs.com/package/fs-extra 扩展了 Node.js 标准库中的 fs 模块（文件系统模块），提供了更多便利的文件操作方法，同时保留了所有原生 fs 模块的功能。fs-extra 添加了一些额外的文件系统方法，使得文件和目录的操作更加简单和直观，特别是在处理复制、移动、删除文件或目录等操作时
- https://www.npmjs.com/package/dirname-filename-esm 提供了一种在使用 ES 模块（ECMAScript Modules）时获取当前模块文件路径（`__filename`）和目录路径（`__dirname`）的方法。在 CommonJS 模块系统中，`__filename` 和 `__dirname` 是全局可用的，但在 ES 模块中，这两个变量不再直接可用，因此 dirname-filename-esm 库应运而生，以解决这一问题
  - 在新版 Node 中已经支持通过 import.meta.filename 和 import.meta.dirname 获取
