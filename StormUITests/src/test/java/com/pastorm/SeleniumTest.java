package com.pastorm;

import helpers.TerminalHelper;
import org.junit.After;
import org.junit.Before;
import org.openqa.selenium.Capabilities;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.remote.RemoteWebDriver;

import java.net.MalformedURLException;
import java.net.URL;

public abstract class SeleniumTest {

    private Capabilities chromeCapabilities = DesiredCapabilities.chrome();
    private WebDriver driver;
    private TerminalHelper helper;

    @Before
    public void beforeTest() throws MalformedURLException {
        driver = new RemoteWebDriver(new URL("http://localhost:4444/wd/hub"), chromeCapabilities);
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
