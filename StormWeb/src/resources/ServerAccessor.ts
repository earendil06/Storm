import {Accessor} from "./Accessor";
import {Block} from "../engine/Adapters";
import Optional from "typescript-optional";

export default class ServerAccessor extends Accessor {
    async getBlockByName(blockName: string): Promise<Optional<Block>> {
        return undefined;
    }

    async getBlockNameList(): Promise<string[]> {
        return undefined;
    }

    saveBlock(blockName: string, block: string): string {
        return "";
    }

}