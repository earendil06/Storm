import Command from "./Command";
import {StaticHelpers} from "../../StaticHelpers";
import {IHistoryCommand} from "../../IHistoryCommand";
import {HistoryCommand} from "../../poco/HistoryCommand";

export class ResetCommand extends Command {
    constructor() {
        super("reset");
    }

    async execute(args: string[]): Promise<IHistoryCommand> {
        StaticHelpers.engine().reset();
        return new HistoryCommand(this.getCommandName(), args, "The encounter is empty.", "default");
    }
}