import Command from "./Command";
import {IHistoryCommand} from "../../Application";
import {HistoryCommand} from "../../poco/HistoryCommand";

export default class HomeCommand extends Command {

    constructor() {
        super("home");
    }

    async execute(args: string[]): Promise<IHistoryCommand> {
        return new HistoryCommand(this.getCommandName(), args, {
            link: "./index.html",
            text: "To Home page"
        }, "navigator-component");
    }
}