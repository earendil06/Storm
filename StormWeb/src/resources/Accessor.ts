import {Block} from "../engine/Adapters";
import {ANTLRInputStream, CommonTokenStream} from "antlr4ts";
import {ParseTreeListener, ParseTreeWalker} from "antlr4ts/tree";
import Optional from 'typescript-optional';
import {MyStormLexer} from "../language/MyStormLexer";
import {MyStormParser} from "../language/MyStormParser";
import {MyStormListener} from "../language/MyStormListener";

interface IAccessor {
    getBlockByName(blockName: string): Promise<Block>;

    getBlockFromStormText(stormText: string): Optional<Block>;

    saveBlock(blockName: string, block: string): string;

    getBlockNameList(): Promise<string[]>;
}

export abstract class Accessor implements IAccessor {

    async getBlockByName(blockName: string): Promise<Block> {
        let blockStored = localStorage.getItem(blockName);
        if (blockStored) {
            console.log("already loaded");
            return new Promise<Block>((resolve, reject) => {
                let blockOpt = this.getBlockFromStormText(localStorage.getItem(blockName));
                resolve(blockOpt.get())
            });
        } else {
            console.log("have to load");
            return await this.loadBlock(blockName)
                .then(blockText => this.getBlockFromStormText(blockText).get())
                .catch(reason => reason);
        }
    }

    async loadBlock(blockName: string): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            let block;
            let xhr = new XMLHttpRequest(),
                blob,
                fileReader = new FileReader();
            xhr.open("GET", "db/" + blockName + ".storm", true);
            xhr.responseType = "arraybuffer";
            xhr.addEventListener("load", function () {
                if (xhr.status === 200) {
                    blob = new Blob([xhr.response]);
                    fileReader.onload = function (evt) {
                        block = evt.target.result;
                        try {
                            localStorage.setItem(blockName, block);
                            resolve(block);
                        } catch (e) {
                            console.log("Storage failed: " + e);
                            reject(xhr.statusText);
                        }
                    };
                    fileReader.readAsText(blob);
                }
            }, false);
            xhr.send();
        });
    }

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

    async abstract getBlockNameList(): Promise<string[]>;

    abstract saveBlock(blockName: string, block: string): string;

}