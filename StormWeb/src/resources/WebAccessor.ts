import {Accessor} from "./Accessor";
import {Block} from "../engine/Adapters";
import Optional from "typescript-optional";
import {JsonParser} from "./JsonParser";
import {StaticHelpers} from "../StaticHelpers";

export default class WebAccessor extends Accessor {

    async getBlockByName(blockName: string): Promise<Optional<Block>> {
        return new Promise<Optional<Block>>((resolve, reject) => {
            WebAccessor.loadLocalBlock(blockName)
                .then(blockText => resolve(JsonParser.getBlockFromJsonText(blockText)))
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

            StaticHelpers.getStorage().setItem(blockName, result);
            return result;

        }
        return "";
    }

    static async loadLocalBlock(blockName: string): Promise<string> {
        let userDb = await WebAccessor.loadBlockFromDB(blockName, "db/user/");
        if (userDb !== "") {
            return userDb;
        }
        let db = await WebAccessor.loadBlockFromDB(blockName, "");
        if (db !== "") {
            return db;
        }
        let fromFile = await WebAccessor.loadBlockFromFile(blockName, "db/");
        if (fromFile !== "") {
            return fromFile;
        }
        return "";
    }

    private static async loadBlockFromDB(blockName: string, path: string): Promise<string> {
        let res = StaticHelpers.getStorage().getItem(path + blockName);
        if (res == null) {
            return "";
        }
        return res;
    }

    async getBlockNameList(): Promise<string[]> {
        let blocks = new Set();

        for (let key in StaticHelpers.getStorage()) {
            if (key.startsWith("db/user/")) {
                blocks.add(key.substr(8, key.length));
            }
        }


        const fileServer = await Accessor.loadFileByName("db/all.json");
        const files = JSON.parse(fileServer) as string[];
        files.forEach(f => blocks.add(f));
        return [...blocks];
    }

    saveBlock(blockName: string, block: string): void {
        StaticHelpers.getStorage().setItem("db/user/" + blockName, block);
    }

}