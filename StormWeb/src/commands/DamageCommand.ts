import {Command} from "./Command";
import {StaticHelpers} from "../StaticHelpers";
import * as $ from "jquery";
import {IHistoryCommand} from "../Application";
import {HistoryCommand} from "../poco/HistoryCommand";

export class DamageCommand extends Command {

    constructor(){
        super("damage");
    }

    async execute(args: string[]): Promise<IHistoryCommand> {
        if (args.length < 2) {
            return new HistoryCommand(this.getCommandName(), args, "missing parameters (e.g.: damage adrien 2)", "default-component");
        } else {
            const monsterName = args[0];
            const monsterDamage = args[1];
            const damageString = -monsterDamage + "";
            try {
                const res = await $.ajax({
                    contentType: "application/json",
                    method: 'PUT',
                    url: `http://${StaticHelpers.server}:${StaticHelpers.port}/api/damage`,
                    data: JSON.stringify({"name": monsterName, "damage": damageString}),
                });
                return new HistoryCommand(this.getCommandName(), args, res, "monster-component");
            } catch (e) {
                switch (e.status) {
                    case 400 : return new HistoryCommand(this.getCommandName(), args, 'The request should be like "damage adrien 2".', "default-component")
                    case 404 : return new HistoryCommand(this.getCommandName(), args,monsterName + " does not exists in the encounter.", "default-component");
                    case 500 : return new HistoryCommand(this.getCommandName(), args, "Error 500, Something went wrong!", "default-component");
                    default: return null;
                }
            }

        }
    }
}