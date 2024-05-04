# monorepo-yarn-lerna

yarn workspace 和 lerna 结合着使用，用 yarn workspace 来处理依赖问题，用 lerna 来处理发布问题

- 查看全局命令安装位置

```shell
npm root -g
```

- 安装 Lerna

```shell
npm install -g lerna
```

## Lerna 命令

### 项目初始化

- `lerna init` 将仓库转变为 Lerna 仓库；或者将现有的仓库升级为适配当前版本的 Lerna

### 创建包

- `lerna create` 创建 package

```shell
# 创建 CommonJS 模块规范的包
lerna create @monorepo-yarn-lerna/package-a
# 创建 ES Module 规范的包
lerna create @monorepo-yarn-lerna/package-b --es-module
```

- `lerna add` 安装依赖

```shell
# 给多个包增加公共依赖：给所有包都安装 lodash
lerna add lodash@4.17.21
# 给某个包单独安装指定依赖：给 @monorepo-yarn-lerna/package-b 这个包安装 lodash
lerna add lodash@4.17.21 --scope @monorepo-yarn-lerna/package-b

# 通过 lerna 安装被 lerna 管理的子包时，不指定版本也能安装成功
lerna add @monorepo-yarn-lerna/package-a --scope @monorepo-yarn-lerna/package-b
```

- `lerna link` 链接依赖，会把我们自己开发的模块软链接到最外层的 node_modules 中
- `lerna ls` 查看有哪些包，`lerna ls --json` 加上 --json 参数后会输出包的路径

```txt
➜  monorepo-yarn-lerna git:(master) ✗ lerna ls
info cli using local version of lerna
lerna notice cli v5.5.4
@monorepo-yarn-lerna/package-a
@monorepo-yarn-lerna/package-b
lerna success found 2 packages
```

### 开发和测试

- `lerna exec -- <command>` 执行 shell 脚本

```shell
# 给多个包移除公共依赖：给所有包都移除 lodash
lerna exec -- yarn remove lodash
# 给某个包单独安装指定依赖：给 @monorepo-yarn-lerna/package-b 这个包安装 lodash
lerna exec --scope @monorepo-yarn-lerna/package-b -- yarn remove lodash

# 多个包中都执行 yarn dev
lerna exec -- yarn dev
```

- `lerna run` 执行 npm 命令

```shell
# 多个包中都执行 dev
lerna run dev
# 仅 @monorepo-yarn-lerna/package-b 这个包执行 dev
lerna run --scope @monorepo-yarn-lerna/package-b dev
```

- `lerna clean` 从所有包中删除 node_modules 目录
- `lerna bootstrap` 重新安装依赖

### 发布上线

- `lerna version` 修改版本号
- `lerna changed` 查看上个版本以来的所有变更
- `lerna diff` 查看 diff
- `lerna publish` 发布项目，lerna.json 中 version 指定为 independent 时表示不同模块不同版本，否则表示不同模块使用相同版本

## 参考文档

- https://github.com/lerna/lerna/tree/main/commands/create
- https://lerna.js.org/docs/getting-started
- http://www.ptbird.cn/lerna-app-npm.html
- https://mp.weixin.qq.com/s/Yl56pLDeVPAF5JbeYPTlOw
- https://mp.weixin.qq.com/s/4xQTeK0ViMKcCAhSg9P3Vg
