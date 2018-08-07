'use strict';

import {ANTLRInputStream, CommonTokenStream} from 'antlr4ts';
import {StormLexer} from '../parser/StormLexer';
import {
    BlockContext,
    StormParser,
    Action_blockContext,
    Feature_blockContext,
    StatContext, AbilityContext
} from '../parser/StormParser';
import {StormListener} from '../parser/StormListener';
import {ParseTreeWalker} from "antlr4ts/tree";
import {ParseTreeListener} from "antlr4ts/tree/ParseTreeListener";
import {Block} from "../src/engine/Adapters";

export class MyListener implements StormListener {
    private blockAdapter = new (window as any).BlockAdapter();
    private parser: StormParser;

    constructor(parser: StormParser) {
        this.parser = parser;
    }

    enterBlock(ctx: BlockContext) {
        const name = ctx.block_name().text.toLowerCase();
        this.blockAdapter.setName(name);
    }

    enterAbility(ctx: AbilityContext) {
        const type = ctx.STAT_ID().symbol.text.toLowerCase();
        const value = parseInt(ctx.NUMBER().symbol.text);
        const f = (value - 10) > 0 ? Math.floor : Math.ceil;
        const substractValue = value < 10 ? -1 : 0;
        const modifier = f((value - 10) / 2) + substractValue;
        this.blockAdapter.putAbility(type, value, modifier);
    }


    enterAction_block(ctx: Action_blockContext) {
        const actions = ctx.action_component();
        let reach = "", range = "", toHit = "", hit = "", description = "";
        actions.forEach(actionComponent => {
            if (actionComponent.reach() != null) {
                reach = actionComponent.reach().text;
            }
            if (actionComponent.range() != null) {
                range = actionComponent.range().text;
            }
            if (actionComponent.to_hit() != null) {
                toHit = actionComponent.to_hit().text;
            }
            if (actionComponent.hit() != null) {
                hit = actionComponent.hit().text;
            }
        });
        if (ctx.description() != null) {
            description = ctx.description().text;
        }
        const action = new (window as any).Action(ctx.action_block_name().text.replace("\n", ""), toHit, reach, range, hit, description);
        this.blockAdapter.putAction(action);
    }

    enterFeature_block(ctx: Feature_blockContext) {
        const name = ctx.feature_name().text;
        const description = ctx.description().text;
        this.blockAdapter.putFeature(name, description.replace("[{}]", ""));
    }

    enterStat(ctx: StatContext) {
        let statValue = "";
        if (ctx.NUMBER() == null) {
            const number = parseInt(ctx.dice().NUMBER(0).text);
            const faces = parseInt(ctx.dice().NUMBER(1).text);
            const modifierContext = ctx.dice().modifier();
            let modifierValue = 0;
            if (modifierContext != null) {
                const modifier = modifierContext.NUMBER().text;
                modifierValue = parseInt(modifier);
                const op = modifierContext.MODIFIER_OP().text;
                modifierValue = "+" === op ? modifierValue : -modifierValue;
            }
            statValue = new (window as any).DiceValue(number, faces, modifierValue);
        } else {
            statValue = new (window as any).ConstValue(ctx.NUMBER().text, parseInt(ctx.NUMBER().text));
        }
        this.blockAdapter.putStat(ctx.STAT().symbol.text.toLowerCase(), statValue);
    }


    public getResult(): Block {
        return JSON.parse(this.blockAdapter.getBlock);
    }

}

class Startup {
    public static main(): number {
        let b =
            `Acolyte

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

scimitar =>
+4 to hit
reach 5
hit 1d6+2 slashing

shortbow =>
+4 to hit
range 80/320
hit 1d6 + 2 piercing
{cool bow}
}

features {

Skills => {medicine 4, religion 2}

Languages => {any one language (usually Common)}

Challenge => {1/4}

}
`;
        let inputStream = new ANTLRInputStream(b);
        let lexer = new StormLexer(inputStream);
        let tokenStream = new CommonTokenStream(lexer);
        let parser = new StormParser(tokenStream);

        parser.buildParseTree = true;
        let tree = parser.block();
        let listener = new MyListener(parser) as ParseTreeListener;
        ParseTreeWalker.DEFAULT.walk(listener, tree);
        // console.log((listener as MyListener).getResult());

        return 0;
    }

}


Startup.main();