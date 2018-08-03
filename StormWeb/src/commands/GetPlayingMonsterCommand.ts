import {Command} from "./Command";
import {StaticHelpers} from "../StaticHelpers";
import * as $ from "jquery";
import {IHistoryCommand} from "../Application";
import {HistoryCommand} from "../poco/HistoryCommand";

export class GetPlayingMonsterCommand extends Command {
    constructor() {
        super("playing")
    }

    async execute(args: string[]): Promise<IHistoryCommand> {
        try {
            const result = await $.ajax({
                contentType: "application/json",
                url: `http://${StaticHelpers.server}:${StaticHelpers.port}/api/playing`,
            });
            return new HistoryCommand(this.getCommandName(), args, result, "monster-component")
        } catch (e) {
            switch (e.status) {
                case 404 : return new HistoryCommand(this.getCommandName(), args, "No one rolled initiative.", "default-component");
                case 500 : return new HistoryCommand(this.getCommandName(), args, "Error 500, Something went wrong!", "default-component");
                default : return null;
            }
        }
    }
}