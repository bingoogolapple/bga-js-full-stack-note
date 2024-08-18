# webpack4-note2

```shell
# webpack 4 对应 webpack-cli（从 webpack 4+ 开始需要单独安装 webpack-cli）版本是 3
pnpm add -D webpack@4 webpack-cli@3

# 加载 css，注意：Webpack4 中对应 style-loader 版本是 2，css-loader 版本是 5，否则打包时会报错 TypeError: this.getOptions is not a function
pnpm add -D style-loader@2 css-loader@5

# 加载 images 图像，Webpack4 中需要单独安装 file-loader，配置 roles 时指定 use 为 file-loader 即可
pnpm add -D file-loader

# 加载 fonts 字体，，Webpack4 中需要单独安装 file-loader，配置 roles 时指定 use 为 file-loader 即可

# 使用 HtmlWebpackPlugin 生成 index.html，Webpack4 中对应 html-webpack-plugin 版本是 4
pnpm add -D html-webpack-plugin@4

# Webpack4 中使用 CleanWebpackPlugin 来实现在每次构建前清理 /dist 文件夹
pnpm add -D clean-webpack-plugin

# 使用 webpack-dev-server，Webpack4 中对应 webpack-dev-server 版本是 3
pnpm add -D webpack-dev-server@3
# 开发服务器运行时将文件也写入磁盘，配置 devServer.writeToDisk 配置为 true

# 运行 tree shaking 需要 ModuleConcatenationPlugin。通过 mode: "production" 可以添加此插件。如果没有使用 mode 设置，需手动添加 ModuleConcatenationPlugin

# 避免在生产中使用 inline-*** 和 eval-***，因为它们会增加 bundle 体积大小，并降低整体性能

# mini-css-extract-plugin 用于将 CSS 从主应用程序中分离，Webpack4 中对应 mini-css-extract-plugin 版本是 1
pnpm add -D mini-css-extract-plugin

# webpack-merge 用于合并 webpack 配置
pnpm add -D webpack-merge
```
