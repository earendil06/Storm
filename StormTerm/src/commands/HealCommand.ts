import {Command} from "./Command";
import {StaticHelpers} from "./StaticHelpers";

export class HealCommand extends Command {
    constructor(){
        super("heal");
    }

    execute(inputText: string, args: string[]): void {
        if (args.length < 3) {
            (window as any).app.commands.push({input: inputText, output: "missing parameters (e.g.: heal adrien 2)", templateName: "default-component"});
            StaticHelpers.hideSpinner();
        } else {
            const monsterName = args[1];
            const monsterDamage = args[2];
            $.ajax({
                contentType: "application/json",
                method: 'PUT',
                url: `http://${StaticHelpers.server}:${StaticHelpers.port}/api/damage/`,
                data: JSON.stringify({"name": monsterName, "damage": monsterDamage}),
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