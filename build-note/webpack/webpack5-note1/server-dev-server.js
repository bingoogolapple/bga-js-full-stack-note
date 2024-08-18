const WebpackDevServer = require("webpack-dev-server");
const webpack = require("webpack");

const webpackConfig = require("./webpack.config.js");
const devServerOptions = {
  ...webpackConfig.devServer,
  open: true,
};

const compiler = webpack(webpackConfig);
const server = new WebpackDevServer(devServerOptions, compiler);

const runServer = async () => {
  // 启动方式一
  // server.startCallback(() => {
  //   console.log("Successfully started server on http://localhost:8080");
  // });

  // 启动方式二
  await server.start();
  console.log("Successfully started server on http://localhost:8080");
};
runServer();

const stopServer = async () => {
  // 停止方式一
  // server.stopCallback(() => {
  //   console.log("stopCallback::Server stopped.");
  // });

  // 停止方式二
  await server.stop();
  console.log("stop::Server stopped.");
};
// setTimeout(stopServer, 5000);

const logInternalIPs = async () => {
  // 方式一
  let localIPv4 = await WebpackDevServer.internalIP("v4");
  let localIPv6 = await WebpackDevServer.internalIP("v6");
  console.log("internalIP Local IPv4 address:", localIPv4);
  console.log("internalIP Local IPv6 address:", localIPv6);

  // 方式二
  localIPv4 = WebpackDevServer.internalIPSync("v4");
  localIPv6 = WebpackDevServer.internalIPSync("v6");
  console.log("internalIPSync Local IPv4 address:", localIPv4);
  console.log("internalIPSync Local IPv6 address:", localIPv6);
};

logInternalIPs();
