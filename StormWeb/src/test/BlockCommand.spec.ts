import {BlockCommand} from "../term/commands/BlockCommand";
import {Accessor} from "../resources/Accessor";

test('execute block command with no argument', async () => {
    const result = await new BlockCommand().execute([]);
    expect(result.templateName).toBe("error");
    expect(typeof result.output).toBe("string");
    expect(result.output).toBeDefined();
});

test('execute block command with bad block name', async () => {
    const result = await new BlockCommand().execute(["not_existing_block"]);
    expect(result.templateName).toBe("error");
    expect(typeof result.output).toBe("string");
    expect(result.output).toBeDefined();
});

// test('execute block command with good block name', async () => {
//     jest.mock('../resources/Accessor');
//     const mockFn = jest.fn();
//     const fileBlockContent = JSON.stringify(require("../../db/goblin.json"));
//
//     mockFn.mockReturnValue(fileBlockContent);
//     Accessor.loadFileByName = mockFn.bind(Accessor);
//
//     const result = await new BlockCommand().execute(["goblin"]);
//     console.log(result.output);
//     expect(result.templateName).toBe("block");
//     // expect(typeof result.output).toBe("block");
//     // expect(result.output).toBeDefined();
// });//TODO mock the database content