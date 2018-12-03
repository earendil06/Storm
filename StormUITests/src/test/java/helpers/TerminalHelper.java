package helpers;

import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.interactions.Actions;

public class TerminalHelper {
    private WebDriver driver;

    public TerminalHelper(WebDriver driver) {

        this.driver = driver;
    }

    public void writeInput(String input) {
        WebElement inputElement = driver.findElement(By.id(Selectors.ID_INPUT_COMMAND.getSelector()));
        inputElement.click();
        inputElement.sendKeys(input);
    }

    public String getInputText() {
        WebElement inputElement = driver.findElement(By.id(Selectors.ID_INPUT_COMMAND.getSelector()));
        return inputElement.getAttribute("value");
    }

    public String getResultTemplateName() {
        WebElement inputElement = driver.findElement(By.id(Selectors.ID_COMMAND_RESULT_OUTPUT.getSelector()));
        return inputElement.getAttribute("data-template");
    }

    public String getResultText() {
        WebElement inputElement = driver.findElement(By.id(Selectors.ID_COMMAND_RESULT_OUTPUT.getSelector()));
        return inputElement.getText();
    }

    public void pressEnter() {
        Actions action = new Actions(driver);
        action.sendKeys(Keys.ENTER).build().perform();
    }

}
