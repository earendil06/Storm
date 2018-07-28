import {Command} from "./Command";
import {StaticHelpers} from "../StaticHelpers";
import {IHistoryCommand} from "../Application";
import {HistoryCommand} from "../poco/HistoryCommand";

export class HelpCommand extends Command {

    constructor(){
        super("help");
    }

    async execute(inputText: string, args: string[]): Promise<IHistoryCommand> {
        return new HistoryCommand(inputText, StaticHelpers.COMMANDS.map(c => c.getCommandName()).join(", "), "default-component");
    }

}