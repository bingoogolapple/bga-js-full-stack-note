# cli-lerna

- 安装 lerna

```bash
npm i lerna -D
```

- 创建包

```bash
lerna create core
lerna create utils
```

- 添加依赖

```bash
lerna add @dwit/cli-lerna-utils --scope @dwit/cli-lerna-core
# 或
lerna add @dwit/cli-lerna-utils --scope=@dwit/cli-lerna-core
# 或
lerna add @dwit/cli-lerna-utils packages/core
```

- 链接依赖

```bash
lerna link
```

- 从所有包中删除 node_modules 目录

```bash
lerna clean
```

- 重新安装依赖

```bash
lerna bootstrap
```

- 执行指定包中的 npm 命令

```bash
lerna run --scope @dwit/cli-lerna-core testInit
```

- 在指定包中执行 shell 命令

```bash
lerna exec --scope @dwit/cli-lerna-utils -- rm -rf node_modules

lerna exec --scope @dwit/cli-lerna-core -- npm link
lerna exec --scope @dwit/cli-lerna-core -- npm unlink
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
npm i @dwit/cli-lerna-core -g --registry https://registry.npmjs.org/

bga-cli-lerna
```
