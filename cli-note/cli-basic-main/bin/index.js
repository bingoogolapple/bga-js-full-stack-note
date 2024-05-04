#!/usr/bin/env node

const lib = require("bga-cli-basic-lib");
console.log("welcome bga cli");
const process = require("process");
console.log("process.argv", process.argv);
const args = process.argv.slice(2);
console.log("args", args);
if (args.length > 0) {
  const command = args[0];
  if (command.startsWith("--") || command.startsWith("-")) {
    const globalOptions = command.replace(/--|-/g, "");
    console.log("globalOptions", globalOptions);
  } else {
    const options = args.slice(1);
    let [option, param] = options;
    if (option) {
      option = option.replace("--", "");
    }
    console.log("option:", option, "param:", param);
    if (lib[command]) {
      lib[command]();
    } else {
      console.log("无效命令");
    }
  }
} else {
  console.log("请输入命令");
}

const testAnsiEscapeCode = () => {
  // \x 表示 16 进制，1B 是固定的，31 表示前景色为红色，m 表示为接下来的代码设置颜色和样式；需要加上 \x1B[0m 来恢复，否则后续的输出全都会沿用之前的样式
  console.log("\x1B[31m%s\x1B[0m", "我是红色文字");
  // x 替换为 unicode u00
  console.log("\u001B[31m%s\u001B[0m", "我是红色文字");
  // 39 只是恢复前景色，不会恢复背景色；49 只恢复背景色，不回复前景色；TODO 蓝色文字未生效
  console.log(
    "\u001b[42m\u001b[34m%s\u001b[39m\u001b[49m",
    "我是绿色背景和蓝色文字"
  );
  // 41 表示背景色为红色
  console.log("\x1B[41m%s\x1B[0m", "我是红色背景的文字");
  // 4 表示下划线
  console.log("\x1B[41m\x1B[4m%s\x1B[0m", "我是带有下划线和红色背景的文字");
  console.log("\x1B[2G%s", "我是光标水平移动到第2列后输出的文字");
};
testAnsiEscapeCode();
