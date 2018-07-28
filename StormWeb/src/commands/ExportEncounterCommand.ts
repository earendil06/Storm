import {StaticHelpers} from "../StaticHelpers";
import {Command} from "./Command";
import {IHistoryCommand} from "../Application";
import {HistoryCommand} from "../poco/HistoryCommand";

export class ExportEncounterCommand extends Command {

    constructor() {
        super("export");
    }

    async execute(inputText: string, args: string[]): Promise<IHistoryCommand> {
        if (args.length < 2) {
            return new HistoryCommand(inputText, "missing filename (e.g.: export [filename])", "default-component");
        } else {
            const filename = args[1];
            console.log(filename);
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
