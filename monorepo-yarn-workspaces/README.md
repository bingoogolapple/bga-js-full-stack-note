# monorepo-yarn-workspaces

## 1、基本用法

- 初始化项目

  ```shell
  mkdir monorepo-yarn-workspaces
  cd monorepo-yarn-workspaces
  yarn init
  ```

- 配置 package.json

  ```json
  {
    "name": "monorepo-yarn-workspaces",
    "version": "1.0.0",
    "license": "MIT",
    "private": true,
    "workspaces": {
      "packages": ["packages/*"]
    }
  }
  ```

  - private:true：定义了本项目为私有项目，在使用 yarn workspace 时需要始终将 private 属性设置为 true
  - workspaces.packages：定义了每个 package 的位置。在本项目中，我们将会把每个 package 放在 packages 目录下。注意该属性为字符串数组，我们可以根据自身项目情况添加多个位置

- 在 monorepo 目录下创建 packages 文件夹，用于存放我们的 packages

  ```shell
  mkdir packages
  ```

- 在 packages 目录下，创建文件夹 package-a，同时 yarn 初始化。name 命名一般是 @根目录项目名称/子包名

  ```shell
  cd packages
  mkdir package-a
  cd package-a
  yarn init
  ```

  ```json
  {
    "name": "@monorepo-yarn-workspaces/package-a",
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

- 在 packages 目录下，创建文件夹 package-b，同时 yarn 初始化，并且依赖 @monorepo-yarn-workspaces/package-b

  ```shell
  cd packages
  mkdir package-b
  cd package-b
  yarn init
  ```

  ```json
  {
    "name": "@monorepo-yarn-workspaces/package-b",
    "version": "1.0.0",
    "main": "index.js",
    "license": "MIT",
    "scripts": {
      "dev": "node index.js"
    },
    "dependencies": {
      "@monorepo-yarn-workspaces/package-a": "1.0.0"
    }
  }
  ```

  ```js
  require("@monorepo-yarn-workspaces/package-a");
  console.log("这是 package-b");
  ```

- 此时直接在 package-b 中执行 `yarn dev` 会报以下错误

  ```txt
  ➜  package-b yarn dev
  yarn run v1.22.18
  $ node index.js
  internal/modules/cjs/loader.js:905
  throw err;
  ^

  Error: Cannot find module '@monorepo-yarn-workspaces/package-a'
  ```

  - 需要先在 package-b 中执行 `yarn` 安装一下依赖，然后再执行 `yarn dev`

- 每个 package 并没有自己的 node_modules，而是都保存在了根目录下的 node_modules 里面。这也是 monorepo 另一个优势，所有的依赖都会安装在根目录下，减小磁盘占用空间，提高打包速度，并且统一管理版本

## 特殊配置

- 默认情况下，monorepo 中所有的依赖都会储存在根目录下的 node_modules 中，但某些情况下，我们可能需要同一 package 的不同版本。此时就需要在 workspaces.nohoist 中添加不需要共享的 packages 的名称

  - 不配置 nohoist 时

    - 先在 package-a 中安装依赖，然后再在 package-b 中安装依赖：和版本大小无关，都是 package-a 的依赖被放到 package-a 下的 node_modules
      - 先在 package-a 中执行 `yarn add lodash@4.17.20`, package-a 中的 lodash 依赖会被存储在根目录下的 node_modules，然后在 package-b 中执行 `yarn add lodash@4.17.21`，**package-a 中的 lodash@4.17.20 依赖会被存储在 package-a 下的 node_modules**，package-b 中的 lodash 依赖会被存储在根目录下的 node_modules；如果此时再在 package-b 中执行 `yarn remove lodash`，那么 package-a 中的 lodash@4.17.20 依赖会被存储在根目录下的 node_modules
      - 先在 package-a 中执行 `yarn add lodash@4.17.21`, package-a 中的 lodash 依赖会被存储在根目录下的 node_modules，然后在 package-b 中执行 `yarn add lodash@4.17.20`，**package-a 中的 lodash@4.17.21 依赖会被存储在 package-a 下的 node_modules**，package-b 中的 lodash 依赖会被存储在根目录下的 node_modules；如果此时再在 package-b 中执行 `yarn remove lodash`，那么 package-a 中的 lodash@4.17.21 依赖会被存储在根目录下的 node_modules
    - 先在 package-b 中安装依赖，然后再在 package-a 中安装依赖：和版本大小有关，版本大的会被放到对应 package-x 下的 node_modules
      - 先在 package-b 中执行 `yarn add lodash@4.17.21`, package-b 中的 lodash 依赖会被存储在根目录下的 node_modules，然后在 package-a 中执行 `yarn add lodash@4.17.20`，**package-b 中的 lodash@4.17.21 依赖会被存储在 package-b 下的 node_modules**，package-a 中的 lodash 依赖会被存储在根目录下的 node_modules；如果此时再在 package-a 中执行 `yarn remove lodash`，那么 package-b 中的 lodash@4.17.21 依赖会被存储在根目录下的 node_modules
      - 先在 package-b 中执行 `yarn add lodash@4.17.20`, package-b 中的 lodash 依赖会被存储在根目录下的 node_modules，然后在 package-a 中执行 `yarn add lodash@4.17.21`，**package-a 中的 lodash@4.17.21 依赖会被存储在 package-a 下的 node_modules**，package-b 中的 lodash 依赖会被存储在根目录下的 node_modules；如果此时再在 package-b 中执行 `yarn remove lodash`，那么 package-a 中的 lodash@4.17.21 依赖会被存储在根目录下的 node_modules

  - 配置 nohoist 时：被配置到 nohoist 中的依赖全都被存储到对应 package-x 下的 node_modules，不会被存储到根目录下的 node_modules

    ```json
    {
      "name": "monorepo-yarn-workspaces",
      "version": "1.0.0",
      "license": "MIT",
      "private": true,
      "workspaces": {
        "packages": ["packages/*"],
        "nohoist": ["**/lodash"]
      },
      "devDependencies": {
        "prettier": "^2.7.1"
      }
    }
    ```

- 在开发项目过程中，我们也许需要 prettier 等工具帮我们格式化代码，这时，我们可以在根目录下安装 prettier。需要加上 -W 来让 yarn workspace 在根目录下安装依赖

```shell
yarn add prettier -D -W
```

- 卸载根目录下的包同理，也需要加上 -W

```shell
yarn remove prettier -D -W
```

## 常用命令

- 查看 workspaces 信息

```shell
yarn workspaces info
```

```txt
➜  monorepo-yarn-workspaces yarn workspaces info
yarn workspaces v1.22.18
{
  "@monorepo-yarn-workspaces/package-a": {
    "location": "packages/package-a",
    "workspaceDependencies": [],
    "mismatchedWorkspaceDependencies": []
  },
  "@monorepo-yarn-workspaces/package-b": {
    "location": "packages/package-b",
    "workspaceDependencies": [
      "@monorepo-yarn-workspaces/package-a"
    ],
    "mismatchedWorkspaceDependencies": []
  }
}
✨  Done in 0.09s.
```

- 安装依赖

```shell
yarn workspace @monorepo-yarn-workspaces/package-b add lodash@4.17.21
# 如果是安装当前 monorepo 中的子包，需要指定版本号，否则会安装失败
yarn workspace @monorepo-yarn-workspaces/package-b add @monorepo-yarn-workspaces/package-a@1.0.0
```

- 删除依赖

```shell
yarn workspace @monorepo-yarn-workspaces/package-b remove lodash
yarn workspace @monorepo-yarn-workspaces/package-b remove @monorepo-yarn-workspaces/package-a
```

- 执行指定包中的 scripts

```shell
yarn workspace @monorepo-yarn-workspaces/package-b dev
```
