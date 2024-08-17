# webpack5-guides

```shell
mkdir webpack5-guides && cd webpack5-guides
pnpm init

# webpack 5 对应 webpack-cli（从 webpack 4+ 开始需要单独安装 webpack-cli）版本是 5（与 webpack-dev-server 5 结合使用）或者 4（与 webpack-dev-server 4 结合使用）
pnpm add -D webpack@5 webpack-cli@5

pnpm add lodash

# Node 8.2/npm 5.2.0 以上版本提供的 npx 命令，可以运行在初次安装的 webpack package 中的 webpack 二进制文件
npx webpack
# 不指定 --config 时，如果 webpack.config.js 存在，则 webpack 命令将默认选择使用它
npx webpack --config webpack.config.js
# 可以通过在 npm run build 命令与参数之间添加两个连接符的方式向 webpack 传递自定义参数，例如：npm run build -- --colors

# 加载 css，Webpack5 中对应 style-loader 版本是 4 或者 3（也支持 2），css-loader 版本是 7 或者 6（也支持 5）
pnpm add -D style-loader@4 css-loader@7

# 加载 images 图像，Webpack5 中不需要单独安装 file-loader，配置 roles 时指定 type 为 asset/resource 即可，使用内置的 Asset Modules 可以接收并加载任何文件

# 加载 fonts 字体，Webpack5 中不需要单独安装 file-loader，配置 roles 时指定 type 为 asset/resource 即可，使用内置的 Asset Modules 可以接收并加载任何文件

# 加载 csv、tsv 文件
pnpm add -D csv-loader
# 加载 xml 文件
pnpm add -D xml-loader

# 加载 json 是内置支持的，无需配置任何 loader

# 支持自定义 json 模块 parser 来解析 toml、yaml、json5 等文件类型
pnpm add -D toml yamljs json5

# 使用 HtmlWebpackPlugin 生成 index.html，Webpack5 中对应 html-webpack-plugin 版本是 5（也支持 4）
pnpm add -D html-webpack-plugin@5

# Webpack5 中不需要使用 CleanWebpackPlugin 来实现在每次构建前清理 /dist 文件夹，直接给 output 配置 clean 为 true 即可

# 使用 webpack-dev-server，Webpack5 中对应 webpack-dev-server 版本是 5（与 webpack-cli 5 结合使用） 或者 4（与 webpack-cli 4 结合使用），在 Webpack5 中比 Webpack4 多了通过 webpack serve --open 来启动
pnpm add -D webpack-dev-server@5

# 使用 webpack-dev-middleware，在 express 中集成使用服务，Webpack5 中对应 webpack-dev-middleware 版本是 7 或者 6
pnpm add -D express webpack-dev-middleware@7

# 使用 webpack-hot-middleware，在 express 中集成使用模块热替换
pnpm add -D express webpack-hot-middleware
```

## 已完成

- API
  - webpack-dev-server API
  - Hot Module Replacement
- 概念
  - 模块热替换(hot module replacement)
- 配置
  - DevServer
- 指南
  - 安装
  - 起步
  - 管理资源
  - 管理输出
  - 开发环境
  - 模块热替换
- Loader
  - TODO
- Plugin
  - TODO
