import {Accessor} from "./Accessor";
import {Block} from "../engine/Adapters";
import Optional from "typescript-optional";

export default class LocalAccessor extends Accessor {

    async getBlockByName(blockName: string): Promise<Optional<Block>> {
        let blockStored = localStorage.getItem(blockName);
        if (blockStored) {
            return new Promise<Optional<Block>>((resolve, reject) => {
                let blockOpt = this.getBlockFromStormText(blockStored);
                resolve(blockOpt)
            });
        } else {
            return new Promise<Optional<Block>>((resolve, reject) => {
                this.loadBlockFromBrowserDB(blockName)
                    .then(blockText => resolve(this.getBlockFromStormText(blockText)))
                    .catch(reason => reject(reason))
            });
        }
    }

    private async loadFileByName(filename: string): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            let result;
            let xhr = new XMLHttpRequest(),
                blob,
                fileReader = new FileReader();
            xhr.open("GET", filename, true);
            xhr.responseType = "arraybuffer";
            xhr.addEventListener("load", function () {
                if (xhr.status === 200) {
                    blob = new Blob([xhr.response]);
                    fileReader.onload = function (evt) {
                        result = evt.target.result;
                        resolve(result);
                    };
                    fileReader.readAsText(blob);
                } else {
                    reject(xhr.status);
                }
            }, false);
            xhr.send();
        });
    }

    private async loadBlockFromBrowserDB(blockName: string): Promise<string> {
        const result = await this.loadFileByName("db/" + blockName + ".storm");
        try {
            localStorage.setItem(blockName, result);
            return result;
        } catch (e) {
            console.log("Storage failed: " + e);
            return "";
        }
    }

    async getBlockNameList(): Promise<string[]> {
        let blocks = new Set();
        for (let key in localStorage) {
            if (key.startsWith("db/user/")) {
                blocks.add(key.substr(7, key.length));
            }
        }
        const fileServer = await this.loadFileByName("db/all.json");
        const files = JSON.parse(fileServer) as string[];
        files.forEach(f => blocks.add(f));
        return [...blocks];
    }

    saveBlock(blockName: string, block: string): string {
        localStorage.setItem("db/user/" + blockName, block); //todo antlr validation
        return "";
    }

}