import {StormParser} from "parser/StormParser";
import {TokenStream} from "antlr4ts";
import {MyErrorListener} from "./MyErrorListener";

export class MyStormParser extends StormParser {

    constructor(input: TokenStream) {
        super(input);
        this.removeErrorListeners();
        this.addErrorListener(new MyErrorListener())
    }
}