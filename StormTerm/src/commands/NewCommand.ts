import {Command} from "./Command";
import {StaticHelpers} from "./StaticHelpers";

export class NewCommand extends Command {

    constructor() {
        super("new");
    }

    execute(inputText: string, args: string[]): void {
        if (args.length < 3) {
            (window as any).app.commands.push({input: inputText, output: "missing parameters (e.g.: new goblin adrien)", templateName: "default-component"});
            StaticHelpers.hideSpinner();
        } else {
            const monsterType = args[1];
            const monsterName = args[2];
            $.ajax({
                contentType: "application/json",
                method: 'POST',
                url: `http://${StaticHelpers.server}:${StaticHelpers.port}/api/new`,
                data: JSON.stringify({"name": monsterName, "blockName": monsterType}),
                statusCode: {
                    200: function (data) {
                        (window as any).app.commands.push({input: inputText, output: data, templateName: "default-component"});
                    },
                    400: function () {
                        StaticHelpers.application().commands.push({
                            input: inputText,
                            output: monsterName + " already exists in the encounter.",
                            templateName: "default-component"
                        });
                    },
                    404: function () {
                        StaticHelpers.application().commands.push({
                            input: inputText,
                            output: monsterType + " does not exists.",
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