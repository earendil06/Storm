import {Command} from "./Command";
import {StaticHelpers} from "./StaticHelpers";

export class GetBlocksCommand extends Command {
    constructor(){
        super("get-blocks");
    }

    execute(inputText: string, args: string[]): void {
        $.ajax({
            contentType: "application/json",
            url: `http://${StaticHelpers.server}:${StaticHelpers.port}/api/blocks`,
            success: function (data) {
                (window as any).app.commands.push({input: inputText, output: data, templateName: "default-component"});
            }
        });
    }

}