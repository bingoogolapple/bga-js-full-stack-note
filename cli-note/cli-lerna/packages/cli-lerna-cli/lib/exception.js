"use strict";
const { log, isDebug } = require("@bga-note/cli-lerna-utils");

function printError(type, e) {
  if (isDebug()) {
    log.error(type, e);
  } else {
    log.error(type, e.message);
  }
}

// throw Error 的场景
process.on("uncaughtException", (e) => printError("uncaughtException", e));
// Promise 异常的场景
process.on("unhandledRejection", (e) => printError("unhandledRejection", e));
