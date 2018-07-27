package com.pastorm.accessors;

import com.pastorm.StormParser;
import com.storm.model.Block;
import org.antlr.v4.runtime.misc.ParseCancellationException;

import java.util.List;
import java.util.Optional;

public interface Accessor {
    Optional<Block> getBlockByName(String blockName);

     default Optional<Block> getBlockFromStorm(String stormText){
         StormParser parser = new StormParser();
         Optional<ParseCancellationException> exception = parser.checkBlock(stormText);
         if (exception.isPresent()) {
             return Optional.empty();
         } else {
             return parser.parseBlock(stormText);
         }
     }

    String saveBlock(String blockName, String block);

    List<String> getBlockList();
}
