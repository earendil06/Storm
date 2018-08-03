import {Command} from "./Command";
import {StaticHelpers} from "../StaticHelpers";
import * as $ from "jquery";
import {HistoryCommand} from "../poco/HistoryCommand";
import {IHistoryCommand} from "../Application";

export class BlockCommand extends Command {
    constructor() {
        super("block");
    }

    async execute(args: string[]) : Promise<IHistoryCommand> {
        if (args.length < 1) {
            return new HistoryCommand(this.getCommandName(), args, "missing parameter (e.g.: block goblin)", "default-component")
        } else {
            const blockName = args[0];
            try {
                const result = await $.ajax({
                    contentType: "application/json",
                    url: `http://${StaticHelpers.server}:${StaticHelpers.port}/api/block/` + blockName.toLowerCase(),
                });
                return new HistoryCommand(this.getCommandName(), args, result, "block-component")
            } catch (e) {
                switch (e.status) {
                    case 404 : return new HistoryCommand(this.getCommandName(), args, blockName + " is not registered.", "default-component");
                    case 500 : return new HistoryCommand(this.getCommandName(), args, "Error 500, Something went wrong!", "default-component");
                    default: return null;
                }
            }
        }
    }
}