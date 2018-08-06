import HelpCommand from "../../commands/HelpCommand";

test('basic', async () => {
    const command = new HelpCommand();
    const result = await command.execute([]);
    expect(result.templateName).toBe("default-component");
});