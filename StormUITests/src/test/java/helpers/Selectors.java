package helpers;

public enum Selectors {
    ID_INPUT_COMMAND("inputLine"),
    ID_COMMAND_RESULT_INPUT("command-result-input"),
    ID_COMMAND_RESULT_OUTPUT("command-result-output");

    private String selector;

    Selectors(String selector) {
        this.selector = selector;
    }

    public String getSelector() {
        return selector;
    }
}
