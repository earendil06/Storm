package com.storm.antlr;

import com.storm.antlr.grammar.StormBaseListener;
import com.storm.antlr.grammar.StormParser;
import com.storm.model.ability.Ability;
import com.storm.model.Block;

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

        System.out.print(ctx.STAT_ID().getSymbol().getText());
        System.out.print(" ");
        System.out.println(ctx.NUMBER().getSymbol().getText());

        block.addAbility(new Ability(type, value));
    }

    @Override
    public void exitBlock(StormParser.BlockContext ctx) {
        System.out.println("\n====================\n");
        System.out.println(block);
    }
}
