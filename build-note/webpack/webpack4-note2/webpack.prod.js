const { merge } = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "production",
  devtool: "source-map",
  output: {
    // 将根据资源内容创建出唯一 hash。当资源内容发生变化时，[contenthash] 也会发生变化
    filename: "[name].bundle.[contenthash].js",
  },
  module: {
    rules: [
      // 加载 css
      // 差异：Webpack4 中对应 style-loader 版本是 2，css-loader 版本是 5，否则打包时会报错 TypeError: this.getOptions is not a function
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  plugins: [
    // 用于将 CSS 从主应用程序中分离
    // 差异：Webpack4 中对应 mini-css-extract-plugin 版本是 1
    new MiniCssExtractPlugin(),
  ],
});
