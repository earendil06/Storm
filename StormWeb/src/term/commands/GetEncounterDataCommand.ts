import Command from "./Command";
import {StaticHelpers} from "../../StaticHelpers";
import * as $ from "jquery";
import {IHistoryCommand} from "../../Application";
import {HistoryCommand} from "../../poco/HistoryCommand";

export class GetEncounterDataCommand extends Command{

    constructor(){
        super("encounter");
    }

    async execute(args: string[]): Promise<IHistoryCommand> {
        try {
            const result = await $.ajax({
                contentType: "application/json",
                url: `http://${StaticHelpers.server}:${StaticHelpers.port}/api/data`,
            });
            const monsters = result.monsters;
            monsters.forEach(m => {
                m.ac = m.block.stats.find(f => f.statType === "ac").statValue.formulae;
                m.blockName = m.block.name[0].toUpperCase() + m.block.name.slice(1)
            });
            return new HistoryCommand(this.getCommandName(), args, result, "encounter-component");
        } catch (e) {
            switch (e.status) {
                case 500 : return new HistoryCommand(this.getCommandName(), args, "Error 500, Something went wrong!", "default-component");
                default: return null;
            }
        }

    }
}