import {Command} from "./Command";
import {StaticHelpers} from "../StaticHelpers";

export class ClearCommand extends Command {

    constructor(){
        super("clear");
    }

    execute(inputText: string, args: string[]): void {
        StaticHelpers.application().commands = [];
        StaticHelpers.hideSpinner();
    }

}