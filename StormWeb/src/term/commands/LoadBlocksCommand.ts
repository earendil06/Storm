import Command from "./Command";
import * as $ from "jquery";
import {IHistoryCommand} from "../../Application";
import * as JSZip from 'jszip';
import {HistoryCommand} from "../../poco/HistoryCommand";

export class LoadBlocksCommand extends Command {

    constructor() {
        super("load-blocks");
    }

    async execute(args: string[]): Promise<IHistoryCommand> {
        const $elt = $("#file") as any;
        $elt.off();
        $elt.on("change", function (evt: any) {
            function handleFile(f: any) {
                JSZip.loadAsync(f)
                    .then((zip: any) => zip.forEach(function (relativePath: string, zipEntry: any) {
                        zip.file(relativePath).async("text").then((text: string) => {
                            let blockName = relativePath.substr(0, relativePath.lastIndexOf("."));
                            localStorage.setItem(blockName, text);
                        });
                    }))
                    .catch((e: Error) => console.log("Error reading " + f.name + ": " + e.message));
            }

            if (evt != null && evt.target != null && evt.target.files != null) {
                let files = evt.target.files;
                for (let i = 0; i < files.length; i++) {
                    handleFile(files[i]);
                }
            }

        });
        $elt.trigger("click");
        return new HistoryCommand(this.getCommandName(), args, "blocks are loaded", "default-component");
    }
}