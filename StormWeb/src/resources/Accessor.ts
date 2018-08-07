import {Block} from "../engine/Adapters";
import {ANTLRInputStream, CommonTokenStream} from "antlr4ts";
import {ParseTreeListener, ParseTreeWalker} from "antlr4ts/tree";
import {MyListener, MyStormLexer, MyStormParser} from "../language";
import Optional from 'typescript-optional';

interface IAccessor {
    getBlockByName(blockName: string) : Promise<Optional<Block>>;
    getBlockFromStormText(stormText: string): Optional<Block>;
    saveBlock(blockName: string, block:string): string;
    getBlockNameList(): Promise<string[]>;
}

export abstract class Accessor implements IAccessor {
    async abstract getBlockByName(blockName: string): Promise<Optional<Block>>;

    getBlockFromStormText(stormText: string): Optional<Block> {
        let inputStream = new ANTLRInputStream(stormText);
        let lexer = new MyStormLexer(inputStream);
        let tokenStream = new CommonTokenStream(lexer);
        const parser = new MyStormParser(tokenStream);
        parser.buildParseTree = true;
        try {
            let tree = parser.block();
            let listener = new MyListener(parser) as ParseTreeListener;
            ParseTreeWalker.DEFAULT.walk(listener, tree);
            const result = (listener as MyListener).getResult();
            return Optional.of(result);
        }catch (e) {
            return Optional.empty();
        }
    }

    async abstract getBlockNameList(): Promise<string[]>;

    abstract saveBlock(blockName: string, block: string): string;

}