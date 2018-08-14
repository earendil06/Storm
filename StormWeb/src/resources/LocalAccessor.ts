import {Accessor} from "./Accessor";
import {Block} from "../engine/Adapters";
import Optional from "typescript-optional";

export default class LocalAccessor extends Accessor {

    async getBlockByName(blockName: string): Promise<Optional<Block>> {
        return new Promise<Optional<Block>>((resolve, reject) => {
            this.loadLocalBlock(blockName)
                .then(blockText => resolve(this.getBlockFromStormText(blockText)))
                .catch(reason => reject(reason))
        });
    }

    async loadFileByName(filename: string): Promise<string> {
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

    async loadBlockFromFile(blockName: string, path: string): Promise<string> {
        const result = await this.loadFileByName(path + blockName + ".storm")
            .then(value => {
                return value
            })
            .catch(() => "");
        if (result !== "") {
            try {
                localStorage.setItem(blockName, result);
                return result;
            } catch (e) {
                console.log("Storage failed: " + e);
                return "";
            }
        }
        return "";
    }

    async loadLocalBlock(blockName: string): Promise<string> {
        let userDb = await this.loadBlockFromDB(blockName, "db/user/");
        if (userDb !== "") {
            return userDb;
        }
        let db = await this.loadBlockFromDB(blockName, "");
        if (db !== "") {
            return db;
        }
        let fromFile = await this.loadBlockFromFile(blockName, "db/");
        if (fromFile !== "") {
            return fromFile;
        }
        return "";
    }

    private async loadBlockFromDB(blockName: string, path: string): Promise<string> {
        let res = localStorage.getItem(path + blockName);
        if (res == null) {
            return "";
        }
        return res;
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

    saveBlock(blockName: string, block: string): void {
        localStorage.setItem("db/user/" + blockName, block); //todo antlr validation
    }

}