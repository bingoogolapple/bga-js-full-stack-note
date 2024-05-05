import log from "npmlog";
import isDebug from "./isDebug.js";

if (isDebug()) {
  log.level = "verbose";
} else {
  log.level = "info";
}

// 设置一个固定的头，方便排查是哪个工具打印的日志
log.heading = "cli-lerna-cli";
log.headingStyle = { fg: "black", bg: "white", bold: true };

// 添加自定义方法，2000 代表等级，info 的等级也是 2000
log.addLevel("success", 2000, { fg: "white", bg: "green", bold: true });

export default log;
