import Command from "./Command";
import {StaticHelpers} from "../../StaticHelpers";
import {IHistoryCommand} from "../../Application";
import {HistoryCommand} from "../../poco/HistoryCommand";

export class GetTurnCommand extends Command {
    constructor() {
        super("turn");
    }

    async execute(args: string[]): Promise<IHistoryCommand> {
        return new HistoryCommand(this.getCommandName(), args, StaticHelpers.engine().getTurn(), "default-component");
    }
}