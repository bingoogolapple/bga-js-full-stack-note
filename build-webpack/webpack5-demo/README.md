# webpack5-demo

```shell
mkdir webpack5-demo && cd webpack5-demo
npm init -y

# webpack 5 对应 webpack-cli 版本是 4
npm install webpack@5 webpack-cli@4 --save-dev

npm install --save lodash

# Node 8.2/npm 5.2.0 以上版本提供的 npx 命令，可以运行在初次安装的 webpack package 中的 webpack 二进制文件
npx webpack
# 不指定 --config 时，如果 webpack.config.js 存在，则 webpack 命令将默认选择使用它
npx webpack --config webpack.config.js
# 可以通过在 npm run build 命令与参数之间添加两个连接符的方式向 webpack 传递自定义参数，例如：npm run build -- --color

# 加载 css，Webpack5 中对应 style-loader 版本是 3（也支持 2），css-loader 版本是 6（也支持 5）
npm install --save-dev style-loader@3 css-loader@6

# 加载 images 图像，Webpack5 中不需要单独安装 file-loader，配置 roles 时指定 type 为 asset/resource 即可，使用内置的 Asset Modules 可以接收并加载任何文件

# 加载 fonts 字体，Webpack5 中不需要单独安装 file-loader，配置 roles 时指定 type 为 asset/resource 即可，使用内置的 Asset Modules 可以接收并加载任何文件

# 加载 csv
npm install --save-dev csv-loader
# 加载 xml
npm install --save-dev xml-loader

# 加载 json 是内置支持的，无需配置任何 loader

# 支持自定义 json 模块 parser 来解析 toml、yaml、json5 等文件类型
npm install toml yamljs json5 --save-dev

# 使用 HtmlWebpackPlugin 生成 index.html，Webpack5 中对应 html-webpack-plugin 版本是 5（也支持 4）
npm install --save-dev html-webpack-plugin@5

# Webpack5 中不需要使用 CleanWebpackPlugin 来实现在每次构建前清理 /dist 文件夹，直接给 output 配置 clean 为 true 即可

# 使用 webpack-dev-server，Webpack5 中对应 webpack-dev-server 版本是 4，在 Webpack5 中也可以不手动安装 webpack-dev-server，在 scripts 中配置「"serve": "./node_modules/.bin/webpack serve"」后启动时会自动安装
npm install --save-dev webpack-dev-server@4

# 使用 webpack-dev-middleware
npm install --save-dev express webpack-dev-middleware
```

## 已完成

- 安装
- 起步
- 管理资源
- 管理输出
- 开发环境
