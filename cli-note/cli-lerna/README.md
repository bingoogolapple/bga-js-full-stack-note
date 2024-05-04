# cli-lerna

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

- 创建包

```bash
lerna create cli-lerna-cli --bin cli-lerna-cli
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
lerna exec --scope @bga-note/cli-lerna-cli -- npm unlink
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

lerna add npmlog --scope @bga-note/cli-lerna-cli
lerna add commander --scope @bga-note/cli-lerna-cli

lerna add @bga-note/cli-lerna-utils --scope @bga-note/cli-lerna-cli
# 或
lerna add @bga-note/cli-lerna-utils --scope=@bga-note/cli-lerna-cli
# 或
lerna add @bga-note/cli-lerna-utils packages/cli-lerna-cli
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

- 发布
  - 发布时必须要有 LICENSE.md 文件
  - 如果是发布到组织，默认认为是私有的，需要在 package.json 中通过将 publishConfig.access 指定为 public 才能发布成功

```bash
lerna publish
```

- 使用

```bash
lerna exec --scope @bga-note/cli-lerna-cli -- npm unlink

npm i @bga-note/cli-lerna-cli -g --registry https://registry.npmjs.org/

cli-lerna-cli -h
```
