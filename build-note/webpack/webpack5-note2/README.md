# webpack5-note2

```shell
# webpack 5 对应 webpack-cli（从 webpack 4+ 开始需要单独安装 webpack-cli）版本是 5（与 webpack-dev-server 5 结合使用）或者 4（与 webpack-dev-server 4 结合使用）
pnpm add -D webpack@5 webpack-cli@5

# 加载 css，Webpack5 中对应 style-loader 版本是 4 或者 3（也支持 2），css-loader 版本是 7 或者 6（也支持 5）
pnpm add -D style-loader@4 css-loader@7

# 加载 images 图像，Webpack5 中不需要单独安装 file-loader，配置 roles 时指定 type 为 asset/resource 即可，使用内置的 Asset Modules 可以接收并加载任何文件

# 加载 fonts 字体，Webpack5 中不需要单独安装 file-loader，配置 roles 时指定 type 为 asset/resource 即可，使用内置的 Asset Modules 可以接收并加载任何文件

# 使用 HtmlWebpackPlugin 生成 index.html，Webpack5 中对应 html-webpack-plugin 版本是 5（也支持 4）
pnpm add -D html-webpack-plugin@5

# Webpack5 中不需要使用 CleanWebpackPlugin 来实现在每次构建前清理 /dist 文件夹，直接给 output 配置 clean 为 true 即可

# 使用 webpack-dev-server，Webpack5 中对应 webpack-dev-server 版本是 5（与 webpack-cli 5 结合使用） 或者 4（与 webpack-cli 4 结合使用），在 Webpack5 中比 Webpack4 多了通过 webpack serve --open 来启动
pnpm add -D webpack-dev-server@5
# 开发服务器运行时将文件也写入磁盘，配置 devServer.devMiddleware.writeToDisk 配置为 true

# 运行 tree shaking 需要 ModuleConcatenationPlugin。通过 mode: "production" 可以添加此插件。如果没有使用 mode 设置，需手动添加 ModuleConcatenationPlugin

# 避免在生产中使用 inline-*** 和 eval-***，因为它们会增加 bundle 体积大小，并降低整体性能

# mini-css-extract-plugin 用于将 CSS 从主应用程序中分离，Webpack5 中对应 mini-css-extract-plugin 版本是 2
pnpm add -D mini-css-extract-plugin

# webpack-merge 用于合并 webpack 配置
pnpm add -D webpack-merge
```
