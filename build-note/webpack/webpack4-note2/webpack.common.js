const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const webpack = require("webpack");

module.exports = {
  optimization: {
    // 单个 HTML 页面有多个入口，所以添加了 optimization.runtimeChunk: 'single' 配置，避免遇到这个问题 https://bundlers.tooling.report/code-splitting/multi-entry/
    // runtimeChunk 将 runtime 代码拆分为一个单独的 chunk，将 runtimeChunk 设置为 single 来为所有 chunk 创建一个 runtime bundle
    runtimeChunk: "single",
    // SplitChunksPlugin 插件可以将公共的依赖模块提取到已有的入口 chunk 中，或者提取到一个新生成的 chunk
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
    // 在开发模式下，[chunkhash] 和 [contenthash] 通常不可用，因为它们依赖于文件内容的变化，而开发模式下文件内容频繁变化。可以使用 [hash:8] 代替
    // filename: "[name].bundle.[contenthash].js",

    path: path.resolve(__dirname, "dist"), // 默认值就是 dist 目录
    publicPath: "/bga",
  },
  module: {
    rules: [
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
    ],
  },
  plugins: [
    // 差异：Webpack4 中使用 CleanWebpackPlugin 来实现在每次构建前清理 /dist 文件夹
    new CleanWebpackPlugin(),

    // 生成 index.html 文件，所有的 bundle 会自动添加到 html 中
    // 差异：Webpack4 中对应 html-webpack-plugin 版本是 4
    new HtmlWebpackPlugin({
      title: "webpack4-note2",
    }),

    // 差异：Webpack4 中使用 webpack.HashedModuleIdsPlugin 修复 vendor 的哈希值变化。不过试了下配置和不配置效果是一样的，不确定是不是最新版已经内置了该配置
    new webpack.HashedModuleIdsPlugin(),
  ],
};
