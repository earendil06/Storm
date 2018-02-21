import com.storm.antlr.ModelBuilder;
import com.storm.antlr.StopErrorListener;
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

    public static void main (String[] args) throws Exception {
        System.out.println("\n\nRunning the compiler for Storm");

        CharStream stream = getCharStream(args);
        buildModel(stream);

    }

    private static CharStream getCharStream(String[] args) throws IOException {
        if (args.length < 1)
            throw new RuntimeException("no input file");
        Path input = Paths.get(new File(args[0]).toURI());
        System.out.println("Using input file: " + input);
        return CharStreams.fromPath(input);
    }

    private static void buildModel(CharStream stream) {
        StormLexer lexer   = new StormLexer(stream);
        lexer.removeErrorListeners();
        lexer.addErrorListener(new StopErrorListener());

        StormParser parser  = new StormParser(new CommonTokenStream(lexer));
        parser.removeErrorListeners();
        parser.addErrorListener(new StopErrorListener());

        ParseTreeWalker walker  = new ParseTreeWalker();
        ModelBuilder builder = new ModelBuilder();

        walker.walk(builder, parser.root());
    }

}