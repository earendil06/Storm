import Command from "./Command";
import {IHistoryCommand} from "../../IHistoryCommand";
import {HistoryCommand} from "../../poco/HistoryCommand";

export class DeleteBlockCommand extends Command {

    constructor() {
        super("delete-block");
    }

    async execute(args: string[]): Promise<IHistoryCommand> {
        if (args.length < 1) {
            return new HistoryCommand(this.getCommandName(), args, "Missing block name.", "error");
        } else {
            const blockName = args[0];
            const fileName = "db/user/" + blockName;
            if (localStorage.getItem(fileName)) {
                localStorage.removeItem(fileName);
                return new HistoryCommand(this.getCommandName(), args, blockName + " has been deleted.", "default");
            }
            return new HistoryCommand(this.getCommandName(), args, blockName + " does not exists.", "error");
        }
    }
}