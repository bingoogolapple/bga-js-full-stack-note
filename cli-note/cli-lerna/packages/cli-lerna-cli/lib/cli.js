"use strict";

const { program } = require("commander");
const semver = require("semver");
const { log, isDebug } = require("@bga-note/cli-lerna-utils");
const createInitCommand = require("@bga-note/cli-lerna-command-init");
const cliLernaCli = require("./cli-lerna-cli");
const pkg = require("../package.json");

const cliName = Object.keys(pkg.bin)[0];

process.on("uncaughtException", (e) => {
  if (isDebug()) {
    console.error(e);
  } else {
    console.error(e.message);
  }
});

const LOWEST_NODE_VERSION = "v20.12.2";
function checkNodeVersion() {
  if (semver.lt(process.version, LOWEST_NODE_VERSION)) {
    throw new Error(
      `${cliName} 需要安装 ${LOWEST_NODE_VERSION} 及以上版本的 Node.js`
    );
  }
}

function preAction() {
  checkNodeVersion();
}

module.exports = function (args) {
  program
    .name(cliName)
    .usage("<command> [options]")
    .description("脚手架学习笔记 cli-lerna-cli")
    .version(pkg.version)
    .option("-d, --debug", "是否开启调试模式", false)
    .hook("preAction", preAction)
    .action((options, command) => {
      log.info("default", "options is", options);
      log.info("default", "command.args is", command.args);
      log.info("default", "command.processedArgs", command.processedArgs);
    });

  /*
  ➜  cli-lerna git:(main) ✗ cli-lerna-cli init testname testname2
  cli-lerna-cli info cli 使用远程版本
  cli-lerna-cli info pre [ 'testname', 'testname2' ] [ 'testname', 'testname2' ]
  cli-lerna-cli info init name is testname
  cli-lerna-cli info init options is { force: false }
  cli-lerna-cli info init command.args is [ 'testname', 'testname2' ]
  cli-lerna-cli info init command.processedArgs [ 'testname' ]
  cli-lerna-cli info post [ 'testname', 'testname2' ] [ 'testname', 'testname2' ]
  */
  /*
  program
    .command("init [name]")
    .description("init project")
    .option("-f, --force", "是否强制更新", false)
    .action((name, options, command) => {
      log.info("init", "name is", name);
      log.info("init", "options is", options);
      log.info("init", "command.args is", command.args);
      log.info("init", "command.processedArgs", command.processedArgs);
    });
  */

  createInitCommand(program);

  program.parse(process.argv);
};
