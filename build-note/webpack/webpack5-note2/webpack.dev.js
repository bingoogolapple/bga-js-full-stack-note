const path = require("path");
const webpack = require("webpack");
const { merge } = require("webpack-merge");

const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "development",
  // https://webpack.docschina.org/configuration/dev-server
  // 差异：Webpack5 中对应 webpack-dev-server 版本是 5（与 webpack-cli 5 结合使用） 或者 4（与 webpack-cli 4 结合使用），在 Webpack5 中比 Webpack4 多了通过 webpack serve --open 来启动
  // 访问地址：http://[devServer.host]:[devServer.port]/[output.publicPath]/[output.filename]
  // 如果遇到问题，导航到 /webpack-dev-server 路径，可以显示出文件的服务位置。 例如，http://localhost:9000/webpack-dev-server
  devServer: {
    // 配置从目录提供静态文件的选项（默认是 'public' 文件夹）
    // static: path.join(__dirname, "dist"),
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
      // writeToDisk: true,
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
  output: {
    // 在开发模式下，[chunkhash] 和 [contenthash] 通常不可用，因为它们依赖于文件内容的变化，而开发模式下文件内容频繁变化。可以使用 [hash] 代替
    filename: "[name].bundle.[hash:8].js",
  },
  module: {
    rules: [
      // 加载 css
      // 差异：Webpack5 中对应 style-loader 版本是 3（也支持 2），css-loader 版本是 6（也支持 5）
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    // 差异：从 Webpack 5（webpack-dev-server 4）开始，模块热替换是默认开启的，不需要单独配置 webpack 内置的 HMR 插件，但通过 middleware 方式使用时还是要显示配置 HMR 插件
    new webpack.HotModuleReplacementPlugin(),
  ],
});
