import Command from "./Command";
import * as $ from "jquery";
import {StaticHelpers} from "../../StaticHelpers";
import {IHistoryCommand} from "../../IHistoryCommand";
import {HistoryCommand} from "../../poco/HistoryCommand";

export class LoadEncounterCommand extends Command {

    constructor() {
        super("load-encounter");
    }

    async execute(args: string[]): Promise<IHistoryCommand> {
        const $elt = $("#file") as any;
        const commandName = this.getCommandName();
        $elt.off();
        $elt.on("change", function (evt:any) {
            const f = evt.target.files[0];
            if (f) {
                const r = new FileReader();
                r.onload = function (e) {
                    if (e != null && e.target != null) {
                        const commandsHistory = e.target.result.split("\n") as string[];
                        commandsHistory.forEach(command => {
                            const values = command.trim().split(" ").filter(f => f !== "");
                            const name = values.length > 0 ? values[0].toLowerCase() : "";
                            const addArgs = values.slice(1);
                            const result = StaticHelpers.eval(name, addArgs);
                        });
                        StaticHelpers.application().commands.push(
                            new HistoryCommand(commandName, args, "encounter loaded successfully", "default")
                        );
                    }
                };
                r.readAsText(f);
            } else {
                StaticHelpers.application().commands.push(new HistoryCommand(commandName, args, "no encounter loaded", "default"));
            }
            $elt.val("")
        });
        $elt.trigger("click");
        return new HistoryCommand(commandName, args, "loading encounter...", "default")
    }
}