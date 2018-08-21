import Command from "./Command";
import {StaticHelpers} from "../../StaticHelpers";
import {IHistoryCommand} from "../../Application";
import {HistoryCommand} from "../../poco/HistoryCommand";

export class RemoveCommand extends Command {

    constructor() {
        super("remove");
    }

    async execute(args: string[]): Promise<IHistoryCommand> {
        if (args.length < 1) {
            return new HistoryCommand(this.getCommandName(), args, "missing parameter (e.g.: remove adrien)", "default-component");
        } else {
            const monsterName = args[0];
            try {
                StaticHelpers.engine().remove(monsterName);
                return new HistoryCommand(this.getCommandName(), args, monsterName + " has been removed from the encounter.", "default-component");
            } catch (e) {
                return new HistoryCommand(this.getCommandName(), args, monsterName + " does not exists in the encounter.", "default-component");
            }
        }
    }

}