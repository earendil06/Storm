import {Command} from "./Command";
import {StaticHelpers} from "./StaticHelpers";

export class NextTurnCommand extends Command {
    constructor(){
        super("next");
    }

    execute(inputText: string, args: string[]): void {
        $.ajax({
            contentType: "application/json",
            method: 'PUT',
            url: `http://${StaticHelpers.server}:${StaticHelpers.port}/api/nextTurn/`,
            success: function (data) {
                let encounterCommand = StaticHelpers.COMMANDS.find(f => f.getCommandName() === "encounter");
                encounterCommand.execute("", [""]);
            }
        });
    }
}