import {StormLexer} from "./StormLexer";
import {CharStream} from "antlr4ts";

export class MyStormLexer extends StormLexer {

    constructor(input: CharStream) {
        super(input);
    }
}