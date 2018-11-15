import Command from "./Command";
import {StaticHelpers} from "../../StaticHelpers";
import {IHistoryCommand} from "../../Application";
import {HistoryCommand} from "../../poco/HistoryCommand";

export class RollInitiativeCommand extends Command{
    constructor() {
        super("initiative");
    }

    async execute(args: string[]): Promise<IHistoryCommand> {
        if (StaticHelpers.engine().getEncounterData().monsters.length == 0) {
            return new HistoryCommand(this.getCommandName(), args, "No one can roll initiative in the encounter.", "default");
        }
        StaticHelpers.engine().rollInitiative();
        return new HistoryCommand(this.getCommandName(), args, "initiative rolled.", "default");
    }
}