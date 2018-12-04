import Command from "./Command";
import {StaticHelpers} from "../../StaticHelpers";
import {IHistoryCommand} from "../../IHistoryCommand";
import {HistoryCommand} from "../../poco/HistoryCommand";

export class GetEncounterDataCommand extends Command{

    constructor(){
        super("encounter");
    }

    async execute(args: string[]): Promise<IHistoryCommand> {
        let encounterData = StaticHelpers.engine().getEncounterData();
        return new HistoryCommand(this.getCommandName(), args, encounterData, "encounter");
    }
}