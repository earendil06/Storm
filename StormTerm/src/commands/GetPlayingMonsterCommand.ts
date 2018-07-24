import {Command} from "./Command";
import {StaticHelpers} from "../StaticHelpers";
import * as $ from "jquery";

export class GetPlayingMonsterCommand extends Command {
    constructor() {
        super("playing")
    }

    execute(inputText: string, args: string[]): void {
        $.ajax({
            contentType: "application/json",
            url: `http://${StaticHelpers.server}:${StaticHelpers.port}/api/playing`,
            statusCode: {
                200: function (data) {
                    StaticHelpers.application().commands.push({input: inputText, output: data, templateName: "monster-component"});
                },
                404: function () {
                    StaticHelpers.application().commands.push({
                        input: inputText,
                        output: "No one rolled initiative.",
                        templateName: "default-component"
                    });
                },
                500: function () {
                    StaticHelpers.application().commands.push({
                        input: inputText,
                        output: "Error 500, Something went wrong!",
                        templateName: "default-component"
                    });
                }
            }
        });
    }
}