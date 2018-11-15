import Command from "./Command";
import {IHistoryCommand} from "../../Application";
import {HistoryCommand} from "../../poco/HistoryCommand";

export class ElectronCommand extends Command{

    constructor(){
        super("electron");
    }

    async execute(args: string[]): Promise<IHistoryCommand> {
        if (args.length === 0) {
            return new HistoryCommand(this.getCommandName(), args, "missing parameters (e.g.: electron [linux | window | macOS])", "error");
        }
        let link = "";
        let os = "";
        switch (args[0]) {
            case "linux":
                link = "/dist/storm-electron-1.0.0-x86_64.AppImage";
                os = "linux";
                break;
            case "window":
                link = "/dist/storm-electron-1.0.0-x86_64.AppImage";
                os = "windows";
                break;
            case "macOS":
                link = "/dist/storm-electron-1.0.0-x86_64.AppImage";
                os = "macOS";
                break;
            default:
                link = ""
        }
        if (link === "") {
            return new HistoryCommand(this.getCommandName(), args, "no releases found for " + args[0], "error");
        }
        return new HistoryCommand(this.getCommandName(), args, {
            link: link,
            download: true,
            text: `Download for ${os}`
        }, "navigator");
    }

}