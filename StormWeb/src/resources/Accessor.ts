import {Block} from "../engine/Adapters";
import {ANTLRInputStream, CommonTokenStream} from "antlr4ts";
import {ParseTreeListener, ParseTreeWalker} from "antlr4ts/tree";
import Optional from 'typescript-optional';
import {MyStormLexer} from "../language/MyStormLexer";
import {MyStormParser} from "../language/MyStormParser";
import {MyStormListener} from "../language/MyStormListener";

interface IAccessor {
    getBlockByName(blockName: string): Promise<Optional<Block>>;

    getBlockFromStormText(stormText: string): Optional<Block>;

    saveBlock(blockName: string, block: string): void;

    getBlockNameList(): Promise<string[]>;
}

export abstract class Accessor implements IAccessor {

    abstract async getBlockByName(blockName: string): Promise<Optional<Block>>;

    getBlockFromStormText(stormText: string): Optional<Block> {
        let inputStream = new ANTLRInputStream(stormText);
        let lexer = new MyStormLexer(inputStream);
        let tokenStream = new CommonTokenStream(lexer);
        const parser = new MyStormParser(tokenStream);
        parser.buildParseTree = true;
        try {
            let tree = parser.block();
            let listener = new MyStormListener(parser) as ParseTreeListener;
            ParseTreeWalker.DEFAULT.walk(listener, tree);
            const result = (listener as MyStormListener).getResult();
            return Optional.of(result);
        } catch (e) {
            return Optional.empty();
        }
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

    async abstract getBlockNameList(): Promise<string[]>;

    abstract saveBlock(blockName: string, block: string): void;

}