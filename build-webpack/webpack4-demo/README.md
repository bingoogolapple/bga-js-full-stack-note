# webpack4-demo

```shell
mkdir webpack4-demo && cd webpack4-demo
npm init -y

# webpack 4 对应 webpack-cli 版本是 3
npm install webpack@4 webpack-cli@3 --save-dev

npm install --save lodash

# Node 8.2/npm 5.2.0 以上版本提供的 npx 命令，可以运行在初次安装的 webpack package 中的 webpack 二进制文件
npx webpack
# 不指定 --config 时，如果 webpack.config.js 存在，则 webpack 命令将默认选择使用它
npx webpack --config webpack.config.js
# 可以通过在 npm run build 命令与参数之间添加两个连接符的方式向 webpack 传递自定义参数，例如：npm run build -- --color

# 加载 css，注意：Webpack4 中对应 style-loader 版本是 2，css-loader 版本是 5，否则打包时会报错 TypeError: this.getOptions is not a function
npm install --save-dev style-loader@2 css-loader@5

# 加载 images 图像，Webpack4 中需要单独安装 file-loader，配置 roles 时指定 use 为 file-loader 即可
npm install --save-dev file-loader

# 加载 fonts 字体，，Webpack4 中需要单独安装 file-loader，配置 roles 时指定 use 为 file-loader 即可

# 加载 csv
npm install --save-dev csv-loader
# 加载 xml
npm install --save-dev xml-loader

# 加载 json 是内置支持的，无需配置任何 loader

# 不支持自定义 json 模块 parser 来解析 toml、yaml、json5 等文件类型

# 使用 HtmlWebpackPlugin 生成 index.html，Webpack4 中对应 html-webpack-plugin 版本是 4
npm install --save-dev html-webpack-plugin@4

# Webpack4 中使用 CleanWebpackPlugin 来实现在每次构建前清理 /dist 文件夹
npm install --save-dev clean-webpack-plugin

# 使用 webpack-dev-server，Webpack4 中对应 webpack-dev-server 版本是 3
npm install --save-dev webpack-dev-server@3

# 使用 webpack-dev-middleware
npm install --save-dev express webpack-dev-middleware
```

## 已完成

- 安装
- 起步
- 管理资源
- 管理输出
- 开发环境
