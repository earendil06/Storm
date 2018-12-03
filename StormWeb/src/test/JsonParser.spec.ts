import {JsonParser} from "../resources/JsonParser";
import Optional from "typescript-optional";
import {Ability, Action, Block, ConstValue, DiceValue, Feature, Stat} from "../engine/Adapters";

test('getBlockFromJsonText when bad input', async () => {
    const input = "blabla\ntoto";
    expect(JsonParser.getBlockFromJsonText(input)).toEqual(Optional.empty());
});



test('getBlockFromJsonText when good input', async () => {
    const input = {
        "name": "Ape",
        "abilityScores": [
            {
                "abilityType": "str",
                "score": 16
            }
        ],
        "stats": [
            {
                "statType": "ac",
                "statValue": "12"
            },
            {
                "statType": "HP",
                "statValue": "3d8+6"
            }
        ],
        "features": [
            {
                "name": "Skills",
                "description": "Athletics 5, Perception 3"
            }
        ],
        "actions": [
            {
                "name": "Multiattack",
                "toHit": "",
                "reach": "",
                "hit": "",
                "description": "The ape makes two fist attacks."
            }
        ]
    };

    const expected = new Block();
    expected.name = "ape";
    expected.abilityScores = [new Ability("str", 16, 3)];
    expected.features = [new Feature("Skills", "Athletics 5, Perception 3")];
    expected.stats = [new Stat("ac", new ConstValue("12", 12)), new Stat("hp", new DiceValue(3, 8, 6))];
    expected.actions = [
        new Action("Multiattack", "", "", "", "", "The ape makes two fist attacks.")
    ];
    expect(JsonParser.getBlockFromJsonText(JSON.stringify(input)).get()).toEqual(expected);
});

test('compute modifier', async () => {
    /*expect(JsonParser.computeModifier(1)).toBe(-5);
    expect(JsonParser.computeModifier(2)).toBe(-4);
    expect(JsonParser.computeModifier(3)).toBe(-4);
    expect(JsonParser.computeModifier(4)).toBe(-3);
    expect(JsonParser.computeModifier(5)).toBe(-3);
    expect(JsonParser.computeModifier(6)).toBe(-2);
    expect(JsonParser.computeModifier(7)).toBe(-2);
    expect(JsonParser.computeModifier(8)).toBe(-1);
    expect(JsonParser.computeModifier(9)).toBe(-1);
    expect(JsonParser.computeModifier(10)).toBe(0);
    expect(JsonParser.computeModifier(11)).toBe(0);
    expect(JsonParser.computeModifier(12)).toBe(1);
    expect(JsonParser.computeModifier(13)).toBe(1);
    expect(JsonParser.computeModifier(14)).toBe(2);
    expect(JsonParser.computeModifier(15)).toBe(2);
    expect(JsonParser.computeModifier(16)).toBe(3);
    expect(JsonParser.computeModifier(17)).toBe(3);
    expect(JsonParser.computeModifier(18)).toBe(4);
    expect(JsonParser.computeModifier(19)).toBe(4);
    expect(JsonParser.computeModifier(20)).toBe(5);
    expect(JsonParser.computeModifier(21)).toBe(5);
    expect(JsonParser.computeModifier(22)).toBe(6);
    expect(JsonParser.computeModifier(23)).toBe(6);
    expect(JsonParser.computeModifier(24)).toBe(7);
    expect(JsonParser.computeModifier(25)).toBe(7);
    expect(JsonParser.computeModifier(26)).toBe(8);
    expect(JsonParser.computeModifier(27)).toBe(8);
    expect(JsonParser.computeModifier(28)).toBe(9);
    expect(JsonParser.computeModifier(29)).toBe(9);
    expect(JsonParser.computeModifier(30)).toBe(10);*/
});
