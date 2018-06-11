package com.pastorm.accessors;

import com.ddmodel.Block;
import com.pastorm.StormParser;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Optional;

public class LocalAccessor implements Accessor {
    private StormParser parser = new StormParser();

    @Override
    public Optional<Block> getBlockByName(String blockName) {
        String data = getFileContent(
                getClass().getClassLoader().getResource(blockName + ".storm").getPath());

        return parser.parseBlock(data);
    }


    private String getFileContent(String path) {
        Path input = Paths.get(new File(path).toURI());
        try {
            return String.join("\n", Files.readAllLines(input));
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }
}
