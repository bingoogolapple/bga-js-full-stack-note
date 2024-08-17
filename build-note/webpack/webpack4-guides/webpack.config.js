const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  mode: "development",
  // 差异：Webpack4 中对应 webpack-dev-server 版本是 3
  // 访问地址：http://[devServer.host]:[devServer.port]/[output.publicPath]/[output.filename]
  devServer: {
    contentBase: "./dist",
    // 默认是整个页面刷新的，会重新加载所有文件，开模块热替换后就只会刷新变更的文件，需配合 webpack.HotModuleReplacementPlugin 一起使用
    // 差异：Webpack4 中需要单独配置
    hot: true,
  },
  devtool: "inline-source-map",
  optimization: {
    // 单个 HTML 页面有多个入口，所以添加了 optimization.runtimeChunk: 'single' 配置，避免遇到这个问题 https://bundlers.tooling.report/code-splitting/multi-entry/
    runtimeChunk: "single",
  },
  // entry: "./src/index.js", // 默认值就是 ./src/index.js。指定单个时 name 默认为 main
  // entry: ["webpack-hot-middleware/client", "./src/index.js"], // 通过 middleware 方式使用 hmr 时需要配成这种方式
  entry: {
    // index: ["webpack-hot-middleware/client", "./src/index.js"], // 通过 middleware 方式使用 hmr 时需要配成这种方式
    index: "./src/index.js",
    print: "./src/print.js",
  },
  output: {
    // filename: "main.js", // 默认值就是 main.js
    filename: "[name].bundle.[hash:8].js",
    path: path.resolve(__dirname, "dist"), // 默认值就是 dist 目录
    publicPath: "/",
  },
  module: {
    rules: [
      // 加载 css
      // 差异：Webpack4 中对应 style-loader 版本是 2，css-loader 版本是 5，否则打包时会报错 TypeError: this.getOptions is not a function
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      // 加载 images 图像
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ["file-loader"],
      },
      // 加载 fonts 字体
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ["file-loader"],
      },
      // 加载 csv 文件
      {
        test: /\.(csv|tsv)$/,
        use: ["csv-loader"],
      },
      // 加载 xml 文件
      {
        test: /\.xml$/,
        use: ["xml-loader"],
      },
      // 差异：不支持自定义 json 模块 parser 来解析 toml、yaml、json5 等文件类型
    ],
  },
  plugins: [
    // 差异：Webpack4 中使用 CleanWebpackPlugin 来实现在每次构建前清理 /dist 文件夹
    new CleanWebpackPlugin(),

    // 生成 index.html 文件，所有的 bundle 会自动添加到 html 中
    // 差异：Webpack4 中对应 html-webpack-plugin 版本是 4
    new HtmlWebpackPlugin({
      title: "webpack4-guides",
    }),

    // 差异：Webpack4 中需要单独配置 webpack 内置的 HMR 插件
    new webpack.HotModuleReplacementPlugin(),
  ],
};
