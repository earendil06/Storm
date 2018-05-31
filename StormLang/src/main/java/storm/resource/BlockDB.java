package storm.resource;

import com.ddmodel.Block;

import java.util.ArrayList;
import java.util.List;

public class BlockDB {
    private static BlockDB ourInstance = new BlockDB();
    public List<Block> blocks = new ArrayList<>();

    private BlockDB() {
    }

    public static BlockDB getInstance() {
        return ourInstance;
    }
}
