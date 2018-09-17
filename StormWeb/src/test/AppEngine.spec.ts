import {ArrowDirection} from "../ArrowDirection";
import {AppEngine} from "../AppEngine";

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
    const history: string[] = ["prop", "prop", "prop", "prop", "prop", "prop", "prop", "prop"];
    expect(appEngine.computeProposalsIndexWithArrow(0, history, ArrowDirection.Down, 3)).toBe(3);
    expect(appEngine.computeProposalsIndexWithArrow(6, history, ArrowDirection.Down, 3)).toBe(6);

    expect(appEngine.computeProposalsIndexWithArrow(1, history, ArrowDirection.Up, 3)).toBe(1);
    expect(appEngine.computeProposalsIndexWithArrow(7, history, ArrowDirection.Up, 3)).toBe(4);

    expect(appEngine.computeProposalsIndexWithArrow(0, history, ArrowDirection.Left, 3)).toBe(0);
    expect(appEngine.computeProposalsIndexWithArrow(3, history, ArrowDirection.Left, 3)).toBe(2);

    expect(appEngine.computeProposalsIndexWithArrow(2, history, ArrowDirection.Right, 3)).toBe(3);
    expect(appEngine.computeProposalsIndexWithArrow(7, history, ArrowDirection.Right, 3)).toBe(7);



});
