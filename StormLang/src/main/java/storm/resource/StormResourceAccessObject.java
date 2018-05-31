package storm.resource;

import com.storm.antlr.StormListenerImpl;
import com.storm.antlr.grammar.StormLexer;
import com.storm.antlr.grammar.StormParser;
import org.antlr.v4.runtime.CharStream;
import org.antlr.v4.runtime.CharStreams;
import org.antlr.v4.runtime.CommonTokenStream;
import org.antlr.v4.runtime.tree.ParseTreeWalker;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;

class StormResourceAccessObject {

    StormResourceAccessObject() {
    }

    void parseBlockFromName(String name) {
        buildModel(getCharStream(
                StormResourceAccessObject.class.getClassLoader().getResource(name + ".storm").getPath()));
    }

    private CharStream getCharStream(String path) {
        Path input = Paths.get(new File(path).toURI());
        try {
            return CharStreams.fromPath(input);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

    private void buildModel(CharStream stream) {
        StormLexer lexer = new StormLexer(stream);
        StormParser parser = new StormParser(new CommonTokenStream(lexer));
        ParseTreeWalker walker = new ParseTreeWalker();
        StormParser.BlockContext rootContext = parser.block();
        StormListenerImpl stormListenerImpl = new StormListenerImpl();
        walker.walk(stormListenerImpl, rootContext);
    }

}
