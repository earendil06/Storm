import Command from "./Command";
import {IHistoryCommand} from "../../Application";
import {HistoryCommand} from "../../poco/HistoryCommand";

export class ElectronCommand extends Command{

    constructor(){
        super("electron");
    }

    async execute(args: string[]): Promise<IHistoryCommand> {
        if (args.length == 0) {
            return new HistoryCommand(this.getCommandName(), args, "missing target os (e.g.: electron [target-os] )", "error-component");
        }
        return new HistoryCommand(this.getCommandName(), args, {
            link: "/dist/storm-electron-1.0.0-x86_64.AppImage",
            download: true,
            text: "release"
        }, "navigator-component");
    }

}