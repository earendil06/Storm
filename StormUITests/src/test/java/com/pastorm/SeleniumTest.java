package com.pastorm;

import helpers.TerminalHelper;
import org.junit.After;
import org.junit.Before;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.edge.EdgeDriver;

public abstract class SeleniumTest {

    private WebDriver driver;
    private TerminalHelper helper;

    @Before
    public void beforeTest() throws InterruptedException {
        driver = new EdgeDriver();
        helper = new TerminalHelper(driver);
        driver.get("https://storm.florentpastor.com");

    }

    @After
    public void afterTest() {
        driver.quit();
    }

    public TerminalHelper getHelper() {
        return helper;
    }

    public WebDriver getDriver() {
        return driver;
    }
}
