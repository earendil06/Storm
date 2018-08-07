'use strict';

import {RecognitionException, Token, TokenStream} from 'antlr4ts';
import {
    BlockContext,
    StormParser,
    Action_blockContext,
    Feature_blockContext,
    StatContext, AbilityContext
} from '../parser/StormParser';
import {StormListener} from '../parser/StormListener';
import {Block} from "../engine/Adapters";
import {ANTLRErrorListener} from "antlr4ts/ANTLRErrorListener";

class MyErrorListener implements ANTLRErrorListener<Token>{
    syntaxError<T extends Token>(recognizer: any, offendingSymbol: (T | undefined), line: number, charPositionInLine: number, msg: string, e: (RecognitionException | undefined)){
        throw new Error("error line :" + line);
    }

}

export class MyStormParser extends StormParser {

    constructor(input: TokenStream) {
        super(input);
        this.removeErrorListeners();
        this.addErrorListener(new MyErrorListener())
    }
}

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