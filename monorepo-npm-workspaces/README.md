# monorepo-npm-workspaces

## 1、基本用法

- 查看全局命令安装位置

```shell
npm root -g
```

- 初始化项目

  ```shell
  mkdir monorepo-npm-workspaces
  cd monorepo-npm-workspaces
  npm init
  ```

- 配置 package.json

  ```json
  {
    "name": "monorepo-npm-workspaces",
    "private": true,
    "workspaces": {
      "packages": ["packages/*"]
    }
  }
  ```

  - private:true：定义了本项目为私有项目，在使用 npm workspace 时需要始终将 private 属性设置为 true
  - workspaces.packages：定义了每个 package 的位置。在本项目中，我们将会把每个 package 放在 packages 目录下。注意该属性为字符串数组，我们可以根据自身项目情况添加多个位置

- 在 monorepo 目录下创建 packages 文件夹，用于存放我们的 packages

  ```shell
  mkdir packages
  ```

- 在 packages 目录下，创建文件夹 package-a，同时 npm 初始化。name 命名一般是 @根目录项目名称/子包名

  ```shell
  cd packages
  mkdir package-a
  cd package-a
  npm init
  ```

  ```json
  {
    "name": "@monorepo-npm-workspaces/package-a",
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

- 在 packages 目录下，创建文件夹 package-b，同时 npm 初始化，并且依赖 @monorepo-npm-workspaces/package-b

  ```shell
  cd packages
  mkdir package-b
  cd package-b
  npm init
  ```

  ```json
  {
    "name": "@monorepo-npm-workspaces/package-b",
    "version": "1.0.0",
    "main": "index.js",
    "license": "MIT",
    "scripts": {
      "dev": "node index.js"
    },
    "dependencies": {
      "@monorepo-npm-workspaces/package-a": "1.0.0"
    }
  }
  ```

  ```js
  require("@monorepo-npm-workspaces/package-a");
  console.log("这是 package-b");
  ```

- 此时直接在 package-b 中执行 `npm run dev` 会报以下错误

  ```txt
  ➜  package-b git:(main) ✗ npm run dev

  > @monorepo-npm-workspaces/package-b@1.0.0 dev
  > node index.js

  node:internal/modules/cjs/loader:1147
    throw err;
    ^

  Error: Cannot find module '@monorepo-npm-workspaces/package-a'
  ```

  - 需要先在 monorepo-npm-workspaces 中执行 `npm install` 安装一下依赖，然后再在 package-b 中执行 `npm run dev`

- 每个 package 并没有自己的 node_modules，而是都保存在了根目录下的 node_modules 里面。这也是 monorepo 另一个优势，所有的依赖都会安装在根目录下，减小磁盘占用空间，提高打包速度，并且统一管理版本

- 在外层运行指定模块脚本

```shell
npm run dev -w packages/package-a
npm run dev -w=packages/package-a
npm run dev --workspace packages/package-a
npm run dev --workspace=packages/package-a
```

- 在外层运行多个模块脚本

```shell
npm run dev -w packages/package-a -w packages/package-b
npm run dev -w=packages/package-a -w=packages/package-b
npm run dev -workspace packages/package-a -workspace packages/package-b
npm run dev -workspace=packages/package-a -workspace=packages/package-b
```

- 在外层运行所有模块的脚本

```shell
npm run dev -ws
npm run dev --workspace

# 如果使 npm 忽略缺少目标脚本的工作区，可以加上 --if-present 标志
npm run test -ws --if-present
```

- 相应的包将符号链接到当前工作目录的 node_modules 文件夹

```shell
➜  monorepo-npm-workspaces git:(main) ✗ ll node_modules/@monorepo-npm-workspaces
total 0
lrwxr-xr-x  1 wanghao  staff    24B May  4 17:57 package-a -> ../../packages/package-a
lrwxr-xr-x  1 wanghao  staff    24B May  4 17:57 package-b -> ../../packages/package-b
```

## 参考文档

- https://nodejs.cn/npm/cli/v7/using-npm/workspaces
