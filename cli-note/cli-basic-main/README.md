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
