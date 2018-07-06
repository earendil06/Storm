import {Command} from "./Command";
import {StaticHelpers} from "./StaticHelpers";

export class RollInitiativeCommand extends Command{
    constructor() {
        super("initiative");
    }

    execute(inputText: string, args: string[]): void {
        $.ajax({
            contentType: "application/json",
            method: 'PUT',
            url: `http://${StaticHelpers.server}:${StaticHelpers.port}/api/roll/initiative`,
            success: function (data) {
                let encounterCommand = StaticHelpers.COMMANDS.find(f => f.getCommandName() === "encounter");
                encounterCommand.execute("", [""]);
            }
        });
    }

}