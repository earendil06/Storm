import {Command} from "./Command";
import {StaticHelpers} from "./StaticHelpers";
import * as $ from "jquery";

export class GetMonsterCommand extends Command {
    constructor() {
        super("monster")
    }

    execute(inputText: string, args: string[]): void {
        if (args.length < 2) {
            (window as any).app.commands.push({
                input: inputText,
                output: "missing parameter (e.g.: monster adrien)",
                templateName: "default-component"
            });
            StaticHelpers.hideSpinner();
        } else {
            const monsterName = args[1];
            $.ajax({
                contentType: "application/json",
                url: `http://${StaticHelpers.server}:${StaticHelpers.port}/api/monster/` + monsterName,
                statusCode: {
                    200: function (data) {
                        (window as any).app.commands.push({input: inputText, output: data, templateName: "monster-component"});
                    },
                    404: function () {
                        StaticHelpers.application().commands.push({
                            input: inputText,
                            output: monsterName + " is not in the encounter.",
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
}