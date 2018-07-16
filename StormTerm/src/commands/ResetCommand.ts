import {Command} from "./Command";
import {StaticHelpers} from "./StaticHelpers";

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
                    (window as any).app.commands.push({
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