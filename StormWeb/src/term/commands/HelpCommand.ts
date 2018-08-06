import Command from "./Command";
import {StaticHelpers} from "../../StaticHelpers";
import {IHistoryCommand} from "../../Application";
import {HistoryCommand} from "../../poco/HistoryCommand";

export default class HelpCommand extends Command {

    constructor(){
        super("help");
    }

    async execute(args: string[]): Promise<IHistoryCommand> {
        return new HistoryCommand(this.getCommandName(), args, StaticHelpers.COMMANDS().map(c => c.getCommandName()).join(", "), "default-component");
    }

}