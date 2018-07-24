import {Command} from "./Command";
import {StaticHelpers} from "../StaticHelpers";

export class HelpCommand extends Command {

    constructor(){
        super("help");
    }

    execute(inputText: string, args: string[]): void {
        StaticHelpers.application().commands.push({input: inputText, output: StaticHelpers.COMMANDS.map(c => c.getCommandName()), templateName: "default-component"});
    }

}