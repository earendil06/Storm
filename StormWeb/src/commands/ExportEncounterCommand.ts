import {StaticHelpers} from "../StaticHelpers";
import {Command} from "./Command";

export class ExportEncounterCommand extends Command {

    constructor() {
        super("export");
    }

    execute(inputText: string, args: string[]): void {
        StaticHelpers.hideSpinner();
        if (args.length < 2) {
            StaticHelpers.application().commands.push({
                input: inputText,
                output: "missing filename (e.g.: export [filename])",
                templateName: "default-component"
            });
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
        }
    }
}
