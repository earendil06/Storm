import {Command} from "./Command";
import {StaticHelpers} from "./StaticHelpers";

export class GetMonsterCommand extends Command {
    constructor() {
        super("monster")
    }

    execute(inputText: string, args: string[]): void {
        if (args.length < 2) {
            (window as any).app.commands.push({input: inputText, output: "missing parameter (e.g.: monster adrien)", templateName: "default-component"});
            StaticHelpers.hideSpinner();
        } else {
            const monsterName = args[1];
            $.ajax({
                contentType: "application/json",
                url: `http://${StaticHelpers.server}:${StaticHelpers.port}/api/monster/` + monsterName,
                success: function (data) {
                    if (data.status === 200) {
                        (window as any).app.commands.push({input: inputText, output: data, templateName: "monster"});
                    } else {
                        (window as any).app.commands.push({input: inputText, output: data, templateName: "default-component"});
                    }
                }
            });

        }
    }
}