import {Command} from "./Command";
import {StaticHelpers} from "../StaticHelpers";
import * as $ from "jquery";

export class SetInitiativeCommand extends Command {

    constructor(){
        super("set-init");
    }

    execute(inputText: string, args: string[]): void {
        if (args.length < 3) {
            StaticHelpers.application().commands.push({input: inputText, output: "missing parameters (e.g: set-init adrien 12)", templateName: "default-component"});
            StaticHelpers.hideSpinner();
        } else {
            const name = args[1];
            const value = args[2];
            $.ajax({
                contentType: "application/json",
                method: 'PUT',
                url: `http://${StaticHelpers.server}:${StaticHelpers.port}/api/set`,
                data: JSON.stringify({"name": name, "value": value}),
                statusCode: {
                    200: function (data) {
                        StaticHelpers.application().commands.push({
                            input: inputText,
                            output: name + " initiative has been set to " + value + ".",
                            templateName: "default-component"});
                    },
                    400: function () {
                        StaticHelpers.application().commands.push({
                            input: inputText,
                            output: 'The request should be like "set-init adrien 12".',
                            templateName: "default-component"
                        });
                    },
                    404: function () {
                        StaticHelpers.application().commands.push({
                            input: inputText,
                            output: name + " does not exists in the encounter.",
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