import {DiceValue} from "../engine/Adapters";

test('dice value: get formulae', async () => {
    const dice1 = new DiceValue(1, 6, 5);
    const dice2 = new DiceValue(1, 6, -5);
    const dice3 = new DiceValue(1, 6, 0);
    expect(dice1.getFormulae()).toBe("1d6+5");
    expect(dice2.getFormulae()).toBe("1d6-5");
    expect(dice3.getFormulae()).toBe("1d6");
});

test('dice value: get mean value', async () => {
    //TODO test mean value
    //const dice1 = new DiceValue(1, 20, 5);
});