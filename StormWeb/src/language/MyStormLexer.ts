import {StormLexer} from "../parser/StormLexer";
import {CharStream} from "antlr4ts";

export class MyStormLexer extends StormLexer {

    constructor(input: CharStream) {
        super(input);
    }
}