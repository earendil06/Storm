import {Ability, Action, Block, ConstValue, DiceValue, Feature, Stat, StatValue} from "../engine/Adapters";
import Optional from "typescript-optional";

export class JsonParser {

    static parseStatValue(statValue:string): StatValue {
        const diceRegExp = new RegExp("^\s*[0-9]+\s*(d)\s*[0-9]+\s*(([+\\-])\s*[0-9]+)?$");
        let value: StatValue;
        if (diceRegExp.test(statValue)) {
            const [number, faces, modifierString] = statValue.match(/[+\\-]?[0-9]+/gi) as [string, string, string];
            let modifierValue = 0;
            if (modifierString != null) {
                modifierValue = parseInt(modifierString);
            }
            value = new DiceValue(parseInt(number), parseInt(faces), modifierValue);
        } else {
            value = new ConstValue(statValue, parseInt(statValue))
        }
        return value;
    }

    static parseAbility(ability:any): Ability {
        const type = ability["abilityType"] || "";
        const value = ability["score"] || 0;
        return new Ability(type, value, this.computeModifier(value));
    }

    static computeModifier(value: number) {
        return Math.floor(value / 2) - 5;
    }

    static getBlockFromJsonText(text: string): Optional<Block> {
        try {
            const result = new Block();
            const json = JSON.parse(text);
            result.name = (json["name"] || "").toLowerCase();
            result.stats = [];
            if (json.hasOwnProperty("stats")) {
                const stats = json["stats"] as any[];
                stats.forEach(stat => {
                    const statType = stat["statType"] || "";
                    const statValue = stat["statValue"] || "";
                    let value = JsonParser.parseStatValue(statValue);
                    result.stats.push(new Stat(statType.toLowerCase(), value))
                });
            }
            if (json.hasOwnProperty("features")) {
                const features = json["features"] as any[];
                features.forEach(feature => {
                    const featureName = feature["name"] || "";
                    const featureDesc = feature["description"] || "";
                    result.features.push(new Feature(featureName, featureDesc));
                });
            }
            if (json.hasOwnProperty("abilityScores")) {
                const abilities = json["abilityScores"] as any[];
                abilities.forEach(ability => {
                    result.abilityScores.push(this.parseAbility(ability));
                });
            }
            if (json.hasOwnProperty("actions")) {
                const actions = json["actions"] as any[];
                actions.forEach(action => {
                    let reach = action["reach"] || "";
                    let range = action["range"] || "";
                    let toHit = action["toHit"] || "";
                    let hit = action["hit"] || "";
                    let description = action["description"] || "";
                    let name = action["name"] || "";
                    let cleanDescription = description.replace(new RegExp(/[{}]/, 'g'), "");
                    result.actions.push(new Action(name.replace("\n", ""), toHit, reach, range, hit, cleanDescription));
                });
            }
            return Optional.of(result);
        } catch (e) {
            return Optional.empty();
        }

    }

}