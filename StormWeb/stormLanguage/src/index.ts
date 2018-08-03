'use strict';

import {ANTLRInputStream, CommonTokenStream} from 'antlr4ts';
import {StormLexer} from '../parser/StormLexer';
import {Action_block_nameContext, Block_nameContext, StormParser} from '../parser/StormParser';
import {StormListener} from '../parser/StormListener';
import {ParseTreeWalker} from "antlr4ts/tree";


class MyListener implements StormListener {

    private parser : StormParser;
    constructor(parser: StormParser){
        this.parser = parser;
    }

    enterBlock_name (ctx: Block_nameContext) {
        console.log('name: ' + ctx.text);
    };

    exitAction_block_name (ctx: Action_block_nameContext) {
        console.log('action: ' + ctx.text);
    };

}

class Startup {
    public static main(): number {
        let b =
`
Acolyte

AC 10
HP 2d8
speed 30
pp 10

str 10
dex 10
con 10
int 10
wis 14
cha 11

actions {

Club =>
{Melee Weapon Attack: +2 to hit, reach 5 ft., one target. Hit: 2 (1d4) bludgeoning damage.}

}
features {

Skills => {medicine 4, religion 2}

Languages => {any one language (usually Common)}

Challenge => {1/4}

}
`
        let inputStream = new ANTLRInputStream(b);
        let lexer = new StormLexer(inputStream);
        let tokenStream = new CommonTokenStream(lexer);
        let parser = new StormParser(tokenStream);
        // let ctx = parser.block();


        parser.buildParseTree = true;
        let tree = parser.block();
        let listener = new MyListener(parser);
        ParseTreeWalker.DEFAULT.walk(listener, tree);


        return 0;
    }

}


Startup.main();