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

public class Main {

    public static void main(String[] args) throws Exception {
        System.out.println("Running the compiler for Storm");

        String path;
        if (args.length > 1) {
            path = args[0];
        } else {
            path = Main.class.getResource("test.storm").getPath();
        }
        CharStream stream = getCharStream(path);
        buildModel(stream);
    }

    private static CharStream getCharStream(String path) throws IOException {
        Path input = Paths.get(new File(path).toURI());
        System.out.println(String.format("Using input file: %s\n", input));
        return CharStreams.fromPath(input);
    }

    private static void buildModel(CharStream stream) {
        StormLexer lexer = new StormLexer(stream);
        StormParser parser = new StormParser(new CommonTokenStream(lexer));

        ParseTreeWalker walker = new ParseTreeWalker();

        StormParser.BlockContext rootContext = parser.block();

        StormListenerImpl stormListenerImpl = new StormListenerImpl();

        walker.walk(stormListenerImpl, rootContext);
    }

}