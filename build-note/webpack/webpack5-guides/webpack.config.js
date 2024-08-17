const path = require("path");

const toml = require("toml");
const yaml = require("yamljs");
const json5 = require("json5");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  mode: "development",
  // https://webpack.docschina.org/configuration/dev-server
  // 差异：Webpack5 中对应 webpack-dev-server 版本是 5（与 webpack-cli 5 结合使用） 或者 4（与 webpack-cli 4 结合使用），在 Webpack5 中比 Webpack4 多了通过 webpack serve --open 来启动
  // 访问地址：http://[devServer.host]:[devServer.port]/[output.publicPath]/[output.filename]
  // 如果遇到问题，导航到 /webpack-dev-server 路径，可以显示出文件的服务位置。 例如，http://localhost:9000/webpack-dev-server
  devServer: {
    // 配置从目录提供静态文件的选项（默认是 'public' 文件夹）
    // static: "./dist",
    static: {
      directory: path.join(__dirname, "dist"),
      // 告诉服务器在哪个 URL 上提供 static 的内容
      publicPath: "/bga",
    },
    // 告诉 dev-server 在 server 启动后打开浏览器
    // open: true,
    open: ["/bga"],
    // 差异：从 Webpack 5（webpack-dev-server 4）开始，模块热替换是默认开启的。不过也可以为 HMR 提供入口起点 https://webpack.docschina.org/guides/hot-module-replacement/#enabling-hmr
    hot: true,
    // 如果希望服务器外部可访问，需配置 host 为 0.0.0.0
    host: "0.0.0.0",
    port: 9000,
    server: "https",
    devMiddleware: {
      // 开发服务器运行时将文件也写入磁盘
      writeToDisk: true,
    },
    setupMiddlewares: (middlewares, devServer) => {
      if (!devServer) {
        throw new Error("webpack-dev-server is not defined");
      }

      devServer.app.get("/setup-middleware/some/path", (_, response) => {
        response.send("setup-middlewares option GET");
      });

      // 想在所有其他中间件之前运行一个中间件时，可以使用 `unshift` 方法
      middlewares.unshift({
        name: "middleware-before",
        // `path` 是可选的
        path: "/foo/path",
        middleware: (req, res) => {
          res.send("Foo!");
        },
      });

      // 想在所有其他中间件之后运行一个中间件时，可以使用 `push` 方法
      middlewares.push({
        name: "middleware-after",
        // `path` 是可选的
        path: "/foo/bar",
        middleware: (req, res) => {
          res.send("Foo Bar!");
        },
      });

      middlewares.push((req, res) => {
        res.send("Hello World!");
      });

      return middlewares;
    },
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
    clean: true, // 差异：Webpack5 中不需要使用 CleanWebpackPlugin 来实现在每次构建前清理 /dist 文件夹，直接给 output 配置 clean 为 true 即可实现相同功能
    publicPath: "/bga",
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
    // 差异：Webpack5 中不需要使用 CleanWebpackPlugin 来实现在每次构建前清理 /dist 文件夹，直接给 output 配置 clean 为 true 即可实现相同功能

    // 生成 index.html 文件，所有的 bundle 会自动添加到 html 中
    // 差异：Webpack5 中对应 html-webpack-plugin 版本是 5
    new HtmlWebpackPlugin({
      title: "webpack5-guides",
    }),

    // 差异：从 Webpack 5（webpack-dev-server 4）开始，模块热替换是默认开启的，不需要单独配置 webpack 内置的 HMR 插件，但通过 middleware 方式使用时还是要显示配置 HMR 插件
    new webpack.HotModuleReplacementPlugin(),
  ],
};
