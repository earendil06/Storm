import Command from "./Command";
import {StaticHelpers} from "../../StaticHelpers";
import {IHistoryCommand} from "../../Application";
import {HistoryCommand} from "../../poco/HistoryCommand";
import LocalAccessor from "../../resources/LocalAccessor";

export default class HelpCommand extends Command {

    constructor() {
        super("help");
    }


    async execute(args: string[]): Promise<IHistoryCommand> {
        if (args.length === 0) {
            let helpText = StaticHelpers.COMMANDS().map(c => c.getCommandName()).join(", ");
            helpText += '\n\nUse "help [command]" to learn more about a specific command';
            return new HistoryCommand(this.getCommandName(), args, helpText, "markdown-component");
        } else {
            try {
                let markdown = await new LocalAccessor().loadFileByName("helps/" + args[0] + ".md");
                return new HistoryCommand(this.getCommandName(), args, markdown, "markdown-component");
            } catch (e) {
                return new HistoryCommand(this.getCommandName(), args, args[0] + " is not documented or does not exists.", "error-component")
            }
        }
    }

}