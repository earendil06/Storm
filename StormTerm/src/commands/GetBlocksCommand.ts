import {Command} from "./Command";
import {StaticHelpers} from "../StaticHelpers";
import * as $ from "jquery";

export class GetBlocksCommand extends Command {
    constructor(){
        super("get-blocks");
    }

    execute(inputText: string, args: string[]): void {
        $.ajax({
            contentType: "application/json",
            url: `http://${StaticHelpers.server}:${StaticHelpers.port}/api/blocks`,
            success: function (data) {
                StaticHelpers.application().commands.push({input: inputText, output: data, templateName: "default-component"});
            }
        });
    }

}