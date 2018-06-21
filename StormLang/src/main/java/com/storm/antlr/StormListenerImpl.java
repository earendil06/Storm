package com.storm.antlr;

import com.ddmodel.Action;
import com.ddmodel.Block;
import com.ddmodel.ability.Ability;
import com.ddmodel.feature.Feature;
import com.ddmodel.stat.ConstValue;
import com.ddmodel.stat.Dice;
import com.ddmodel.stat.Stat;
import com.storm.antlr.grammar.StormBaseListener;
import com.storm.antlr.grammar.StormParser;

import java.util.List;

public class StormListenerImpl extends StormBaseListener {
    private Block block = new Block();

    @Override
    public void enterBlock(StormParser.BlockContext ctx) {
        String name = ctx.block_name().getText();
        block.setName(name);
    }

    @Override
    public void enterAbility(StormParser.AbilityContext ctx) {
        String type = ctx.STAT_ID().getSymbol().getText();
        int value = Integer.parseInt(ctx.NUMBER().getSymbol().getText());
        block.putAbility(new Ability(type, value));
    }

    @Override
    public void enterStat(StormParser.StatContext ctx) {
        Stat stat = new Stat(ctx.STAT().getSymbol().getText());
        if (ctx.NUMBER() == null) {
            int number = Integer.parseInt(ctx.dice().NUMBER().get(0).getText());
            int faces = Integer.parseInt(ctx.dice().NUMBER().get(1).getText());
            Dice dice = new Dice(number, faces);
            String modifier = ctx.dice().modifier().NUMBER().getText();
            if (modifier != null) {
                int modifierValue = Integer.parseInt(modifier);
                String op = ctx.dice().modifier().MODIFIER_OP().getText();
                dice.setModifier("+".equals(op) ? modifierValue : -modifierValue);
            }
            stat.setStatValue(dice);
        } else {
            stat.setStatValue(new ConstValue(ctx.NUMBER().getText()));
        }

        block.putStat(stat);
    }

    @Override
    public void enterFeature_block(StormParser.Feature_blockContext ctx) {
        String name = ctx.feature_name().getText();
        String description = ctx.description().getText();
        Feature feature = new Feature(name, description.replaceAll("[{}]", ""));
        block.putFeature(feature);
    }

    @Override
    public void enterAction_block(StormParser.Action_blockContext ctx) {
        List<StormParser.Action_componentContext> actions = ctx.action_component();
        Action action = new Action();
        action.setName(ctx.action_block_name().getText());
        for (StormParser.Action_componentContext actionComponent : actions) {
            if (actionComponent.reach() != null) {
                action.setReach(actionComponent.reach().getText());
            }
            if (actionComponent.range() != null) {
                action.setRange(actionComponent.range().getText());
            }
            if (actionComponent.to_hit() != null) {
                action.setToHit(actionComponent.to_hit().getText());
            }
            if (actionComponent.hit() != null) {
                action.setHit(actionComponent.hit().getText());
            }
        }
        if (ctx.description() != null) {
            String description = ctx.description().getText();
            action.setDescription(description.replaceAll("[{}]", ""));
        }
        block.putAction(action);
    }

    public Block getResult() {
        return block;
    }
}
