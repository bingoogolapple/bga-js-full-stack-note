# server-express

```shell
yarn init
tsc --init
```

## 环境配置

### HelloWorld 配置

- 添加 typescript 编译器依赖

```shell
yarn add typescript --dev
```

- 在 src 目录中添加 index.ts，并输出 Hello TypeScript

```ts
console.log('Hello TypeScript')
```

- 修改 tsconfig.json，将 rootDir 的值设置为 ./src，将 outDir 的值设置为 ./build
- 在 package.json 的 scripts 中添加运行配置，运行 `yarn start-tsc` 既可以输出 Hello TypeScript

```json
"scripts": {
    "start-hello": "tsc && node build/index.js"
}
```

#### 使用集成编译运行一体的 [ts-node](https://github.com/TypeStrong/ts-node)

- 添加依赖

```shell
yarn add ts-node --dev
```

- 在 package.json 的 scripts 中添加运行配置，运行 `yarn start-ts-node` 既可以输出 Hello TypeScript

```json
"scripts": {
    "start-ts-node": "ts-node ./src/index.ts"
}
```

### 正式配置

- 添加运行依赖
  - [concurrently](https://www.npmjs.com/package/concurrently)
  - [nodemon](https://github.com/remy/nodemon) 用来监视 node.js 应用程序中的任何更改并自动重启服务，非常适合用在开发环境中
  - [cross-env](https://github.com/kentcdodds/cross-env) 是跨平台设置和使用环境变量的脚本。在大多数 Windows 命令行中在使用 NODE_ENV = production 设置环境变量时会报错。同样，Windows 和 Linux 命令如何设置环境变量也有所不同。使用 cross-env 可以设置在不同的平台上有相同的 NODE_ENV 参数

```shell
yarn add typescript concurrently nodemon cross-env --dev
```

- 在 package.json 的 scripts 中添加运行配置，运行 `yarn dev` 既可以输出 Hello TypeScript

```json
"scripts": {
  "dev:build": "tsc -w",
  "dev:start": "nodemon node ./build/index.js",
  "dev-long": "tsc && concurrently \"yarn:dev:build\" \"yarn:dev:start\"",
  "dev": "tsc && concurrently \"yarn:dev:*\"" //上面那行的简写。最前面的 tsc 是先编译一次 ts，避免第一次运行 dev:start 时找不到 index.js 文件
}
```

- 添加 express 依赖

```shell
yarn add express
yarn add @types/express --dev
```

- 如果要通过 cookie、session 来管理登录状态的话还需要添加 cookie-session 依赖

```shell
yarn add cookie-session
yarn add @types/cookie-session --dev
```

- 启用装饰器：修改 tsconfig.json，将 experimentalDecorators 和 emitDecoratorMetadata 的值设置为 true

```shell
yarn add reflect-metadata
```

- 添加其他依赖

```shell
yarn add lodash
yarn add @types/lodash --dev
```

```shell
yarn add md5
yarn add @types/md5 --dev
```

```shell
yarn add uuid
yarn add @types/uuid --dev
```

```shell
# https://github.com/auth0/node-jsonwebtoken
yarn add jsonwebtoken
yarn add @types/jsonwebtoken --dev
```

```shell
yarn add mysql
yarn add @types/mysql --dev
```

```shell
yarn add validator
yarn add @types/validator --dev
```

```shell
yarn add request
yarn add @types/request --dev
```

## 创建前端项目

```shell
npm uninstall create-react-app -g
npx create-react-app my-app --template typescript
```
