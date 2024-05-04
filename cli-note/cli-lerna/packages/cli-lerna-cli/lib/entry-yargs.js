"use strict";

const factory = require("yargs/yargs");
const cliLernaCli = require("./cli-lerna-cli");

module.exports = function () {
  const parser = factory(null, undefined);

  parser.alias("h", "help");
  parser.alias("v", "version");

  parser.usage(
    "$0",
    "我是描述信息",
    (yargs) => {
      yargs.options({
        // TODO: options
      });
    },
    (argv) => {
      // cli-lerna-cli init => argv is { _: [ 'init' ], '$0': 'cli-lerna-cli' }
      console.log("argv is", argv);
      cliLernaCli(argv);
    }
  );

  parser.parse(process.argv.slice(2));
};
