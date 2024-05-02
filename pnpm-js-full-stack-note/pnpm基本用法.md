# pnpm 基本用法

- 安装 pnpm

```shell
pnpm init
```

- 初始化项目

```shell
mkdir bga-js-full-stack-note
cd bga-js-full-stack-note
pnpm init
```

- 配置 package.json

```json
{
  "name": "bga-js-full-stack-note",
  "private": true
}
```

- 配置 pnpm-workspace.yaml

```yaml
packages:
  # 存放项目
  - 'packages/*'
  # 存放通用组件和工具方法等
  - 'common/*'
```

- 在指定路径中启动 pnpm，而不是当前的工作目录

```shell
pnpm -C packages/package-b add @bga-note/package-a
```

- 在工作空间的根目录中启动 pnpm ，而不是当前的工作目录

```shell
pnpm -w -D add prettier
```

- 通过指定 package.json 中的 name 来选择准确的包来执行

```shell
pnpm -F @bga-note/package-b dev
```

- 使用模式来选择一组包来执行，注意：这种情况需要为模式加上双引号

```shell
pnpm -F "@bga-note/package-*" dev
```

- 通过在包名后面加上 ... 来选择一个软件包及其依赖项来执行

```shell
pnpm -F @bga-note/package-b... dev
```

- 通过在模式匹配后面加上 ... 来选择一个软件包及其依赖项来执行

```shell
pnpm -F "@bga-note/package-*..." dev
```

- 通过在包名前面加上 ... 来选择一个软件包及其依赖项来执行

```shell
pnpm -F ...@bga-note/package-a dev
```

- 通过在模式匹配前面加上 ... 来选择一个软件包及其依赖项来执行

```shell
pnpm -F "...@bga-note/package-*" dev
```

- 本地的包 a 依赖包 b 时，如何让包 a 强制使用远程的包 b？
  - 在包 a 的 package.json 中去掉包 b 版本号前面的 workspace:
  - 将包 b 的 package.json 中版本号升级一个小版本（只要不等于包 a 中依赖的版本就行）
