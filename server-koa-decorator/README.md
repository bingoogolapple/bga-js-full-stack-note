# server-express-decorator

## 初始化项目

- 初始化 node 项目

```shell
mkdir server-express-decorator
cd server-express-decorator
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
# 生成 test-report.html 文件；即使不使用该插件也会生成一份测试覆盖率报告 coverage/Icov-report/index.html
yarn add jest-html-reporter -D
```

### 配置 ts-jest 来支持跑 ts 单测：方式一

- 在 package.json 的 jest 中添加配置，使用 ts-jest 来跑单测

```json
"jest": {
  "preset": "ts-jest"
}
```

### 配置 ts-jest 来支持跑 ts 单测：方式二

- 生成 jest 配置文件 jest.config.js

```shell
yarn ts-jest config:init
```

- 生成的 jest.config.js 内容为

```js
/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
}
```

- jset 默认支持直接使用 ts 来写 jest.config.ts，可以从 @jest/types 中获取到配置类型定义

```ts
import { Config } from '@jest/types'

const config: Config.InitialOptions = {
  preset: 'ts-jest', // 直接测试 ts 代码需要使用 ts-jest
  testEnvironment: 'node',
  // reporters: [
  //   'default',
  //   [
  //     './node_modules/jest-html-reporter', // 即使不使用该插件，加上 --coverage 参数也会生成一份测试覆盖率报告 coverage/Icov-report/index.html
  //     {
  //       pageTitle: 'Test Report',
  //       outputPath: './coverage/test-report.html',
  //     },
  //   ],
  // ],
  // coverageDirectory: 'coverage', // 测试覆盖率目录，默认就是 coverage
  // collectCoverage: true, // 生成覆盖率
  // collectCoverageFrom: ['src/**/!(*.d).ts'], // 忽略掉 .d.ts
}

export default config
```

## 运行配置

- [nodemon](https://github.com/remy/nodemon) 用来监视 node.js 应用程序中的任何更改并自动重启服务，非常适合用在开发环境中

```shell
yarn add nodemon ts-node -D
```

- 添加 nodemon.json 配置文件

```json
{
  "watch": ["src", "package.json", "tsconfig.json", ".env"],
  "ignore": ["node_modules"],
  "exec": "node --inspect=0.0.0.0:9229 --require ts-node/register src/index.ts",
  "ext": "ts,json"
}
```

- 在 package.json 的 scripts 中添加运行配置，运行 `yarn dev` 既可以输出 Hello TypeScript

```json
"scripts": {
  "dev": "nodemon",
  "test": "jest --watch",
  "coverage": "jest --coverage",
  "dev1": "node --inspect=0.0.0.0:9229 --require ts-node/register src/index.ts",
  "dev2": "nodemon --ext 'ts,json' --exec 'node --inspect=0.0.0.0:9229 --require ts-node/register src/index.ts'",
  "test1": "node --inspect ./node_modules/jest/bin/jest --runInBand --no-cache --no-watchman"
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
      "name": "nodemon启动并调试",
      "request": "launch",
      "restart": true,
      "runtimeExecutable": "nodemon",
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
    },
    // 单测配置
    {
      "type": "node",
      "name": "vscode-jest-tests",
      "request": "launch",
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen",
      "disableOptimisticBPs": true,
      "cwd": "${workspaceFolder}",
      "runtimeExecutable": "yarn",
      "args": ["test", "--runInBand", "--watchAll=false"]
    }
  ]
}
```

- 也可以「访问 chrome://inspect -> Open dedicated DevTools for Node」来调试 node 应用
