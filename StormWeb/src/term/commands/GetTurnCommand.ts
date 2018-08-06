import Command from "./Command";
import {StaticHelpers} from "../../StaticHelpers";
import * as $ from "jquery";
import {IHistoryCommand} from "../../Application";
import ICommand from "./ICommand";

export class GetTurnCommand extends Command {
    constructor() {
        super("turn");
    }

    async execute(args: string[]): Promise<IHistoryCommand> {
        const result = await $.ajax({
            contentType: "application/json",
            method: 'GET',
            url: `http://${StaticHelpers.server}:${StaticHelpers.port}/api/turn`
        });
        let encounterCommand = StaticHelpers.COMMANDS().find(f => f.getCommandName() === "encounter") as ICommand;
        return encounterCommand.execute(args);
    }
}