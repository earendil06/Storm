import {ArrowDirection} from "../ArrowDirection";
import {AppEngine} from "../AppEngine";
import Optional from "typescript-optional";
import {StaticHelpers} from "../StaticHelpers";
import AutocompleteParameter from "../poco/AutocompleteParameter";
import {HistoryCommand} from "../poco/HistoryCommand";

const appEngine = new AppEngine();

test('compute position history when up pressed and history empty', async () => {
    expect(appEngine.computeHistoryPosition([], 0, ArrowDirection.Up)).toBe(0);
});

test('compute position history when up pressed and history not empty', async () => {
    const history = ["history 1", "history 2", "history 3"];
    expect(appEngine.computeHistoryPosition(history, 0, ArrowDirection.Up)).toBe(1);
    expect(appEngine.computeHistoryPosition(history, 1, ArrowDirection.Up)).toBe(2);
    expect(appEngine.computeHistoryPosition(history, 2, ArrowDirection.Up)).toBe(3);
    expect(appEngine.computeHistoryPosition(history, 3, ArrowDirection.Up)).toBe(3);
});

test('compute position history when down pressed and history empty', async () => {
    expect(appEngine.computeHistoryPosition([], 0, ArrowDirection.Down)).toBe(0);
});

test('compute position history when down pressed and history not empty', async () => {
    const history = ["history 1", "history 2", "history 3"];
    expect(appEngine.computeHistoryPosition(history, 3, ArrowDirection.Down)).toBe(2);
    expect(appEngine.computeHistoryPosition(history, 2, ArrowDirection.Down)).toBe(1);
    expect(appEngine.computeHistoryPosition(history, 1, ArrowDirection.Down)).toBe(0);
    expect(appEngine.computeHistoryPosition(history, 0, ArrowDirection.Down)).toBe(0);
});


test('compute proposalIndex when down pressed and proposals empty', async () => {
    const history: string[] = [];
    expect(appEngine.computeProposalsIndexWithArrow(0, history, ArrowDirection.Down)).toBe(0);
    expect(appEngine.computeProposalsIndexWithArrow(0, history, ArrowDirection.Left)).toBe(0);
    expect(appEngine.computeProposalsIndexWithArrow(0, history, ArrowDirection.Up)).toBe(0);
    expect(appEngine.computeProposalsIndexWithArrow(0, history, ArrowDirection.Right)).toBe(0);
});

test('compute proposalIndex when down pressed and proposals not empty', async () => {
    const props: string[] = ["prop", "prop", "prop", "prop", "prop", "prop", "prop", "prop"];
    expect(appEngine.computeProposalsIndexWithArrow(0, props, ArrowDirection.Down, 3)).toBe(3);
    expect(appEngine.computeProposalsIndexWithArrow(6, props, ArrowDirection.Down, 3)).toBe(6);

    expect(appEngine.computeProposalsIndexWithArrow(1, props, ArrowDirection.Up, 3)).toBe(1);
    expect(appEngine.computeProposalsIndexWithArrow(7, props, ArrowDirection.Up, 3)).toBe(4);

    expect(appEngine.computeProposalsIndexWithArrow(0, props, ArrowDirection.Left, 3)).toBe(0);
    expect(appEngine.computeProposalsIndexWithArrow(3, props, ArrowDirection.Left, 3)).toBe(2);

    expect(appEngine.computeProposalsIndexWithArrow(2, props, ArrowDirection.Right, 3)).toBe(3);
    expect(appEngine.computeProposalsIndexWithArrow(7, props, ArrowDirection.Right, 3)).toBe(7);
});

test('compute proposalIndex with tab', async () => {
    expect(appEngine.computeProposalsIndexWithTab(Optional.empty(), [])).toEqual(Optional.empty());
    expect(appEngine.computeProposalsIndexWithTab(Optional.of(0), [])).toEqual(Optional.empty());

    const props: string[] = ["prop", "prop"];
    expect(appEngine.computeProposalsIndexWithTab(Optional.empty(), props)).toEqual(Optional.of(0));
    expect(appEngine.computeProposalsIndexWithTab(Optional.of(0), props)).toEqual(Optional.of(1));
    expect(appEngine.computeProposalsIndexWithTab(Optional.of(1), props)).toEqual(Optional.of(0));
});

