import Command from "./Command";
import {IHistoryCommand} from "../../IHistoryCommand";
import {HistoryCommand} from "../../poco/HistoryCommand";

export default class IdeCommand extends Command {

    constructor() {
        super("ide");
    }

    async execute(args: string[]): Promise<IHistoryCommand> {
        return new HistoryCommand(this.getCommandName(), args, {
            link: "./ide.html",
            text: "To StormIDE"
        }, "navigator");
    }
}