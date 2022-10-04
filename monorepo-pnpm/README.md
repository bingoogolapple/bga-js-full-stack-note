# monorepo-pnpm

## 1、基本用法

- 安装 pnpm

  ```shell
  npm install -g pnpm
  ```

- 初始化项目

  ```shell
  mkdir monorepo-pnpm
  cd monorepo-pnpm
  pnpm init
  ```

- 配置 package.json

  ```json
  {
    "name": "monorepo-pnpm",
    "private": true
  }
  ```

- 配置 pnpm-workspace.yaml

  ```yaml
  packages:
    - "packages/*"
  ```

- 在 monorepo 目录下创建 packages 文件夹，用于存放我们的 packages

  ```shell
  mkdir packages
  ```

- 在 packages 目录下，创建文件夹 package-a，同时 pnpm 初始化。name 命名一般是 @根目录项目名称/子包名

  ```shell
  cd packages
  mkdir package-a
  cd package-a
  pnpm init
  ```

  ```json
  {
    "name": "@monorepo-pnpm/package-a",
    "version": "1.0.0",
    "main": "index.js",
    "license": "MIT",
    "scripts": {
      "dev": "node index.js"
    }
  }
  ```

  ```js
  console.log("这是 package-a");
  ```

- 在 packages 目录下，创建文件夹 package-b，同时 pnpm 初始化，并且依赖 @monorepo-pnpm/package-b

  ```shell
  cd packages
  mkdir package-b
  cd package-b
  pnpm init
  ```

  ```json
  {
    "name": "@monorepo-pnpm/package-b",
    "version": "1.0.0",
    "main": "index.js",
    "license": "MIT",
    "scripts": {
      "dev": "node index.js"
    },
    "dependencies": {
      "@monorepo-pnpm/package-a": "1.0.0"
    }
  }
  ```

  ```js
  require("@monorepo-pnpm/package-a");
  console.log("这是 package-b");
  ```

- 此时直接在 package-b 中执行 `pnpm dev` 会报以下错误

  ```txt
  Error: Cannot find module '@monorepo-pnpm/package-a'
  ```

  - 需要先执行 `pnpm install` 安装一下依赖，然后再执行 `pnpm dev`

## 2、常用命令

- 在开发项目过程中，我们也许需要 prettier 等工具帮我们格式化代码，这时，我们可以在根目录下安装 prettier。需要加上 -w 来让 pnpm workspace 在根目录下安装依赖

```shell
pnpm add prettier -D -w
```

- 卸载根目录下的包同理，也需要加上 -w

```shell
pnpm remove prettier -D -w
```

- 安装依赖

```shell
# 给多个包增加公共依赖：给所有包都安装 lodash
pnpm add lodash@4.17.21
# 给某个包单独安装指定依赖：给 @monorepo-pnpm/package-b 这个包安装 lodash
pnpm --filter @monorepo-pnpm/package-b add lodash@4.17.21
# 安装当前 monorepo 中的子包，并指定版本，最终为 workspace:1.0.0
pnpm --filter @monorepo-pnpm/package-b add @monorepo-pnpm/package-a@1.0.0
# 如果是安装当前 monorepo 中的子包，可以不用指定版本，最终为 workspace:^1.0.0
pnpm --filter @monorepo-pnpm/package-b add @monorepo-pnpm/package-a
```

- 删除依赖

```shell
pnpm remove lodash
pnpm --filter @monorepo-pnpm/package-b remove lodash
pnpm --filter package-b remove lodash
pnpm --filter "*/package-b" remove lodash
pnpm --filter @monorepo-pnpm/package-b remove @monorepo-pnpm/package-a
```

- 执行指定包中的 scripts

```shell
pnpm --filter @monorepo-pnpm/package-b dev
pnpm --filter @monorepo-pnpm/package-b run dev
```
