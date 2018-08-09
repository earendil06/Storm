import {StaticHelpers} from "../../StaticHelpers";
import Command from "./Command";
import {IHistoryCommand} from "../../Application";
import {HistoryCommand} from "../../poco/HistoryCommand";

export class ExportEncounterCommand extends Command {

    constructor() {
        super("export");
    }

    async execute(args: string[]): Promise<IHistoryCommand> {
        if (args.length < 1) {
            return new HistoryCommand(this.getCommandName(), args, "missing filename (e.g.: export [filename])", "default-component");
        } else {
            const filename = args[0];
            let blob = new Blob(
                StaticHelpers.application().history
                    .filter(command => !command.includes("clear"))
                    .filter(command => !command.includes("export"))
                    .filter(command => !command.includes("load"))
                    .map(command => command + "\n")
                ,
                {type: "text/plain;charset=utf-8"}
                );
            (window as any).saveAs(blob, filename + ".encounter");
            return null;

        }
    }
}
