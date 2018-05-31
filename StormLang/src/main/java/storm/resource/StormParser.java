package storm.resource;

import com.ddmodel.Block;

public class StormParser {

    public Block getBlockFromName(String name) {
        new StormResourceAccessObject().parseBlockFromName(name);
        return BlockDB.getInstance().blocks.get(BlockDB.getInstance().blocks.size() - 1);
    }
}
