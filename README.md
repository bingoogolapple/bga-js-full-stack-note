# bga-electron-note

Electron 开发学习笔记

![screenshot](./screenshot.gif)

## 运行

- 本地运行

```shell
yarn dev
```

- 打包

```shell

yarn dist
```

## 备忘

- [官方文档](https://www.electronjs.org/docs)
- [创建你的第一个应用](https://www.electronjs.org/docs/tutorial/first-app)
- Electron 打包时不会打包 devDependencies，只有 Electron 主进程用到的依赖才添加到 dependencies 中

```shell
mkdir bga-electron-note
cd bga-electron-note
npm init
yarn add electron --dev
yarn add electron-is-dev --dev
yarn add concurrently --dev
yarn add wait-on --dev
yarn add nodemon --dev
yarn add cross-env --dev
yarn add electron-builder --dev
yarn add webpack-cli --dev
yarn add ts-loader --dev
yarn add tsconfig-paths-webpack-plugin --dev

yarn add react-router-dom --dev
yarn add @types/react-router-dom --dev

yarn add redux --dev
yarn add react-redux --dev

yarn add redux-logger --dev
yarn add @types/redux-logger --dev

yarn add redux-devtools-extension --dev

yarn add redux-thunk --dev

yarn add redux-saga --dev

yarn add react-query --dev

npm install asar -g
```

- [electron-is-dev](https://www.npmjs.com/package/electron-is-dev)
- [concurrently](https://www.npmjs.com/package/concurrently)
- [wait-on](https://www.npmjs.com/package/wait-on)
- [nodemon](https://www.npmjs.com/package/nodemon)
- [cross-env](https://www.npmjs.com/package/cross-env)
- [electron-builder](https://www.npmjs.com/package/electron-builder)

- [react-router-dom](https://reactrouter.com/web/guides/quick-start)

- [redux](https://www.redux.org.cn)
- [redux-logger](https://github.com/LogRocket/redux-logger)
- [redux-devtools](https://github.com/zalmoxisus/redux-devtools-extension)

- [redux-thunk](https://github.com/reduxjs/redux-thunk)

- [redux-saga](https://github.com/redux-saga/redux-saga)

- [react-query](https://cangsdarm.github.io/react-query-web-i18n/getstarted/installation)

```shell
asar extract app.asar ./app
```

- [png-to-icns-converter](https://anyconv.com/png-to-icns-converter)

## 调试主进程

### 通过 Chrome 调试主进程

- 启动时增加「--inspect=端口号」，浏览器中输入「chrome://inspect」，点击「Configure」按钮配置「localhost:端口号」，然后点击底部「inspect」按钮
- 对「build/electron.js」打断点

### 通过 VSCode 调试主进程（推荐）

#### 官方文档方式

- [配置 launch.json](https://www.electronjs.org/docs/tutorial/debugging-main-process-vscode)
- 对「build/electron.js」打断点

#### 自己摸索方式

- 在 launch.json 中添加如下配置可启动服务并调试主进程

```json
{
  "name": "启动服务并调试主进程",
  "args": ["dev"],
  "type": "node",
  "request": "launch",
  "runtimeExecutable": "yarn",
  "console": "integratedTerminal",
  "protocol": "inspector"
}
```

- 对「build/electron.js」打断点

## Yarn 镜像

```sh
npm install yrm -g
yrm ls
yrm use taobao
```

## 项目模板

- [electron-react-boilerplate](https://github.com/electron-react-boilerplate/electron-react-boilerplate)
- [electron-vue](https://github.com/SimulatedGREG/electron-vue)
