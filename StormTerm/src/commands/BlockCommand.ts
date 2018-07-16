import {Command} from "./Command";
import {StaticHelpers} from "./StaticHelpers";

export class BlockCommand extends Command {
    constructor() {
        super("block");
    }

    execute(inputText: string, args: string[]) : void {
        if (args.length < 2) {
            StaticHelpers.application().commands.push({input: inputText, output: "missing parameter (e.g.: block goblin)", templateName: "default-component"});
            StaticHelpers.hideSpinner();
        } else {
            const blockName = args[1];
            $.ajax({
                contentType: "application/json",
                url: `http://${StaticHelpers.server}:${StaticHelpers.port}/api/block/` + blockName.toLowerCase(),
                statusCode: {
                    200: function(data) {
                        StaticHelpers.application().commands.push({input: inputText, output: data, templateName: "block-component"});
                        window.scrollTo(0, document.body.scrollHeight);
                    },
                    404: function() {
                        StaticHelpers.application().commands.push({
                            input: inputText,
                            output: blockName + " is not registered.",
                            templateName: "default-component"
                        });
                    },
                    500: function() {
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