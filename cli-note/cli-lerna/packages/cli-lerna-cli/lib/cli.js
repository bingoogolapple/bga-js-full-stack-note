"use strict";

const { program } = require("commander");
const cliLernaCli = require("./cli-lerna-cli");
const pkg = require("../package.json");

module.exports = function (args) {
  program
    .name(Object.keys(pkg.bin)[0])
    .usage("<command> [options]")
    .description("脚手架学习笔记 cli-lerna-cli")
    .version(pkg.version)
    .option("-d, --debug", "是否开启调试模式", false)
    .action((options, command) => {
      console.log("default");
      console.log("options is", options);
      console.log("command.args is", command.args);
      console.log("command.processedArgs", command.processedArgs);
    });

  program
    .command("init [name]")
    .description("init project")
    .option("-f, --force", "是否强制更新", false)
    .action((name, options, command) => {
      /*
      ➜  cli-lerna git:(main) ✗ cli-lerna-cli init testname testname2
      init
      name is testname
      options is { force: false }
      command.args is [ 'testname', 'testname2' ]
      command.processedArgs [ 'testname' ]
      */
      console.log("init");
      console.log("name is", name);
      console.log("options is", options);
      console.log("command.args is", command.args);
      console.log("command.processedArgs", command.processedArgs);
    });

  program.parse(process.argv);
};
