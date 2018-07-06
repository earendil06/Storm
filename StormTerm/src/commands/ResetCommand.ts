import {Command} from "./Command";
import {StaticHelpers} from "./StaticHelpers";

export class ResetCommand extends Command {
    constructor(){
        super("reset");
    }

    execute(inputText: string, args: string[]): void {
        $.ajax({
            contentType: "application/json",
            method: 'PUT',
            url: `http://${StaticHelpers.server}:${StaticHelpers.port}/api/reset/`,
            success: function (data) {
                (window as any).app.commands.push({input: inputText, output: data, templateName: "entity"});
            }
        });
    }


}