test("compute proposals with no function found", async () => {
    expect(await appEngine.computeProposals(Optional.empty())).toEqual([]);
});

test("compute proposals with function", async () => {
    jest.mock('../StaticHelpers');
    const mockStaticF = jest.fn();
    const proposalsExpected = ["prop 1", "prop 2"];
    mockStaticF.mockReturnValue(proposalsExpected);
    StaticHelpers.getCommands = mockStaticF.bind(StaticHelpers);

    expect(await appEngine.computeProposals(Optional.of(new AutocompleteParameter(new RegExp(""), StaticHelpers.getCommands)))).toEqual(proposalsExpected);
});

test("compute current command", async () => {
    expect(appEngine.computeCurrentCommand("")).toEqual(Optional.empty());
    expect(appEngine.computeCurrentCommand(" ")).toEqual(Optional.empty());
    expect(appEngine.computeCurrentCommand("command")).toEqual(Optional.of("command"));
    expect(appEngine.computeCurrentCommand("command arg")).toEqual(Optional.of("command"));
    expect(appEngine.computeCurrentCommand("command    arg")).toEqual(Optional.of("command"));
    expect(appEngine.computeCurrentCommand(" command arg")).toEqual(Optional.of("command"));
});

test("compute current arguments", async () => {
    expect(appEngine.computeCurrentArguments("")).toEqual([]);
    expect(appEngine.computeCurrentArguments(" ")).toEqual([]);
    expect(appEngine.computeCurrentArguments("command")).toEqual([]);
    expect(appEngine.computeCurrentArguments("command arg")).toEqual(["arg"]);
    expect(appEngine.computeCurrentArguments("command    arg")).toEqual(["arg"]);
    expect(appEngine.computeCurrentArguments(" command arg")).toEqual(["arg"]);
    expect(appEngine.computeCurrentArguments(" command arg1   arg2  ")).toEqual(["arg1", "arg2"]);
});

test("compute proposals displayed", async () => {
    expect(appEngine.computeProposalsDisplayed([], "")).toEqual([]);
    expect(appEngine.computeProposalsDisplayed([], "command")).toEqual([]);
    expect(appEngine.computeProposalsDisplayed([], "command arg")).toEqual([]);

    const proposals = ["goblin", "dragon", "ork", "dracula"];

    expect(appEngine.computeProposalsDisplayed(proposals, "command arg")).toEqual([]);
    expect(appEngine.computeProposalsDisplayed(proposals, "command lin")).toEqual([]);
    expect(appEngine.computeProposalsDisplayed(proposals, "command g")).toEqual(["goblin"]);
    expect(appEngine.computeProposalsDisplayed(proposals, "command dra")).toEqual(["dragon", "dracula"]);
    expect(appEngine.computeProposalsDisplayed(proposals, "command o")).toEqual(["ork"]);
});

test("compute input bang bang", async () => {
    const previousNoArg = new HistoryCommand("command", [], null, "");
    const previousArgs = new HistoryCommand("command", ["arg1", "arg2"], null, "");

    expect(appEngine.transformInputBangBang("!!", Optional.empty())).toEqual("");
    expect(appEngine.transformInputBangBang("", Optional.empty())).toEqual("");

    expect(appEngine.transformInputBangBang("!!", Optional.of(previousNoArg))).toEqual("");
    expect(appEngine.transformInputBangBang("!!", Optional.of(previousArgs))).toEqual("");
    expect(appEngine.transformInputBangBang("command !!", Optional.of(previousNoArg))).toEqual("command");
    expect(appEngine.transformInputBangBang("command !!", Optional.empty())).toEqual("command");
    expect(appEngine.transformInputBangBang("command !!", Optional.of(previousArgs))).toEqual("command arg1 arg2");
});

test("transform autocomplete input", async () => {
    expect(appEngine.transformInputAutocomplete("com", "command")).toBe("command");
    expect(appEngine.transformInputAutocomplete("", "command")).toBe("command");
    expect(appEngine.transformInputAutocomplete("command ", "argument")).toBe("command argument");
    expect(appEngine.transformInputAutocomplete("command arg", "argument")).toBe("command argument");
});

//todo find autocomplete parameters