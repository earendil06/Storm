import {Ability, Block, ConstValue, DiceValue, Feature, Stat, StatValue} from "../engine/Adapters";

export class JsonParser {
    static getBlockFromJson(text: string): Block {
        const result = new Block();
        const json = JSON.parse(text);

        result.name = (json["name"] as string || "").toLowerCase();

        result.stats = [];
        if (json.hasOwnProperty("stats")){
            const stats = json["stats"] as any[];
            stats.forEach(stat => {
                const statType = stat["statType"] as string || "";
                const statValue = stat["statValue"] as string || "";
                const diceRegExp = new RegExp("^\s*[0-9]+\s*(d)\s*[0-9]+\s*(([+\\-])\s*[0-9]+)?$");
                let value : StatValue;
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
                result.stats.push(new Stat(statType.toLowerCase(), value))
            });
        }

        if (json.hasOwnProperty("features")){
            const features = json["features"] as any[];
            features.forEach(feature => {
                const featureName = feature["name"] as string || "";
                const featureDesc = feature["description"] as string || "";
                result.features.push(new Feature(featureName, featureDesc));
            });
        }

        if (json.hasOwnProperty("abilityScores")){
            const abilities = json["abilityScores"] as any[];
            abilities.forEach(ability => {
                const type = ability["abilityType"] as string || "";
                const value = ability["score"] as number || 0;
                const f = (value - 10) > 0 ? Math.floor : Math.ceil;
                const subtractValue = value < 10 ? -1 : 0;
                const modifier = f((value - 10) / 2) + subtractValue;
                result.abilityScores.push(new Ability(type, value, modifier));
            });
        }


        //todo actions
        const actions = ctx.action_component();
        let reach = "", range = "", toHit = "", hit = "", description = "";
        actions.forEach(actionComponent => {
            if (actionComponent.reach() != null) {
                reach = actionComponent.reach().text;
            }
            if (actionComponent.range() != null) {
                range = actionComponent.range().text;
            }
            if (actionComponent.to_hit() != null) {
                toHit = actionComponent.to_hit().text;
            }
            if (actionComponent.hit() != null) {
                hit = actionComponent.hit().text;
            }
        });
        if (ctx.description() != null) {
            description = ctx.description().text;
        }
        let cleanDescription = description.replace(new RegExp(/[{}]/, 'g'), "");
        this.block.actions.push(new Action(ctx.action_block_name().text.replace("\n", ""), toHit, reach, range, hit, cleanDescription));

        return result;
    }
}