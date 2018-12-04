package helpers;

import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.util.List;
import java.util.stream.Collectors;

public class TerminalHelper {
    private WebDriver driver;

    public TerminalHelper(WebDriver driver) {
        this.driver = driver;
    }

    private WebDriverWait generateWaiter(int timeoutInSeconds) {
        return new WebDriverWait(driver, timeoutInSeconds);
    }


    public void rewriteInput(String input) {
        WebElement inputElement = generateWaiter(2)
                .until(ExpectedConditions.presenceOfElementLocated(By.id(Selectors.ID_INPUT_COMMAND.getSelector())));
        inputElement.sendKeys(Keys.chord(Keys.CONTROL, "a"), input);

        if (!getInputText().equals(input)) {
            rewriteInput(input);
        }
    }

    public String getInputText() {
        WebElement inputElement = generateWaiter(2)
                .until(ExpectedConditions.presenceOfElementLocated(By.id(Selectors.ID_INPUT_COMMAND.getSelector())));
        return inputElement.getAttribute("value");
    }

    public String getResultTemplateName() {
        WebElement inputElement = generateWaiter(10)
                .until(ExpectedConditions.presenceOfElementLocated(By.id(Selectors.ID_COMMAND_RESULT_OUTPUT.getSelector())));
        return inputElement.getAttribute("data-template");
    }

    public String getResultText() {
        WebElement inputElement = generateWaiter(10)
                .until(ExpectedConditions.presenceOfElementLocated(By.id(Selectors.ID_COMMAND_RESULT_OUTPUT.getSelector())));
        return inputElement.getText();
    }

    public void pressEnter() {
        Actions action = new Actions(driver);
        System.out.println("command triggered : " + getInputText());
        action.sendKeys(Keys.ENTER).build().perform();
    }

    public void pressTab() {
        Actions action = new Actions(driver);
        action.sendKeys(Keys.TAB).build().perform();
    }

    public void reset() {
        rewriteInput("reset");
        pressEnter();
    }


    public List<String> getProposals() {
        List<WebElement> elements = generateWaiter(3)
                .until(ExpectedConditions.presenceOfAllElementsLocatedBy(By.cssSelector(".proposal span")));
        return elements.stream().map(WebElement::getText).collect(Collectors.toList());
    }
}
