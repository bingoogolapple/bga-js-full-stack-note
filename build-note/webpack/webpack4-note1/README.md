# webpack4-note1

```shell
mkdir webpack4-note1 && cd webpack4-note1
pnpm init

# webpack 4 对应 webpack-cli（从 webpack 4+ 开始需要单独安装 webpack-cli）版本是 3
pnpm add -D webpack@4 webpack-cli@3

pnpm add lodash

# Node 8.2/npm 5.2.0 以上版本提供的 npx 命令，可以运行在初次安装的 webpack package 中的 webpack 二进制文件
npx webpack
# 不指定 --config 时，如果 webpack.config.js 存在，则 webpack 命令将默认选择使用它
npx webpack --config webpack.config.js
# 可以通过在 npm run build 命令与参数之间添加两个连接符的方式向 webpack 传递自定义参数，例如：npm run build -- --colors

# 加载 css，注意：Webpack4 中对应 style-loader 版本是 2，css-loader 版本是 5，否则打包时会报错 TypeError: this.getOptions is not a function
pnpm add -D style-loader@2 css-loader@5

# 加载 images 图像，Webpack4 中需要单独安装 file-loader，配置 roles 时指定 use 为 file-loader 即可
pnpm add -D file-loader

# 加载 fonts 字体，，Webpack4 中需要单独安装 file-loader，配置 roles 时指定 use 为 file-loader 即可

# 加载 csv、tsv 文件
pnpm add -D csv-loader
# 加载 xml 文件
pnpm add -D xml-loader

# 加载 json 是内置支持的，无需配置任何 loader

# 不支持自定义 json 模块 parser 来解析 toml、yaml、json5 等文件类型

# 使用 HtmlWebpackPlugin 生成 index.html，Webpack4 中对应 html-webpack-plugin 版本是 4
pnpm add -D html-webpack-plugin@4

# Webpack4 中使用 CleanWebpackPlugin 来实现在每次构建前清理 /dist 文件夹
pnpm add -D clean-webpack-plugin

# 使用 webpack-dev-server，Webpack4 中对应 webpack-dev-server 版本是 3
pnpm add -D webpack-dev-server@3

# 使用 webpack-dev-middleware，在 express 中集成使用开发服务，Webpack4 中对应 webpack-dev-middleware 版本是 3
pnpm add -D express webpack-dev-middleware@5

# 使用 webpack-hot-middleware，在 express 中集成使用模块热替换
pnpm add -D express webpack-hot-middleware

# 运行 tree shaking 需要 ModuleConcatenationPlugin。通过 mode: "production" 可以添加此插件。如果没有使用 mode 设置，需手动添加 ModuleConcatenationPlugin

# 避免在生产中使用 inline-*** 和 eval-***，因为它们会增加 bundle 体积大小，并降低整体性能
```

## 已完成

- API
  - 模块热替换
- 概念
  - 模块热替换(hot module replacement)
- 配置
  - 开发中 server(devServer)
- 指南
  - 安装
  - 起步
  - 管理资源
  - 管理输出
  - 开发环境
  - 模块热替换
  - Tree Shaking
- Loader
  - TODO
- Plugin
  - ModuleConcatenationPlugin
