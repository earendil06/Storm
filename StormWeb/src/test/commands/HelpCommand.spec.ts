import HelpCommand from "../../term/commands/HelpCommand";

test('basic', async () => {
    const command = new HelpCommand();
    const result = await command.execute([]);
    expect(result.templateName).toBe("default-component");

    expect("toto").toBe("default-component");
});