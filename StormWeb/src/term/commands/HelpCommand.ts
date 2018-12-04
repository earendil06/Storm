import Command from "./Command";
import {StaticHelpers} from "../../StaticHelpers";
import {IHistoryCommand} from "../../IHistoryCommand";
import {HistoryCommand} from "../../poco/HistoryCommand";
import WebAccessor from "../../resources/WebAccessor";

export default class HelpCommand extends Command {

    constructor() {
        super("help");
    }


    async execute(args: string[]): Promise<IHistoryCommand> {
        if (args.length === 0) {
            return new HistoryCommand(this.getCommandName(), args, StaticHelpers.COMMANDS().map(c => c.getCommandName()), "help");
        } else {
            try {
                let markdown = await WebAccessor.loadFileByName("helps/" + args[0] + ".md");
                return new HistoryCommand(this.getCommandName(), args, markdown, "markdown");
            } catch (e) {
                return new HistoryCommand(this.getCommandName(), args, args[0] + " is not documented or does not exists.", "error")
            }
        }
    }

}