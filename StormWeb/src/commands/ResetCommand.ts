import Command from "./Command";
import {StaticHelpers} from "../StaticHelpers";
import * as $ from "jquery";
import {IHistoryCommand} from "../Application";
import {HistoryCommand} from "../poco/HistoryCommand";

export class ResetCommand extends Command {
    constructor() {
        super("reset");
    }

    async execute(args: string[]): Promise<IHistoryCommand> {
        try {
            const result = await $.ajax({
                contentType: "application/json",
                method: 'PUT',
                url: `http://${StaticHelpers.server}:${StaticHelpers.port}/api/reset`,
            });
            return new HistoryCommand(this.getCommandName(), args, result, "default-component");
        }
        catch (e) {
            switch (e.status) {
                case 500 : return new HistoryCommand(this.getCommandName(), args, "Error 500, Something went wrong!", "default-component");
                default : return null;
            }
        }
    }
}