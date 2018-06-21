package com.pastorm.accessors;

import com.ddmodel.Block;

import java.util.Optional;

public interface Accessor {
    Optional<Block> getBlockByName(String blockName);

    void saveBlock(String blockName, String block);
}
