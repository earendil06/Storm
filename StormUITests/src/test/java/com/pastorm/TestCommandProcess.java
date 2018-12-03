package com.pastorm;

import org.junit.Assert;
import org.junit.Test;

public class TestCommandProcess extends SeleniumTest {

    @Test
    public void wrongCommandInInputTest() {
        String input = "wrong jedi";
        getHelper().writeInput(input);
        getHelper().pressEnter();
        Assert.assertEquals("error", getHelper().getResultTemplateName());
        Assert.assertEquals("Command does not exists.", getHelper().getResultText());
    }

}
