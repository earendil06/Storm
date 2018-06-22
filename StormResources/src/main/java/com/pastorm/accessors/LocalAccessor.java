package com.pastorm.accessors;

import com.ddmodel.Block;
import com.pastorm.StormParser;
import com.pastorm.utils.StormProperties;
import org.antlr.v4.runtime.misc.ParseCancellationException;

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
        String dbPath = StormProperties.getStormProperties().getProperty("db_path", "./StormDB");
        String data = getFileContent(Paths.get(dbPath, blockName + ".storm").toString());
        return parser.parseBlock(data);
    }

    @Override
    public String saveBlock(String blockName, String block) {
        StringBuilder resultBuilder = new StringBuilder();
        String dbPath = StormProperties.getStormProperties().getProperty("db_path", "./StormDB");
        Path path = Paths.get(dbPath, blockName + ".storm");
        Optional<ParseCancellationException> exception = parser.checkBlock(block);
        if (exception.isPresent()) {
            resultBuilder.append(exception.get().getMessage());
        } else {
            try {
                Files.write(path, block.getBytes());
            } catch (IOException e) {
                resultBuilder.append("\n").append(e.getMessage());
                e.printStackTrace();
            }
        }
        return resultBuilder.toString();
    }

    private String getFileContent(String path) {
        Path input = Paths.get(new File(path).toURI());
        if (Files.notExists(input)) {
            return null;
        }
        try {
            return String.join("\n", Files.readAllLines(input));
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }
}
