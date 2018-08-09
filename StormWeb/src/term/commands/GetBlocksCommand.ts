import Command from "./Command";
import {IHistoryCommand} from "../../Application";
import {HistoryCommand} from "../../poco/HistoryCommand";
import {StaticHelpers} from "../../StaticHelpers";

export class GetBlocksCommand extends Command {
    constructor() {
        super("get-blocks");
    }

    async execute(args: string[]): Promise<IHistoryCommand> {
        let blocks = await StaticHelpers.getBlocks();
        return new HistoryCommand(this.getCommandName(), args, blocks, "default-component");
    }

}