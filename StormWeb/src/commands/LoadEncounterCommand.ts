import {Command} from "./Command";
import * as $ from "jquery";
import {StaticHelpers} from "../StaticHelpers";
import {IHistoryCommand} from "../Application";

export class LoadEncounterCommand extends Command {

    constructor() {
        super("load");
    }

    async execute(inputText: string, args: string[]): Promise<IHistoryCommand> {
        //StaticHelpers.hideSpinner();
        const $elt = $("#file") as any;
        $elt.off();
        $elt.on("change", function(evt) {
            const f = evt.target.files[0];

            if (f) {
                const r = new FileReader();
                r.onload = function(e) {
                    const commandsHistory = e.target.result.split("\n");
                    commandsHistory.forEach(command => {
                        StaticHelpers.eval(command);
                    });
                    StaticHelpers.application().commands.push({
                        input: inputText,
                        output: "encounter loaded successfully",
                        templateName: "default-component"
                    });
                };
                r.readAsText(f);
            } else {
                StaticHelpers.application().commands.push({
                    input: inputText,
                    output: "no encounter loaded",
                    templateName: "default-component"
                });
            }
        });
        $elt.trigger( "click" );
        return null;
    }
}