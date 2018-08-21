import Command from "./Command";
import {StaticHelpers} from "../../StaticHelpers";
import {IHistoryCommand} from "../../Application";
import {HistoryCommand} from "../../poco/HistoryCommand";

export class SetInitiativeCommand extends Command {

    constructor(){
        super("set-init");
    }

    async execute(args: string[]): Promise<IHistoryCommand> {
        if (args.length < 2) {
            return new HistoryCommand(this.getCommandName(), args, "missing parameters (e.g: set-init adrien 12)", "error-component");
        } else {
            const name = args[0];
            const value = parseInt(args[1]);
            if (isNaN(value)) {
                return new HistoryCommand(this.getCommandName(), args, 'The request should be like "set-init adrien 12".', "error-component");
            }

            if (StaticHelpers.engine().isMonsterInEncounter(name)) {
                StaticHelpers.engine().setInitiative(name, value);
                return new HistoryCommand(this.getCommandName(), args, name + "'s initiative has been set to " + value + ".", "default-component");

            } else {
                return new HistoryCommand(this.getCommandName(), args, name + " does not exists in the encounter.", "error-component");
            }
        }
    }
}