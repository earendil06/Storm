import Command from "./Command";
import {StaticHelpers} from "../StaticHelpers";
import * as $ from "jquery";
import {IHistoryCommand} from "../Application";
import ICommand from "./ICommand";
import {HistoryCommand} from "../poco/HistoryCommand";

export class NextTurnCommand extends Command {
    constructor(){
        super("next");
    }

    async execute(args: string[]): Promise<IHistoryCommand> {
        try {
            const result = await $.ajax({
                contentType: "application/json",
                method: 'PUT',
                url: `http://${StaticHelpers.server}:${StaticHelpers.port}/api/nextTurn`,
            });
            let playingCommand = StaticHelpers.COMMANDS().find(f => f.getCommandName() === "playing") as ICommand;
            return playingCommand.execute([""]);
        } catch (e) {
            switch (e.status) {
                case 400:
                    let playingCommand = StaticHelpers.COMMANDS().find(f => f.getCommandName() === "playing") as ICommand;
                    return playingCommand.execute([""]);
                case 500: return new HistoryCommand(this.getCommandName(), args, "Error 500, Something went wrong!", "default-component");
                default: return null;
            }
        }

    }
}