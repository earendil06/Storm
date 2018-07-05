import {Command} from "./Command";
import {StaticHelpers} from "./StaticHelpers";

export class BlockCommand extends Command {
    constructor() {
        super("block");
    }

    execute(input, args) {
        if (args.length < 2) {
            (window as any).app.commands.push({input: input, output: "missing parameter (e.g.: block goblin)", templateName: "default"});
            StaticHelpers.hideSpinner();
        } else {
            const blockName = args[1];
            $.ajax({
                contentType: "application/json",
                url: `http://${(window as any).server}:${(window as any).port}/api/block/` + blockName.toLowerCase(),
                success: function (data) {
                    if (data.status === 200) {
                        (window as any).app.commands.push({input: input, output: data.entity, templateName: "block"});
                        window.scrollTo(0, document.body.scrollHeight);
                    } else if (data.status === 404) {
                        (window as any).app.commands.push({
                            input: input,
                            output: blockName + " is not registered.",
                            templateName: "default"
                        });
                    } else {
                        (window as any).app.commands.push({
                            input: input,
                            output: "Error " + data.status + ", Something went wrong!",
                            templateName: "default"
                        });
                    }
                },
                error: function (data) {
                    (window as any).app.commands.push({
                        input: input,
                        output: "Error " + data.status + ", Something went wrong!",
                        templateName: "default"
                    });
                }
            });
        }
    }
}