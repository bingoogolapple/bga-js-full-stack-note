const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  optimization: {
    // 差异：Webpack5 中通过配置 moduleIds 为 deterministic 来修复 vendor 的哈希值变化。不过试了下配置和不配置效果是一样的，不确定是不是最新版已经内置了该配置
    moduleIds: "deterministic",
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
    // 在配置文件中配置 dependOn 选项，以在多个 chunk 之间共享模块
    // index: {
    //   import: "./src/index.js",
    //   dependOn: "shared",
    // },
    // print: {
    //   import: "./src/print.js",
    //   dependOn: "shared",
    // },
    // shared: "lodash",
  },
  output: {
    // filename: "main.js", // 默认值就是 main.js
    // 将根据资源内容创建出唯一 hash。当资源内容发生变化时，[contenthash] 也会发生变化
    // 在开发模式下，[chunkhash] 和 [contenthash] 通常不可用，因为它们依赖于文件内容的变化，而开发模式下文件内容频繁变化。可以使用 [hash] 代替
    // filename: "[name].bundle.[contenthash].js",

    path: path.resolve(__dirname, "dist"), // 默认值就是 dist 目录
    clean: true, // 差异：Webpack5 中不需要使用 CleanWebpackPlugin 来实现在每次构建前清理 /dist 文件夹，直接给 output 配置 clean 为 true 即可实现相同功能
    publicPath: "/bga",
  },
  module: {
    rules: [
      // 差异：加载 images 图像，Webpack5 中不需要单独安装 file-loader，配置 roles 时指定 type 为 asset/resource 即可，使用内置的 Asset Modules 可以接收并加载任何文件
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      // 差异：加载 fonts 字体，Webpack5 中不需要单独安装 file-loader，配置 roles 时指定 type 为 asset/resource 即可，使用内置的 Asset Modules 可以接收并加载任何文件
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    // 差异：Webpack5 中不需要使用 CleanWebpackPlugin 来实现在每次构建前清理 /dist 文件夹，直接给 output 配置 clean 为 true 即可实现相同功能

    // 生成 index.html 文件，所有的 bundle 会自动添加到 html 中
    // 差异：Webpack5 中对应 html-webpack-plugin 版本是 5
    new HtmlWebpackPlugin({
      title: "webpack5-note2",
    }),
  ],
};
