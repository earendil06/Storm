import Command from "./Command";
import {StaticHelpers} from "../../StaticHelpers";
import {IHistoryCommand} from "../../Application";
import ICommand from "./ICommand";

export class NextTurnCommand extends Command {
    constructor() {
        super("next");
    }

    async execute(args: string[]): Promise<IHistoryCommand> {
        let playingCommand = StaticHelpers.COMMANDS().find(f => f.getCommandName() === "playing") as ICommand;
        try {
            StaticHelpers.engine().nextTurn();
            return playingCommand.execute(args);
        } catch (e) {
            return playingCommand.execute(args);
        }
    }
}