import {StaticHelpers} from "../../StaticHelpers";
import Command from "./Command";
import {IHistoryCommand} from "../../Application";
import {HistoryCommand} from "../../poco/HistoryCommand";

export class ExportEncounterCommand extends Command {

    constructor() {
        super("export-encounter");
    }

    async execute(args: string[]): Promise<IHistoryCommand> {
        if (args.length < 1) {
            return new HistoryCommand(this.getCommandName(), args, "missing filename (e.g.: export-encounter [filename])", "error");
        } else {
            const filename = args[0];
            let addMonsters = StaticHelpers.engine().getEncounterData().monsters.map(m => `new ${m.block.name} ${m.name}\n`);
            // todo set-hp command
            let setInitiative = StaticHelpers.engine().getEncounterData().monsters
                .filter(m => m.initiative !== undefined)
                .map(m => `set-init ${m.name} ${m.initiative}\n`);
            let toWrite = addMonsters.concat(setInitiative);
            let blob = new Blob(toWrite, {type: "text/plain;charset=utf-8"});
            (window as any).saveAs(blob, filename + ".encounter");
            return new HistoryCommand(this.getCommandName(), args, "encounter is exported", "default");

        }
    }
}
