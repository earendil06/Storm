import Command from "./Command";
import * as $ from "jquery";
import {IHistoryCommand} from "../../Application";
import * as JSZip from 'jszip';

export class LoadBlocksCommand extends Command {

    constructor() {
        super("load-blocks");
    }

    async execute(args: string[]): Promise<IHistoryCommand> {
        const $elt = $("#file") as any;
        $elt.off();
        $elt.on("change", function (evt) {
            function handleFile(f) {
                JSZip.loadAsync(f)
                    .then(zip => zip.forEach(function (relativePath, zipEntry) {
                        zip.file(relativePath).async("text").then(text => {
                            let blockName = relativePath.substr(0, relativePath.lastIndexOf("."));
                            localStorage.setItem(blockName, text);
                        });
                    }))
                    .catch((e => console.log("Error reading " + f.name + ": " + e.message)));
            }

            let files = evt.target.files;
            for (let i = 0; i < files.length; i++) {
                handleFile(files[i]);
            }
        });
        $elt.trigger("click");
        return null;
    }
}