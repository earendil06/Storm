import {StormListener} from "../parser/StormListener";
import {
    AbilityContext,
    Action_blockContext,
    BlockContext,
    Feature_blockContext, StatContext,
    StormParser
} from "../parser/StormParser";
import {Ability, Action, Block, ConstValue, DiceValue, Feature, Stat} from "../engine/Adapters";

export class MyStormListener implements StormListener {
    private block = new Block();
    private parser: StormParser;

    constructor(parser: StormParser) {
        this.parser = parser;
    }

    enterBlock(ctx: BlockContext) {
        this.block.name = ctx.block_name().text.toLowerCase();
    }

    enterAbility(ctx: AbilityContext) {
        const type = ctx.STAT_ID().symbol.text.toLowerCase();
        const value = parseInt(ctx.NUMBER().symbol.text);
        const f = (value - 10) > 0 ? Math.floor : Math.ceil;
        const substractValue = value < 10 ? -1 : 0;
        const modifier = f((value - 10) / 2) + substractValue;
        this.block.abilityScores.push(new Ability(type, value, modifier));
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
        this.block.actions.push(new Action(ctx.action_block_name().text.replace("\n", ""), toHit, reach, range, hit, description));
    }

    enterFeature_block(ctx: Feature_blockContext) {
        const name = ctx.feature_name().text;
        const description = ctx.description().text;
        this.block.features.push(new Feature(name, description.replace("[{}]", "")));
    }

    enterStat(ctx: StatContext) {
        let statValue;
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
            statValue = new DiceValue(number, faces, modifierValue);
        } else {
            statValue = new ConstValue(ctx.NUMBER().text, parseInt(ctx.NUMBER().text));
        }
        let stat = new Stat(ctx.STAT().symbol.text.toLowerCase(), statValue);
        this.block.stats.push(stat);
    }

    public getResult(): Block {
        return this.block;
    }

}