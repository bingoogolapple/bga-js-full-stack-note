const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: "development",
  devServer: {
    contentBase: "./dist",
  },
  devtool: "inline-source-map",
  optimization: {
    runtimeChunk: "single",
  },
  //   entry: "./src/index.js", // 指定单个时 name 默认为 main
  entry: {
    index: "./src/index.js",
    print: "./src/print.js",
  },
  output: {
    // filename: "main.js",
    filename: "[name].bundle.[hash:8].js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
  },
  module: {
    rules: [
      // 加载 css
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
      // 加载 csv
      {
        test: /\.(csv|tsv)$/,
        use: ["csv-loader"],
      },
      // 加载 xml
      {
        test: /\.xml$/,
        use: ["xml-loader"],
      },
    ],
  },
  plugins: [
    // 在每次构建前清理 /dist 文件夹
    new CleanWebpackPlugin(),
    // 生成 index.html 文件，所有的 bundle 会自动添加到 html 中
    new HtmlWebpackPlugin({
      title: "webpack4",
    }),
  ],
};
