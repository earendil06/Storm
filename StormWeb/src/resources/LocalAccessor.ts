import {Accessor} from "./Accessor";
import {Block} from "../engine/Adapters";
import Optional from "typescript-optional";

export default class LocalAccessor extends Accessor {

    async getBlockByName(blockName: string): Promise<Optional<Block>> {
        return new Promise<Optional<Block>>((resolve, reject) => {
            this.loadLocalBlock(blockName)
                .then(blockText => resolve(this.getBlockFromJsonText(blockText)))
                .catch(reason => reject(reason))
        });
    }

    static async loadBlockFromFile(blockName: string, path: string): Promise<string> {
        const result = await Accessor.loadFileByName(path + blockName + ".json")
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
                return result;
            }
        }
        return "";
    }

    async loadLocalBlock(blockName: string): Promise<string> {
        let userDb = await LocalAccessor.loadBlockFromDB(blockName, "db/user/");
        if (userDb !== "") {
            return userDb;
        }
        let db = await LocalAccessor.loadBlockFromDB(blockName, "");
        if (db !== "") {
            return db;
        }
        let fromFile = await LocalAccessor.loadBlockFromFile(blockName, "db/");
        if (fromFile !== "") {
            return fromFile;
        }
        return "";
    }

    private static async loadBlockFromDB(blockName: string, path: string): Promise<string> {
        if (typeof localStorage === 'undefined') {
            return "";
        }
        let res = localStorage.getItem(path + blockName);
        if (res == null) {
            return "";
        }
        return res;
    }

    async getBlockNameList(): Promise<string[]> {
        let blocks = new Set();
        try {
            for (let key in localStorage) {
                if (key.startsWith("db/user/")) {
                    blocks.add(key.substr(8, key.length));
                }
            }
        } catch (e) {
            console.log("error access local storage");
        }


        const fileServer = await Accessor.loadFileByName("db/all.json");
        const files = JSON.parse(fileServer) as string[];
        files.forEach(f => blocks.add(f));
        return [...blocks];
    }

    saveBlock(blockName: string, block: string): void {
        localStorage.setItem("db/user/" + blockName, block);
    }

}