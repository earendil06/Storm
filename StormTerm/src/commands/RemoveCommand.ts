import {Command} from "./Command";
import {StaticHelpers} from "./StaticHelpers";

export class RemoveCommand extends Command{

    constructor() {
        super("remove");
    }

    execute(inputText: string, args: string[]): void {
        if (args.length < 2) {
            (window as any).app.commands.push({input: inputText, output: "missing parameter (e.g.: remove adrien)", templateName: "default"});
            StaticHelpers.hideSpinner();
        } else {
            const monsterName = args[1];
            $.ajax({
                contentType: "application/json",
                method: 'DELETE',
                url: `http://${StaticHelpers.server}:${StaticHelpers.port}/api/remove/` + monsterName,
                success: function (data) {
                    (window as any).app.commands.push({input: inputText, output: data, templateName: "entity"});
                }
            });
        }
    }

}