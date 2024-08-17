const WebpackDevServer = require("webpack-dev-server");
const webpack = require("webpack");

const webpackConfig = require("./webpack.config.js");
const devServerOptions = {
  ...webpackConfig.devServer,
  open: true,
};

WebpackDevServer.addDevServerEntrypoints(webpackConfig, devServerOptions);
const compiler = webpack(webpackConfig);
const server = new WebpackDevServer(compiler, devServerOptions);

server.listen(5000, "localhost", () => {
  console.log("dev server listening on port 5000");
});
