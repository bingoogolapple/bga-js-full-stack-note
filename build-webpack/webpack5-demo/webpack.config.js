const path = require("path");

const toml = require("toml");
const yaml = require("yamljs");
const json5 = require("json5");

const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  devServer: {
    static: "./dist",
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
    clean: true, // 在每次构建前清理 /dist 文件夹
    publicPath: "/",
  },
  module: {
    rules: [
      // 加载 css
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      // 加载 images 图像
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      // 加载 fonts 字体
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
      // 加载 csv 文件
      {
        test: /\.(csv|tsv)$/i,
        use: ["csv-loader"],
      },
      // 加载 xml 文件
      {
        test: /\.xml$/i,
        use: ["xml-loader"],
      },
      // 加载 toml 文件
      {
        test: /\.toml$/i,
        type: "json",
        parser: {
          parse: toml.parse,
        },
      },
      // 加载 yaml 文件
      {
        test: /\.yaml$/i,
        type: "json",
        parser: {
          parse: yaml.parse,
        },
      },
      // 加载 json5 文件
      {
        test: /\.json5$/i,
        type: "json",
        parser: {
          parse: json5.parse,
        },
      },
    ],
  },
  plugins: [
    // 生成 index.html 文件，所有的 bundle 会自动添加到 html 中
    new HtmlWebpackPlugin({
      title: "webpack5",
    }),
  ],
};
