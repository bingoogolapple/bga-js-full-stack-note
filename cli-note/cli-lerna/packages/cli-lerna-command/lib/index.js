import { log } from "@bga-note/cli-lerna-utils";

class Command {
  constructor(instance) {
    if (!instance) {
      throw new Error("command instance must not be null");
    }

    this.program = instance;
    const cmd = this.program.command(this.command);
    cmd.description(this.description);

    if (this.options?.length > 0) {
      this.options.forEach((option) => {
        cmd.option(...option);
      });
    }

    cmd.hook("preAction", this.preAction);
    cmd.hook("postAction", this.postAction);

    cmd.action((...params) => {
      this.action(params);
    });
  }

  get command() {
    throw new Error("command must be implements");
  }

  get description() {
    throw new Error("description must be implements");
  }

  /**
   * 返回一个二维数组
   */
  get options() {
    return [];
  }

  action() {
    throw new Error("action must be implements");
  }

  preAction(thisCommand, actionCommand) {
    log.info("pre", thisCommand.args, actionCommand.args);
  }

  postAction(thisCommand, actionCommand) {
    log.info("post", thisCommand.args, actionCommand.args);
  }
}
export default Command;
