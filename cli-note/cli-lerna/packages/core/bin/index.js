#!/usr/bin/env node

const utils = require("@dwit/cli-lerna-utils");
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
    if (utils[command]) {
      utils[command]();
    } else {
      console.log("无效命令");
    }
  }
} else {
  console.log("请输入命令");
}
