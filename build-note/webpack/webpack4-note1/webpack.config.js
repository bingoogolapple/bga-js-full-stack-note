const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  // mode: "production",
  mode: "development",
  // https://v4.webpack.docschina.org/configuration/dev-server
  // 差异：Webpack4 中对应 webpack-dev-server 版本是 3
  // 访问地址：http://[devServer.host]:[devServer.port]/[output.publicPath]/[output.filename]
  // 如果遇到问题，导航到 /webpack-dev-server 路径，可以显示出文件的服务位置。 例如，http://localhost:9000/webpack-dev-server
  devServer: {
    // 告诉服务器从哪个目录中提供内容，只有在想要提供静态文件时才需要
    contentBase: "./dist",
    // 告诉服务器在哪个 URL 上提供 contentBase 的内容
    publicPath: "/bga",
    // 告诉 dev-server 在 server 启动后打开浏览器
    open: true,
    // 指定打开浏览器时的导航页面
    openPage: "bga",
    // 默认是整个页面刷新的，会重新加载所有文件，开模块热替换后就只会刷新变更的文件，需配合 webpack.HotModuleReplacementPlugin 一起使用
    // 差异：Webpack4 中需要单独配置
    hot: true,
    // 如果希望服务器外部可访问，需配置 host 为 0.0.0.0
    host: "0.0.0.0",
    port: 8000,
    https: true,
    // 开发服务器运行时将文件也写入磁盘
    writeToDisk: true,
    before: function (app, server) {
      app.get("/some/path", function (req, res) {
        res.json({ custom: "response" });
      });
    },
  },
  devtool: "inline-source-map",
  optimization: {
    // 单个 HTML 页面有多个入口，所以添加了 optimization.runtimeChunk: 'single' 配置，避免遇到这个问题 https://bundlers.tooling.report/code-splitting/multi-entry/
    // runtimeChunk 将 runtime 代码拆分为一个单独的 chunk，将 runtimeChunk 设置为 single 来为所有 chunk 创建一个 runtime bundle
    runtimeChunk: "single",
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
        },
      },
    },
    // usedExports: true,
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
    // 将根据资源内容创建出唯一 hash。当资源内容发生变化时，[contenthash] 也会发生变化
    // 在开发模式下，[chunkhash] 和 [contenthash] 通常不可用，因为它们依赖于文件内容的变化，而开发模式下文件内容频繁变化。可以使用 [hash] 代替
    // filename: "[name].bundle.[contenthash].js",
    filename: "[name].bundle.[hash:8].js",
    path: path.resolve(__dirname, "dist"), // 默认值就是 dist 目录
    publicPath: "/bga",
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

    // 差异：Webpack4 中使用 webpack.HashedModuleIdsPlugin 修复 vendor 的哈希值变化。不过试了下配置和不配置效果是一样的，不确定是不是最新版已经内置了该配置
    new webpack.HashedModuleIdsPlugin(),
  ],
};
