import {Command} from "./Command";
import {StaticHelpers} from "./StaticHelpers";
import * as $ from "jquery";

export class RollInitiativeCommand extends Command{
    constructor() {
        super("initiative");
    }

    execute(inputText: string, args: string[]): void {
        $.ajax({
            contentType: "application/json",
            method: 'PUT',
            url: `http://${StaticHelpers.server}:${StaticHelpers.port}/api/roll/initiative`,
            statusCode: {
                200: function (data) {
                    (window as any).app.commands.push({
                        input: inputText,
                        output: "initiative rolled.",
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