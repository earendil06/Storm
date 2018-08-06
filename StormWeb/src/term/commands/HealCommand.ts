import Command from "./Command";
import {StaticHelpers} from "../../StaticHelpers";
import * as $ from "jquery";
import {IHistoryCommand} from "../../Application";
import {HistoryCommand} from "../../poco/HistoryCommand";

export class HealCommand extends Command {
    constructor(){
        super("heal");
    }

    async execute(args: string[]): Promise<IHistoryCommand> {
        if (args.length < 2) {
            return new HistoryCommand(this.getCommandName(), args,"missing parameters (e.g.: heal adrien 2)", "default-component");
        } else {
            const monsterName = args[0];
            const monsterDamage = args[1];
            try {
                const result = await $.ajax({
                    contentType: "application/json",
                    method: 'PUT',
                    url: `http://${StaticHelpers.server}:${StaticHelpers.port}/api/damage`,
                    data: JSON.stringify({"name": monsterName, "damage": monsterDamage}),
                });
                return new HistoryCommand(this.getCommandName(), args, monsterName + ' took ' + monsterDamage + ' heals.', "default-component");
            } catch (e) {
                switch (e.status) {
                    case 400 : return new HistoryCommand(this.getCommandName(), args, "The request should be like \"heal adrien 2\".", "default-component");
                    case 404 : return new HistoryCommand(this.getCommandName(), args, "monsterName + \" does not exists in the encounter.\"", "default-component");
                    case 500 : return new HistoryCommand(this.getCommandName(), args, "Error 500, Something went wrong!", "default-component");
                    default: return null;
                }
            }
        }
    }
}