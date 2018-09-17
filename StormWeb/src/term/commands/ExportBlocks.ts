import Command from "./Command";
import {IHistoryCommand} from "../../Application";
import * as JSZip from 'jszip';
import {HistoryCommand} from "../../poco/HistoryCommand";

export class ExportBlocksCommand extends Command {

    constructor() {
        super("export-blocks");
    }

    async execute(args: string[]): Promise<IHistoryCommand> {
        let zip = new JSZip();
        for (let key in localStorage) {
            if (key.startsWith("db/user/")) {
                let name = key.substr(8, key.length) + ".json";
                let storm = localStorage.getItem(key);
                console.log(name);
                zip.file(name, storm);
            }
        }
        zip.generateAsync({type:"blob"})
            .then(function(content:any) {
                (window as any).saveAs(content, "StormBlocks.zip");
            });
        return new HistoryCommand(this.getCommandName(), args, "all is exported", "default-component");
    }
}
