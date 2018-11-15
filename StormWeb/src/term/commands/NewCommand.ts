import Command from "./Command";
import {StaticHelpers} from "../../StaticHelpers";
import {IHistoryCommand} from "../../Application";
import {HistoryCommand} from "../../poco/HistoryCommand";
import {BlockCommand} from "./BlockCommand";

export class NewCommand extends Command {

    constructor() {
        super("new");
    }

    async execute(args: string[]): Promise<IHistoryCommand> {
        if (args.length < 2) {
            return new HistoryCommand(this.getCommandName(), args, "missing parameters (e.g.: new goblin adrien)", "error");
        } else {
            const monsterType = args[0];
            const monsterName = args[1];
            const block = await new BlockCommand().execute([monsterType]);
            if ("block" === block.templateName) { //todo this is bad code
                try {
                    StaticHelpers.engine().newMonster(monsterName, block.output);
                    return new HistoryCommand(this.getCommandName(), args, monsterName + " has been added to the encounter.", "default");
                } catch (e) {
                    console.log(e);
                    return new HistoryCommand(this.getCommandName(), args, monsterName + " already exists in the encounter.", "error");
                }
            } else {
                return new HistoryCommand(this.getCommandName(), args, monsterType + " does not exists.", "error");
            }
        }
    }
}