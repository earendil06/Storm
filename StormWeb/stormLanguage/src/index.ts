'use strict';

import {ANTLRInputStream, CommonTokenStream} from 'antlr4ts';
import {StormLexer} from '../parser/StormLexer';
import {StormParser} from '../parser/StormParser';
import {StormListener} from '../parser/StormListener';


class MyListener implements StormListener {

    private parser : StormParser;
    constructor(parser: StormParser){
        this.parser = parser;
    }

    enterBlock(ctx) {
        console.log(ctx);
        console.log('name: ' + ctx.block_name().getText());
        console.log('ability block: ' + ctx.ability_block());
    }

    getBlock() {
        console.log('totototo');
    }

}

class Startup {
    public static main(): number {
        console.log("ewojgfwegf")
        // Create the lexer and parser
        let inputStream = new ANTLRInputStream("text");
        let lexer = new StormLexer(inputStream);
        let tokenStream = new CommonTokenStream(lexer);
        let parser = new StormParser(tokenStream);
        // let ctx = parser.block();

        let listener = new MyListener(parser);

        parser.buildParseTree = true;
        let tree = parser.block();
        // let printer = new ExtractInterfaceListener(parser);
        // ParseTreeWalker.DEFAULT.walk(listener, tree);

        listener.getBlock();

        return 0;
    }

}


Startup.main();