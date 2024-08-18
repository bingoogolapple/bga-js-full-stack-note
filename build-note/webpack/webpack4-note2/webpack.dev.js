const path = require("path");
const webpack = require("webpack");
const { merge } = require("webpack-merge");

const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "development",
  // https://v4.webpack.docschina.org/configuration/dev-server
  // 差异：Webpack4 中对应 webpack-dev-server 版本是 3
  // 访问地址：http://[devServer.host]:[devServer.port]/[output.publicPath]/[output.filename]
  // 如果遇到问题，导航到 /webpack-dev-server 路径，可以显示出文件的服务位置。 例如，http://localhost:9000/webpack-dev-server
  devServer: {
    // 告诉服务器从哪个目录中提供内容，只有在想要提供静态文件时才需要
    contentBase: path.join(__dirname, "dist"),
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
  output: {
    // 在开发模式下，[chunkhash] 和 [contenthash] 通常不可用，因为它们依赖于文件内容的变化，而开发模式下文件内容频繁变化。可以使用 [hash:8] 代替
    filename: "[name].bundle.[hash:8].js",
  },
  module: {
    rules: [
      // 加载 css
      // 差异：Webpack4 中对应 style-loader 版本是 2，css-loader 版本是 5，否则打包时会报错 TypeError: this.getOptions is not a function
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    // 差异：Webpack4 中需要单独配置 webpack 内置的 HMR 插件
    new webpack.HotModuleReplacementPlugin(),
  ],
});
