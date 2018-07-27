import {Command} from "./Command";
import {StaticHelpers} from "../StaticHelpers";
import * as $ from "jquery";

export class ResetCommand extends Command {
    constructor() {
        super("reset");
    }

    execute(inputText: string, args: string[]): void {
        $.ajax({
            contentType: "application/json",
            method: 'PUT',
            url: `http://${StaticHelpers.server}:${StaticHelpers.port}/api/reset`,
            statusCode: {
                200: function (data) {
                    StaticHelpers.application().commands.push({
                        input: inputText,
                        output: data,
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