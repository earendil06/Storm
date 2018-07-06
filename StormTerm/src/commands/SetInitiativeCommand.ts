import {Command} from "./Command";
import {StaticHelpers} from "./StaticHelpers";

export class SetInitiativeCommand extends Command {

    constructor(){
        super("set-init");
    }

    execute(inputText: string, args: string[]): void {
        if (args.length < 3) {
            (window as any).app.commands.push({input: inputText, output: "missing parameters (e.g: set-init adrien 12)", templateName: "default"});
            StaticHelpers.hideSpinner();
        } else {
            const name = args[1];
            const value = args[2];
            $.ajax({
                contentType: "application/json",
                method: 'PUT',
                url: `http://${StaticHelpers.server}:${StaticHelpers.port}/api/set/`,
                data: JSON.stringify({"name": name, "value": value}),
                success: function (data) {
                    if (data.status === 200) {
                        (window as any).app.commands.push({input: inputText, output: data, templateName: "monster"});
                    } else {
                        (window as any).app.commands.push({input: inputText, output: data, templateName: "entity"});
                    }
                }
            });
        }

    }

}