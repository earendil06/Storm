import {Command} from "./Command";
import {StaticHelpers} from "./StaticHelpers";

export class BlockCommand extends Command {
    constructor() {
        super("block");
    }

    execute(inputText: string, args: string[]) : void {
        if (args.length < 2) {
            StaticHelpers.application().commands.push({input: inputText, output: "missing parameter (e.g.: block goblin)", templateName: "default"});
            StaticHelpers.hideSpinner();
        } else {
            const blockName = args[1];
            $.ajax({
                contentType: "application/json",
                url: `http://${StaticHelpers.server}:${StaticHelpers.port}/api/block/` + blockName.toLowerCase(),
                success: function (data) {
                    if (data.status === 200) {
                        StaticHelpers.application().commands.push({input: inputText, output: data.entity, templateName: "block-component"});
                        window.scrollTo(0, document.body.scrollHeight);
                    } else if (data.status === 404) {
                        StaticHelpers.application().commands.push({
                            input: inputText,
                            output: blockName + " is not registered.",
                            templateName: "default"
                        });
                    } else {
                        StaticHelpers.application().commands.push({
                            input: inputText,
                            output: "Error " + data.status + ", Something went wrong!",
                            templateName: "default"
                        });
                    }
                },
                error: function (data) {
                    StaticHelpers.application().commands.push({
                        input: inputText,
                        output: "Error " + data.status + ", Something went wrong!",
                        templateName: "default"
                    });
                }
            });
        }
    }
}