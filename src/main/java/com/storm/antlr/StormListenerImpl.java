package com.storm.antlr;

import com.storm.antlr.grammar.StormBaseListener;
import com.storm.antlr.grammar.StormParser;
import com.storm.model.Block;
import com.storm.model.ability.Ability;
import com.storm.model.stat.ConstValue;
import com.storm.model.stat.Dice;
import com.storm.model.stat.Stat;

public class StormListenerImpl extends StormBaseListener {
    private Block block = new Block();

    @Override
    public void enterName(StormParser.NameContext ctx) {
        String name = ctx.WORD().getText();
        System.out.println(name);
        block.setName(name);
    }

    @Override
    public void enterAbility(StormParser.AbilityContext ctx) {
        String type = ctx.STAT_ID().getSymbol().getText();
        int value = Integer.parseInt(ctx.NUMBER().getSymbol().getText());

        System.out.print(ctx.STAT_ID());
        System.out.print(" ");
        System.out.println(ctx.NUMBER());

        block.addAbility(new Ability(type, value));
    }

    @Override
    public void enterStat(StormParser.StatContext ctx) {
        System.out.print(ctx.STAT());
        System.out.print(" ");
        Stat stat = new Stat(ctx.STAT().getSymbol().getText());

        if (ctx.NUMBER() == null) {
            int number = Integer.parseInt(ctx.dice().NUMBER().get(0).getText());
            int faces = Integer.parseInt(ctx.dice().NUMBER().get(1).getText());
            Dice dice = new Dice(number, faces);

            String modifier = ctx.dice().modifier().NUMBER().getText();
            if (modifier != null) {
                int modifierValue = Integer.parseInt(modifier);
                String op = ctx.dice().modifier().MODIFIER_OP().getText();
                dice.setModifier("+".equals(op) ? modifierValue : - modifierValue);
            }
            System.out.print(number);
            System.out.print("d");
            System.out.print(faces);
            System.out.print(ctx.dice().modifier().MODIFIER_OP());
            System.out.println(modifier);
            stat.setStatValue(dice);
        } else {
            System.out.println(ctx.NUMBER());
            stat.setStatValue(new ConstValue(ctx.NUMBER().getText()));
        }

        block.addStat(stat);
    }

    @Override
    public void exitBlock(StormParser.BlockContext ctx) {
        System.out.println("\n====================\n");
        System.out.println(block);
    }
}
