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
                url: `http://${StaticHelpers.server}:${StaticHelpers.port}/api/new/`,
                data: JSON.stringify({"name": monsterName, "blockName": monsterType}),
                success: function (data) {
                    (window as any).app.commands.push({input: inputText, output: data, templateName: "default-component"});
                }
            });

        }
    }

}