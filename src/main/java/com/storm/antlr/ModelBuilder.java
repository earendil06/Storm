package com.storm.antlr;


import com.storm.antlr.grammar.StormBaseListener;
import com.storm.antlr.grammar.StormParser;

public class ModelBuilder extends StormBaseListener {

    @Override
    public void enterRoot(StormParser.RootContext ctx) {
        super.enterRoot(ctx);
    }

    @Override
    public void exitRoot(StormParser.RootContext ctx) {
        super.exitRoot(ctx);
    }

    @Override
    public void enterExpr(StormParser.ExprContext ctx) {
        int value = Integer.parseInt(ctx.value.getText());
        if (value == 42) {
            System.out.println("Well done !");
        } else {
            System.out.println("Try again !");
        }
        super.enterExpr(ctx);
    }

    @Override
    public void exitExpr(StormParser.ExprContext ctx) {
        super.exitExpr(ctx);
    }
}
