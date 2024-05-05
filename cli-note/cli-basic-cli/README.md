# cli-basic

## 脚手架原理

```bash
➜  cli-note git:(main) ✗ which pnpm
/Users/wanghao/.nvm/versions/node/v20.12.2/bin/pnpm
➜  cli-note git:(main) ✗ ll /Users/wanghao/.nvm/versions/node/v20.12.2/bin
lrwxr-xr-x  1 wanghao  staff    37B May  4 21:50 pnpm -> ../lib/node_modules/pnpm/bin/pnpm.cjs
lrwxr-xr-x  1 wanghao  staff    37B May  4 21:50 pnpx -> ../lib/node_modules/pnpm/bin/pnpx.cjs
➜  cli-note git:(main) ✗ ll /Users/wanghao/.nvm/versions/node/v20.12.2/lib/node_modules/pnpm
total 48
-rw-r--r--   1 wanghao  staff   1.1K May  4 21:50 LICENSE
-rw-r--r--   1 wanghao  staff    11K May  4 21:50 README.md
drwxr-xr-x   4 wanghao  staff   128B May  4 21:50 bin
drwxr-xr-x  13 wanghao  staff   416B May  4 21:50 dist
-rw-r--r--   1 wanghao  staff   5.6K May  4 21:50 package.json
➜  cli-note git:(main) ✗ cat /Users/wanghao/.nvm/versions/node/v20.12.2/lib/node_modules/pnpm/bin/pnpm.cjs
#!/usr/bin/env node
const [major, minor] = process.version.slice(1).split('.')
const COMPATIBILITY_PAGE = `Visit https://r.pnpm.io/comp to see the list of past pnpm versions with respective Node.js version support.`

// We don't use the semver library here because:
//  1. it is already bundled to dist/pnpm.cjs, so we would load it twice
//  2. we want this file to support potentially older Node.js versions than what semver supports
if (major < 18 || major == 18 && minor < 12) {
  console.log(`ERROR: This version of pnpm requires at least Node.js v18.12
The current version of Node.js is ${process.version}
${COMPATIBILITY_PAGE}`)
  process.exit(1)
}

// We need to load v8-compile-cache.js separately in order to have effect
try {
  require('v8-compile-cache');
} catch {
  // We don't have/need to care about v8-compile-cache failed
}

global['pnpm__startedAt'] = Date.now()
require('../dist/pnpm.cjs')

// if you want to debug at your local env, you can use this
// require('../lib/pnpm')
```

- 通过 `which pnpm` 来查看 pnpm 安装位置在 /Users/wanghao/.nvm/versions/node/v20.12.2/bin/pnpm，并且软链接到 /Users/wanghao/.nvm/versions/node/v20.12.2/lib/node_modules/pnpm/bin/pnpm.cjs
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

- 如果包名带了组织，则还需配置 publishConfig.access 为 public

```bash
"publishConfig": {
  "registry": "https://registry.npmjs.org/",
  "access": "public"
}
```

- 发布

```bash
npm publish
```

- 使用

```bash
npm i @bga-note/cli-basic-cli -g --registry https://registry.npmjs.org/
```

## 调试

### 调试子包

- 在全局 node_modules 目录中创建 cli-basic-lib 软链接到本地 cli-basic-lib 目录

```bash
➜  cli-basic-lib git:(main) ✗ npm link

added 1 package in 593ms
➜  cli-basic-lib git:(main) ✗ ll /Users/wanghao/.nvm/versions/node/v20.12.2/lib/node_modules/@bga-note/cli-basic-lib
lrwxr-xr-x  1 wanghao  staff    81B May  5 20:47 /Users/wanghao/.nvm/versions/node/v20.12.2/lib/node_modules/@bga-note/cli-basic-lib -> ../../../../../../../git/VSCode/BGA/bga-js-full-stack-note/cli-note/cli-basic-lib
```

- 在 cli-basic-cli 中使用软链接到全局的 @bga-note/cli-basic-lib

```bash
➜  cli-basic-cli git:(main) ✗ npm link @bga-note/cli-basic-lib

added 1 package in 762mscli-basic-lib
➜  cli-basic-cli git:(main) ✗ ll node_modules/@bga-note/cli-basic-lib
lrwxr-xr-x  1 wanghao  staff    22B May  5 20:56 node_modules/@bga-note/cli-basic-lib -> ../../../cli-basic-lib
```

- 如果要 unlink 的话，需要先到 cli-basic-cli 中设置不软链接到全局的 @bga-note/cli-basic-lib，然后再到 cli-basic-lib 取消软链接到全局 node_modules。如果顺序反了的话会报错（解决方案一：直接删除 cli-basic-cli/node_modules 中的 @bga-note/cli-basic-lib；解决方案二：在 cli-basic-lib 中重新执行 link 到全局 node_modules 后才能在 cli-basic-cli 中 unlink 成功），注意：unlink 的话会移除 package.json 的 dependencies 中的 cli-basic-lib 依赖

```bash

cd cli-basic-cli
# 先取消链接到全局的 cli-basic-lib
npm unlink @bga-note/cli-basic-lib

# 删除之前软链接到全局的 @bga-note/cli-basic-lib
rm -rf /Users/wanghao/.nvm/versions/node/v20.12.2/lib/node_modules/@bga-note/cli-basic-lib

# 或者删除 cli-basic-cli 下的 cli-basic-lib
rm -rf cli-basic-cli/node_modules/@bga-note/cli-basic-lib

# 重新安装发布后的 @bga-note/cli-basic-lib 来覆盖
npm install -S @bga-note/cli-basic-lib --registry https://registry.npmjs.org/

```

### 调试 cli

```bash
➜  cli-basic-cli git:(main) ✗ npm link

added 1 package in 596ms
➜  cli-basic-cli git:(main) ✗ ll /Users/wanghao/.nvm/versions/node/v20.12.2/lib/node_modules/@bga-note/cli-basic-cli
lrwxr-xr-x  1 wanghao  staff    81B May  5 21:01 /Users/wanghao/.nvm/versions/node/v20.12.2/lib/node_modules/@bga-note/cli-basic-cli -> ../../../../../../../git/VSCode/BGA/bga-js-full-stack-note/cli-note/cli-basic-cli
➜  cli-basic-cli git:(main) ✗ ll /Users/wanghao/.nvm/versions/node/v20.12.2/bin/cli-basic-cli
lrwxr-xr-x  1 wanghao  staff    56B May  5 21:01 /Users/wanghao/.nvm/versions/node/v20.12.2/bin/cli-basic-cli -> ../lib/node_modules/@bga-note/cli-basic-cli/bin/index.js
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
