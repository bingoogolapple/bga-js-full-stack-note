# server-node

## 初始化项目

- 初始化 node 项目

```shell
mkdir server-node
cd server-node
yarn init
```

- 初始化 TypeScript

```shell
tsc --init
```

- 添加 typescript 编译器依赖

```shell
yarn add typescript --dev
```

- 配置 tsconfig.json，将 rootDir 的值设置为 ./src，将 outDir 的值设置为 ./build

- 添加环境变量加载库 [dotenv](https://www.npmjs.com/package/dotenv)

```shell
yarn add dotenv
```

## 运行配置（废弃，这种方式不支持调试 ts）

- 添加运行相关的 dev 依赖
  - [concurrently](https://www.npmjs.com/package/concurrently) 同时执行多个命令
  - [nodemon](https://github.com/remy/nodemon) 用来监视 node.js 应用程序中的任何更改并自动重启服务，非常适合用在开发环境中

```shell
yarn add concurrently nodemon --dev
```

- 在 package.json 的 scripts 中添加运行配置，运行 `yarn dev` 既可以输出 Hello TypeScript

```json
"scripts": {
  "dev:build": "tsc -w", // 监听 ts 文件变化并编译
  "dev:start": "nodemon ./build/index.js", // 启动应用，并且监听文件变化时会自动重启
  "dev-long": "tsc && concurrently \"yarn:dev:build\" \"yarn:dev:start\"", // 最前面的 tsc 是先编译一次 ts，避免第一次运行 dev:start 时找不到 index.js 文件
  "dev": "tsc && concurrently \"yarn:dev:*\"" //上面那行的简写
}
```

- 配置 VSCode 调试

```json
{
  "version": "0.2.0",
  "configurations": [
    // 直接使用 nodemon 启动并调试
    {
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen",
      "name": "nodemon启动",
      "program": "${workspaceFolder}/build/index.js",
      "request": "launch",
      "restart": true,
      "runtimeExecutable": "nodemon",
      "runtimeArgs": ["--ext", "js,json"],
      "skipFiles": ["<node_internals>/**"],
      "type": "pwa-node"
    },
    // attach 到通过 node 或 nodemon 启动的应用进行调试
    {
      "name": "Attach",
      "port": 9229,
      "request": "attach",
      "skipFiles": ["<node_internals>/**"],
      "type": "pwa-node"
    }
  ]
}
```

## 运行配置（推荐）

- [nodemon](https://github.com/remy/nodemon) 用来监视 node.js 应用程序中的任何更改并自动重启服务，非常适合用在开发环境中

```shell
yarn add nodemon ts-node --dev
```

- 在 package.json 的 scripts 中添加运行配置，运行 `yarn dev` 既可以输出 Hello TypeScript

```json
"scripts": {
  "dev": "nodemon --ext 'ts,json' --exec 'node --inspect=0.0.0.0:9229 --require ts-node/register src/index.ts'"
}
```

- 配置 VSCode 调试

```json
{
  "version": "0.2.0",
  "configurations": [
    // 直接使用 nodemon 启动并调试
    {
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen",
      "name": "nodemon启动",
      "program": "${workspaceFolder}/src/index.ts",
      "request": "launch",
      "restart": true,
      "runtimeExecutable": "nodemon",
      "runtimeArgs": ["--ext", "ts,json"],
      "skipFiles": ["<node_internals>/**"],
      "type": "pwa-node"
    },
    // attach 到通过 node 或 nodemon 启动的应用进行调试
    {
      "name": "Attach",
      "port": 9229,
      "request": "attach",
      "skipFiles": ["<node_internals>/**"],
      "type": "pwa-node"
    }
  ]
}
```
