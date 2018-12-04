package com.pastorm;

import org.junit.Assert;
import org.junit.Test;

import java.util.List;

public class BlockTest extends SeleniumTest {

    @Test
    public void allBlocksAreGoodTest() {
        getHelper().rewriteInput("block ");
        getHelper().pressTab();

        List<String> blocks = getHelper().getProposals();

        for (String blockName : blocks) {
            getHelper().rewriteInput("block " + blockName);
            getHelper().pressEnter();
            Assert.assertEquals("block", getHelper().getResultTemplateName());
        }
    }
}
