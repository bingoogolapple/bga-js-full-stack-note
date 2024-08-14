const path = require("path");

const toml = require("toml");
const yaml = require("yamljs");
const json5 = require("json5");

const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  // 差异：Webpack5 中对应 webpack-dev-server 版本是 5（与 webpack-cli 5 结合使用） 或者 4（与 webpack-cli 4 结合使用），在 Webpack5 中比 Webpack4 多了通过 webpack serve --open 来启动
  // 访问地址：http://[devServer.host]:[devServer.port]/[output.publicPath]/[output.filename]
  devServer: {
    static: "./dist",
  },
  devtool: "inline-source-map",
  optimization: {
    // 单个 HTML 页面有多个入口，所以添加了 optimization.runtimeChunk: 'single' 配置，避免遇到这个问题 https://bundlers.tooling.report/code-splitting/multi-entry/
    runtimeChunk: "single",
  },
  //   entry: "./src/index.js", // 默认值就是 ./src/index.js。指定单个时 name 默认为 main
  entry: {
    index: "./src/index.js",
    print: "./src/print.js",
  },
  output: {
    // filename: "main.js", // 默认值就是 main.js
    filename: "[name].bundle.[hash:8].js",
    path: path.resolve(__dirname, "dist"), // 默认值就是 dist 目录
    clean: true, // 差异：Webpack5 中不需要使用 CleanWebpackPlugin 来实现在每次构建前清理 /dist 文件夹，直接给 output 配置 clean 为 true 即可实现相同功能
    publicPath: "/",
  },
  module: {
    rules: [
      // 加载 css
      // 差异：Webpack5 中对应 style-loader 版本是 3（也支持 2），css-loader 版本是 6（也支持 5）
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
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
      // 加载 csv、tsv 文件
      {
        test: /\.(csv|tsv)$/i,
        use: ["csv-loader"],
      },
      // 加载 xml 文件
      {
        test: /\.xml$/i,
        use: ["xml-loader"],
      },
      // 差异：支持自定义 json 模块 parser 来解析 toml、yaml、json5 等文件类型
      // 差异：加载 toml 文件
      {
        test: /\.toml$/i,
        type: "json",
        parser: {
          parse: toml.parse,
        },
      },
      // 差异：加载 yaml 文件
      {
        test: /\.yaml$/i,
        type: "json",
        parser: {
          parse: yaml.parse,
        },
      },
      // 差异：加载 json5 文件
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
    // 差异：Webpack5 中对应 webpack-dev-server 版本是 4，在 Webpack5 中也可以不手动安装 webpack-dev-server，在 scripts 中配置「"serve": "./node_modules/.bin/webpack serve"」后启动时会自动安装
    new HtmlWebpackPlugin({
      title: "webpack5-guides",
    }),
  ],
};
