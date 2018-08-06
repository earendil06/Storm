'use strict';

import {ANTLRInputStream, CommonTokenStream} from 'antlr4ts';
import {StormLexer} from '../parser/StormLexer';
import {
    BlockContext,
    StormParser,
    Ability_blockContext,
    Action_blockContext,
    Feature_blockContext,
    StatContext, AbilityContext
} from '../parser/StormParser';
import {StormListener} from '../parser/StormListener';
import {ParseTreeWalker} from "antlr4ts/tree";
import {ParseTreeListener} from "antlr4ts/tree/ParseTreeListener";

// import * as Engine from "./../../../engine/target/scala-2.12/engine-fastopt.js"

class MyListener implements StormListener {
    private blockAdapter = new (window as any).BlockAdapter();
    private parser : StormParser;
    constructor(parser: StormParser){
        this.parser = parser;
    }

    enterBlock (ctx: BlockContext) {
        const name = ctx.block_name().text.toLowerCase();
        this.blockAdapter.setName(name);
        console.log(this.blockAdapter);
        //todo set name adapter
    }

    enterAbility (ctx: AbilityContext){
        const type = ctx.STAT_ID().symbol;
    }


    enterAction_block(ctx: Action_blockContext) {

    }
    enterFeature_block (ctx: Feature_blockContext){
        const name = ctx.feature_name().text;
        const description = ctx.description().text;
        //todo put feature
    }
    enterStat (ctx: StatContext){}





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
        let listener = new MyListener(parser) as ParseTreeListener;
        ParseTreeWalker.DEFAULT.walk(listener, tree);


        return 0;
    }

}


Startup.main();