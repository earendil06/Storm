import Command from "./Command";
import {StaticHelpers} from "../../StaticHelpers";
import {IHistoryCommand} from "../../IHistoryCommand";
import {HistoryCommand} from "../../poco/HistoryCommand";

export class DamageCommand extends Command {

    constructor() {
        super("damage");
    }

    async execute(args: string[]): Promise<IHistoryCommand> {
        if (args.length < 2) {
            return new HistoryCommand(this.getCommandName(), args, "missing parameters (e.g.: damage adrien 2)", "error");
        } else {
            const monsterName = args[0];
            const monsterDamage = -parseInt(args[1]);
            if (isNaN(monsterDamage)) {
                return new HistoryCommand(this.getCommandName(), args, 'The request should be like "damage adrien 2".', "error")
            }
            if (StaticHelpers.engine().isMonsterInEncounter(monsterName)) {
                const result = StaticHelpers.engine().damage(monsterName, monsterDamage);
                return new HistoryCommand(this.getCommandName(), args, result, "monster");
            } else {
                return new HistoryCommand(this.getCommandName(), args, monsterName + " does not exists in the encounter.", "error");
            }
        }
    }
}