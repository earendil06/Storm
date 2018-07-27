import {Command} from "./Command";
import {StaticHelpers} from "../StaticHelpers";
import * as $ from "jquery";

export class GetTurnCommand extends Command {
    constructor() {
        super("turn");
    }

    execute(inputText: string, args: string[]): void {
        $.ajax({
            contentType: "application/json",
            method: 'GET',
            url: `http://${StaticHelpers.server}:${StaticHelpers.port}/api/turn`,
            success: function (data) {
                let encounterCommand = StaticHelpers.COMMANDS.find(f => f.getCommandName() === "encounter");
                encounterCommand.execute("", [""]);
            }
        });
    }
}