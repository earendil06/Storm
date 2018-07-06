import {Command} from "./Command";
import {StaticHelpers} from "./StaticHelpers";

export class HelpCommand extends Command {

    constructor(){
        super("help");
    }

    execute(inputText: string, args: string[]): void {
        (window as any).app.commands.push({input: inputText, output: StaticHelpers.COMMANDS.map(c => c.getCommandName()), templateName: "default"});
    }

}