import Command from "./Command";
import {StaticHelpers} from "../../StaticHelpers";
import {IHistoryCommand} from "../../Application";
import {HistoryCommand} from "../../poco/HistoryCommand";

export default class ClearCommand extends Command {

    constructor(){
        super("clear");
    }

    async execute(args: string[]): Promise<IHistoryCommand> {
        StaticHelpers.application().commands = [];
        return new HistoryCommand(this.getCommandName(), args, "all is cleared", "default");
    }

}