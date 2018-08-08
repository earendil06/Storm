import {Accessor} from "./Accessor";
import {Block} from "../engine/Adapters";

export default class LocalAccessor extends Accessor {

    async getBlockByName(blockName: string): Promise<Block> {
        let blockStored = localStorage.getItem(blockName);
        if (blockStored) {
            return new Promise<Block>((resolve, reject) => {
                let blockOpt = this.getBlockFromStormText(blockStored);
                resolve(blockOpt.get())
            });
        } else {
            return new Promise<Block>((resolve, reject) => {
                this.loadBlock(blockName)
                    .then(blockText => resolve(this.getBlockFromStormText(blockText).get()))
                    .catch(reason => reject(reason))
            });
        }
    }

    async getBlockNameList(): Promise<string[]> {
        return undefined;
    }

    saveBlock(blockName: string, block: string): string {
        return "";
    }

}