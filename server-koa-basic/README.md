# server-express-basic

## 初始化项目

- 初始化 node 项目

```shell
mkdir server-express-basic
cd server-express-basic
yarn init
```

- 初始化 TypeScript

```shell
tsc --init
```

- 添加 typescript 编译器依赖

```shell
yarn add typescript -D
```

- 配置 tsconfig.json，将 rootDir 的值设置为 ./src，将 outDir 的值设置为 ./build

- 启用装饰器

  - 修改 tsconfig.json，将 experimentalDecorators 和 emitDecoratorMetadata 的值设置为 true
  - 添加 [reflect-metadata](https://www.npmjs.com/package/reflect-metadata) 运行时依赖

  ```shell
  yarn add reflect-metadata
  ```

- 添加环境变量加载库 [dotenv](https://www.npmjs.com/package/dotenv)

```shell
yarn add dotenv
```

- 添加 [koa](https://www.npmjs.com/package/koa) 依赖

```shell
yarn add koa
yarn add @types/koa -D
```

- 添加 [koa-router](https://www.npmjs.com/package/koa-router) 依赖

```shell
yarn add koa-router
yarn add @types/koa-router -D
```

- 添加 [koa-body](https://www.npmjs.com/package/koa-body) 依赖

```shell
yarn add koa-body
```

- 添加 [koa-static](https://www.npmjs.com/package/koa-static) 依赖

```shell
yarn add koa-static
yarn add @types/koa-static -D
```

- 错误处理 [koa-json-error](https://www.npmjs.com/package/koa-json-error)

```shell
yarn add koa-json-error
yarn add @types/koa-json-error -D
```

- [@koa/cors](https://www.npmjs.com/package/@koa/cors)

```shell
yarn add @koa/cors
yarn add @types/koa__cors -D
```

### 其他依赖

- [log4js](https://www.npmjs.com/package/log4js)

```shell
yarn add log4js
```

- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) 认证

```shell
yarn add jsonwebtoken
yarn add @types/jsonwebtoken -D
```

- [async-validator](https://www.npmjs.com/package/async-validator)

```shell
yarn add async-validator
```

```shell
yarn add uuid
yarn add @types/uuid -D
```

- [bcryptjs](https://www.npmjs.com/package/bcryptjs)

```shell
yarn add bcryptjs
yarn add @types/bcryptjs -D
```

- [mysql2](https://www.npmjs.com/package/mysql2)

```shell
yarn add mysql2
```

- [sequelize-typescript](https://www.npmjs.com/package/sequelize-typescript)

```shell
yarn add sequelize sequelize-typescript
```

## 配置单测

- 添加相关依赖

```shell
yarn add jest @types/jest -D
# 支持 ts 单测
yarn add ts-jest -D
# 支持网络请求单测
yarn add supertest @types/supertest -D
```

- 在 package.json 的 jest 中添加配置，使用 ts-jest 来跑单测

```json
"jest": {
  "preset": "ts-jest"
}
```

## 运行配置

- [nodemon](https://github.com/remy/nodemon) 用来监视 node.js 应用程序中的任何更改并自动重启服务，非常适合用在开发环境中

```shell
yarn add nodemon ts-node -D
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
