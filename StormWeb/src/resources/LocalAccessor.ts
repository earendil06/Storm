import {Accessor} from "./Accessor";
import {Block} from "../engine/Adapters";

export default class LocalAccessor extends Accessor {

    async getBlockByName(blockName: string): Promise<Block> {
        let blockStored = localStorage.getItem(blockName);
        if (blockStored) {
            return new Promise<Block>((resolve, reject) => {
                let blockOpt = this.getBlockFromStormText(localStorage.getItem(blockName));
                resolve(blockOpt.get())
            });
        } else {
            return await this.loadBlock(blockName)
                .then(blockText => this.getBlockFromStormText(blockText).get())
                .catch(reason => reason);
        }
    }

    async getBlockNameList(): Promise<string[]> {
        return undefined;
    }

    saveBlock(blockName: string, block: string): string {
        return "";
    }

}