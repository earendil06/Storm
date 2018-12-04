import Command from "./Command";
import {StaticHelpers} from "../../StaticHelpers";
import {IHistoryCommand} from "../../IHistoryCommand";
import {HistoryCommand} from "../../poco/HistoryCommand";

export class GetPlayingMonsterCommand extends Command {
    constructor() {
        super("playing")
    }

    async execute(args: string[]): Promise<IHistoryCommand> {
        try {
            let found = StaticHelpers.engine().getPlayingMonster();
            return new HistoryCommand(this.getCommandName(), args, found, "monster")
        } catch (e) {
            return new HistoryCommand(this.getCommandName(), args, "No one rolled initiative.", "default");
        }
    }
}