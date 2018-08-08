import Command from "./Command";
import {HistoryCommand} from "../../poco/HistoryCommand";
import {IHistoryCommand} from "../../Application";
import LocalAccessor from "../../resources/LocalAccessor";

export class BlockCommand extends Command {
    private accessor = new LocalAccessor();

    constructor() {
        super("block");
    }

    async execute(args: string[]): Promise<IHistoryCommand> {
        if (args.length < 1) {
            return new HistoryCommand(this.getCommandName(), args, "missing parameter (e.g.: block goblin)", "default-component")
        } else {
            const blockName = args[0];
            return this.accessor.getBlockByName(blockName)
                .then(block => {
                    if (block.isPresent) {
                        return new HistoryCommand(this.getCommandName(), args, block.get(), "block-component");
                    }
                    return new HistoryCommand(this.getCommandName(), args, blockName + " is not registered.", "default-component");
                })
                .catch(statusCode => {
                    switch (statusCode) {
                        case 404 :
                            return new HistoryCommand(this.getCommandName(), args, blockName + " is not registered.", "default-component");
                        default:
                            return null;
                    }
                })
        }
    }
}