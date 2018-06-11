package com.pastorm.accessors;

import com.ddmodel.Block;
import com.pastorm.StormParser;
import org.antlr.v4.runtime.CharStream;
import org.antlr.v4.runtime.CharStreams;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Optional;

public class LocalAccessor implements Accessor {
    private StormParser parser = new StormParser();

    @Override
    public Optional<Block> getBlockByName(String blockName) {
        CharStream data = getCharStream(
                getClass().getClassLoader().getResource(blockName + ".storm").getPath());

        return parser.parseBlock(data);
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
}
