import {Command} from "./Command";
import {StaticHelpers} from "./StaticHelpers";

export class ClearCommand extends Command {

    constructor(){
        super("clear");
    }

    execute(inputText: string, args: Array<string>): void {
        (window as any).app.commands = [];
        StaticHelpers.hideSpinner();
    }

}