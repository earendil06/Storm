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
        let md = `<div class="row">` +
            `<div class="col-md-3">` + blocks.reduce((previousValue, currentValue) => previousValue + `</div>` + `<div class="col-md-3">` + currentValue) +
            `</div></div>`;
        return new HistoryCommand(this.getCommandName(), args, md, "default");
    }

}