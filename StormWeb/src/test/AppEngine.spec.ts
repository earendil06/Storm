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