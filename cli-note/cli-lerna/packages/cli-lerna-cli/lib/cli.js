"use strict";
const createInitCommand = require("@bga-note/cli-lerna-command-init");
const createCli = require("./createCli");
require("./exception");

module.exports = function () {
  const program = createCli();

  createInitCommand(program);

  program.parse(process.argv);
};
