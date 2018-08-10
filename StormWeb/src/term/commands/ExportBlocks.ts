import Command from "./Command";
import {IHistoryCommand} from "../../Application";
import * as JSZip from 'jszip';

export class ExportBlocksCommand extends Command {

    constructor() {
        super("export-blocks");
    }

    async execute(args: string[]): Promise<IHistoryCommand> {
        let zip = new JSZip();
        for (let key in localStorage) {
            if (key.startsWith("db/user/")) {
                let name = key.substr(8, key.length) + ".storm";
                let storm = localStorage.getItem(key);
                console.log(name);
                zip.file(name, storm);
            }
        }
        zip.generateAsync({type:"blob"})
            .then(function(content) {
                (window as any).saveAs(content, "StormBlocks.zip");
            });
        return null;
    }
}
