import {Command} from "./Command";
import {StaticHelpers} from "../StaticHelpers";
import {IHistoryCommand} from "../Application";

export class ClearCommand extends Command {

    constructor(){
        super("clear");
    }

    async execute(args: string[]): Promise<IHistoryCommand> {
        StaticHelpers.application().commands = [];
        StaticHelpers.hideSpinner();
        return null;
    }

}