package com.storm.antlr;

import com.storm.antlr.grammar.StormBaseListener;
import com.storm.antlr.grammar.StormParser;
import com.storm.model.*;

import java.math.BigDecimal;
import java.util.List;

public class StormListenerImpl extends StormBaseListener {
    private BlockAdapter blockAdapter = new BlockAdapter();

    @Override
    public void enterBlock(StormParser.BlockContext ctx) {
        String name = ctx.block_name().getText().toLowerCase();
        blockAdapter.setName(name);
    }

    @Override
    public void enterAbility(StormParser.AbilityContext ctx) {
        String type = ctx.STAT_ID().getSymbol().getText().toLowerCase();
        int value = Integer.parseInt(ctx.NUMBER().getSymbol().getText());
        int roundingMode = (value - 10) > 0 ? BigDecimal.ROUND_DOWN : BigDecimal.ROUND_UP;
        BigDecimal decimal = new BigDecimal(value - 10).divide(new BigDecimal(2), roundingMode);
        int modifier = decimal.intValue();

        blockAdapter.putAbility(type, value, modifier);
    }

    @Override
    public void enterStat(StormParser.StatContext ctx) {
        StatValue statValue;
        if (ctx.NUMBER() == null) {
            int number = Integer.parseInt(ctx.dice().NUMBER().get(0).getText());
            int faces = Integer.parseInt(ctx.dice().NUMBER().get(1).getText());
            StormParser.ModifierContext modifierContext = ctx.dice().modifier();
            int modifierValue = 0;
            if (modifierContext != null) {
                String modifier = ctx.dice().modifier().NUMBER().getText();
                modifierValue = Integer.parseInt(modifier);
                String op = ctx.dice().modifier().MODIFIER_OP().getText();
                modifierValue = "+".equals(op) ? modifierValue : -modifierValue;
            }
            statValue = new DiceValue(number, faces, modifierValue);
        } else {
            statValue = new ConstValue(ctx.NUMBER().getText(), Integer.valueOf(ctx.NUMBER().getText()));
        }
        blockAdapter.putStat(ctx.STAT().getSymbol().getText().toLowerCase(), statValue);

    }

    @Override
    public void enterFeature_block(StormParser.Feature_blockContext ctx) {
        String name = ctx.feature_name().getText();
        String description = ctx.description().getText();
        blockAdapter.putFeature(name, description.replaceAll("[{}]", ""));
    }

    @Override
    public void enterAction_block(StormParser.Action_blockContext ctx) {
        List<StormParser.Action_componentContext> actions = ctx.action_component();
        Action action = new Action("", "", "", "", "", "");
        action = action.copy(ctx.action_block_name().getText().replaceAll("\n", ""), action.toHit(), action.reach(), action.range(), action.hit(), action.description());
        for (StormParser.Action_componentContext actionComponent : actions) {
            if (actionComponent.reach() != null) {
                action = action.copy(action.name(), action.toHit(), actionComponent.reach().getText(), action.range(), action.hit(), action.description());
            }
            if (actionComponent.range() != null) {
                action = action.copy(action.name(), action.toHit(), action.reach(), actionComponent.range().getText(), action.hit(), action.description());
            }
            if (actionComponent.to_hit() != null) {
                action = action.copy(action.name(), actionComponent.to_hit().getText(), action.reach(), action.range(), action.hit(), action.description());
            }
            if (actionComponent.hit() != null) {
                action = action.copy(action.name(), action.toHit(), action.reach(), action.range(), actionComponent.hit().getText(), action.description());
            }
        }
        if (ctx.description() != null) {
            String description = ctx.description().getText();
            action = action.copy(action.name(), action.toHit(), action.reach(), action.range(), action.hit(), description.replaceAll("[{}]", ""));
        }
        blockAdapter.putAction(action);
    }

    public Block getResult() {
        return blockAdapter.block();
    }
}
