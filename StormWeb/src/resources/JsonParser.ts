import {Ability, Action, Block, ConstValue, DiceValue, Feature, Stat, StatValue} from "../engine/Adapters";

export class JsonParser {

    static parseStatValue(statValue): StatValue {
        const diceRegExp = new RegExp("^\s*[0-9]+\s*(d)\s*[0-9]+\s*(([+\\-])\s*[0-9]+)?$");
        let value: StatValue;
        if (diceRegExp.test(statValue)) {
            const [number, faces, modifierString] = statValue.match(/[+\\-]?[0-9]+/gi);
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

    static getBlockFromJsonText(text: string): Block {
        const result = new Block();
        const json = JSON.parse(text);
        result.name = (json["name"] || "").toLowerCase();
        result.stats = [];
        if (json.hasOwnProperty("stats")) {
            const stats = json["stats"] as any[];
            stats.forEach(stat => {
                const statType = stat["statType"] || "";
                const statValue = stat["statValue"] || "";
                let value = this.parseStatValue(statValue);
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
                const type = ability["abilityType"] || "";
                const value = ability["score"] || 0;
                const f = (value - 10) > 0 ? Math.floor : Math.ceil;
                const subtractValue = value < 10 ? -1 : 0;
                const modifier = f((value - 10) / 2) + subtractValue;
                result.abilityScores.push(new Ability(type, value, modifier));
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
        return result;
    }
}