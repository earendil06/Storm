package com.storm.antlr;

import com.ddmodel.Block;
import com.ddmodel.ability.Ability;
import com.ddmodel.spell.Spell;
import com.ddmodel.stat.ConstValue;
import com.ddmodel.stat.Dice;
import com.ddmodel.stat.Stat;
import com.storm.antlr.grammar.StormBaseListener;
import com.storm.antlr.grammar.StormParser;
import storm.resource.BlockDB;

public class StormListenerImpl extends StormBaseListener {
    private Block block = new Block();

    @Override
    public void enterBlock(StormParser.BlockContext ctx) {
        String name = ctx.WORD().getText();
//        System.out.println(name);
        block.setName(name);
    }

    @Override
    public void enterAbility(StormParser.AbilityContext ctx) {
        String type = ctx.STAT_ID().getSymbol().getText();
        int value = Integer.parseInt(ctx.NUMBER().getSymbol().getText());

//        System.out.print(ctx.STAT_ID());
//        System.out.print(" ");
//        System.out.println(ctx.NUMBER());

        block.putAbility(new Ability(type, value));
    }

    @Override
    public void enterStat(StormParser.StatContext ctx) {
//        System.out.print(ctx.STAT());
//        System.out.print(" ");
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
//            System.out.print(number);
//            System.out.print("d");
//            System.out.print(faces);
//            System.out.print(ctx.dice().modifier().MODIFIER_OP());
//            System.out.println(modifier);
            stat.setStatValue(dice);
        } else {
//            System.out.println(ctx.NUMBER());
            stat.setStatValue(new ConstValue(ctx.NUMBER().getText()));
        }

        block.putStat(stat);
    }

    @Override
    public void enterSpell_block(StormParser.Spell_blockContext ctx) {
        int index = ctx.children.indexOf(ctx.ARROW());
        StringBuilder name = new StringBuilder();
        StringBuilder description = new StringBuilder();
        for (int i = 0; i < index; i++) {
            name.append(ctx.children.get(i));
        }
        for (int i = index + 1; i < ctx.children.size(); i++) {
            description.append(ctx.children.get(i));
        }

        Spell spell = new Spell(name.toString(), description.toString());
        block.putSpell(spell);
    }

    @Override
    public void exitBlock(StormParser.BlockContext ctx) {
//        System.out.println("\n====================\n");
//        System.out.println(block);
        BlockDB.getInstance().blocks.add(block);
    }
}
