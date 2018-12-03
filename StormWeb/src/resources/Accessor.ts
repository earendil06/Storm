import {Block} from "../engine/Adapters";
import Optional from 'typescript-optional';
import {IAccessor} from "./IAccessor";

export abstract class Accessor implements IAccessor {

    abstract async getBlockByName(blockName: string): Promise<Optional<Block>>;


    static async loadFileByName(filename: string): Promise<string> {
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
                        if (evt != null && evt.target != null) {
                            result = evt.target.result;
                            resolve(result);
                        }

                    };
                    fileReader.readAsText(blob);
                } else {
                    reject(xhr.status);
                }
            }, false);
            xhr.send();
        });
    }

    async abstract getBlockNameList(): Promise<string[]>;

    abstract saveBlock(blockName: string, block: string): void;

}