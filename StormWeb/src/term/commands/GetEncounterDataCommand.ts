import Command from "./Command";
import {StaticHelpers} from "../../StaticHelpers";
import {IHistoryCommand} from "../../Application";
import {HistoryCommand} from "../../poco/HistoryCommand";

export class GetEncounterDataCommand extends Command{

    constructor(){
        super("encounter");
    }

    async execute(args: string[]): Promise<IHistoryCommand> {
        return new HistoryCommand(this.getCommandName(), args, StaticHelpers.engine().getEncounterData(), "encounter-component");
    }
}