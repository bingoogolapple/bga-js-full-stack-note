import Command from "@bga-note/cli-lerna-command";
import { log } from "@bga-note/cli-lerna-utils";

class InitCommand extends Command {
  get command() {
    return "init [name]";
  }

  get description() {
    return "init project";
  }

  get options() {
    return [["-f, --force", "是否强制更新", false]];
  }

  action([name, options, command]) {
    log.info("init", "name is", name);
    log.info("init", "options is", options);
    log.info("init", "command.args is", command.args);
    log.info("init", "command.processedArgs", command.processedArgs);
  }
}

function Init(instance) {
  return new InitCommand(instance);
}

export default Init;
