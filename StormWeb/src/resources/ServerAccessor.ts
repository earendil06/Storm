import {Accessor} from "./Accessor";
import {Block} from "../engine/Adapters";

export default class ServerAccessor extends Accessor {
    private host = "http://storm-resources.florentpastor.com/api/";

    async getBlockByName(blockName: string): Promise<Block> {
        const path = "blocks";
        return null;
    }

    async getBlockNameList(): Promise<string[]> {
        return undefined;
    }

    saveBlock(blockName: string, block: string): string {
        return "";
    }

}