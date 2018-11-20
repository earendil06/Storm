import Optional from "typescript-optional";
import {Block} from "../engine/Adapters";

export interface IAccessor {
    getBlockByName(blockName: string): Promise<Optional<Block>>;

    saveBlock(blockName: string, block: string): void;

    getBlockNameList(): Promise<string[]>;
}