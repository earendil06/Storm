package com.pastorm;

import com.ddmodel.Block;
import com.storm.antlr.StopErrorListener;
import com.storm.antlr.StormListenerImpl;
import com.storm.antlr.grammar.StormLexer;
import org.antlr.v4.runtime.CharStream;
import org.antlr.v4.runtime.CommonTokenStream;
import org.antlr.v4.runtime.misc.ParseCancellationException;
import org.antlr.v4.runtime.tree.ParseTreeWalker;

import java.util.Optional;

public class StormParser {

    public Optional<Block> parseBlock(CharStream stream) {
        StormLexer lexer = new StormLexer(stream);
        com.storm.antlr.grammar.StormParser parser = new com.storm.antlr.grammar.StormParser(new CommonTokenStream(lexer));
        parser.addErrorListener(new StopErrorListener());
        ParseTreeWalker walker = new ParseTreeWalker();

        try {
            com.storm.antlr.grammar.StormParser.BlockContext rootContext = parser.block();
            StormListenerImpl stormListenerImpl = new StormListenerImpl();
            walker.walk(stormListenerImpl, rootContext);

            return Optional.of(stormListenerImpl.getResult());

        } catch (ParseCancellationException e) {
            return Optional.empty();
        }
    }


}
