export class Action {
    name: string;
    toHit: string;
    reach: string;
    range: string;
    hit: string;
    description: string;

    constructor(name: string, toHit: string, reach: string, range: string, hit: string, description: string) {
        this.name = name;
        this.toHit = toHit;
        this.reach = reach;
        this.range = range;
        this.hit = hit;
        this.description = description;
    }
}

export class Ability {
    abilityType: string;
    score: number;
    modifier: number;

    constructor(abilityType: string, score: number, modifier: number) {
        this.abilityType = abilityType;
        this.score = score;
        this.modifier = modifier;
    }
}

export class Stat {
    statType: string;
    statValue: StatValue;

    constructor(statType: string, statValue: StatValue) {
        this.statType = statType;
        this.statValue = statValue;
    }
}

export interface StatValue {
    meanValue: number;
    formulae: string;
    instantiateValue: number;
    $type: string;

}

export class ConstValue implements StatValue {
    formulae: string;
    meanValue: number;
    instantiateValue: number;
    $type: string;

    constructor(formulae: string, meanValue: number) {
        this.formulae = formulae;
        this.meanValue = meanValue;
        this.instantiateValue = meanValue;
        this.$type = "com.pastorm.model.ConstValue";
    }

}

export class DiceValue implements StatValue {
    number: number;
    sides: number;
    modifier: number;

    formulae: string;
    meanValue: number;
    instantiateValue: number;
    $type: string;

    constructor(number: number, sides: number, modifier: number) {
        this.number = number;
        this.sides = sides;
        this.modifier = modifier;
        this.formulae = this.getFormulae();
        this.meanValue = this.getMeanValue();
        this.instantiateValue = this.getMeanValue();
        this.$type = "com.pastorm.model.DiceValue";
    }

    getMeanValue(): number {
        let facesUp = this.sides + 1;
        let div = facesUp / 2;
        let res = this.number * div + this.modifier;
        return Math.floor(res);
    };

    getFormulae(): string {
        let modifierFormat = '+';
        if (this.modifier < 0) {
            modifierFormat = '';
        }
        let res = `${this.number}d${this.sides}`;
        if (this.modifier != 0) {
            res += modifierFormat.toString() + this.modifier.toString()
        }
        return res;
    };
}

export class Feature {
    name: string;
    description: string;

    constructor(name: string, description: string) {
        this.name = name;
        this.description = description;
    }
}

export class Block {
    name: string;
    abilityScores: Ability[];
    stats: Stat[];
    features: Feature[];
    actions: Action[];

    constructor() {
        this.abilityScores = [];
        this.stats = [];
        this.features = [];
        this.actions = [];
    }
}

export class Monster {
    block: Block;
    name: string;
    hitPoints: number;
    initiative: number;

    constructor(block: Block, name: string, hitPoints: number, initiative: number) {
        this.block = block;
        this.name = name;
        this.hitPoints = hitPoints;
        this.initiative = initiative;
    }
}

export class EncounterData {
    monsters: Monster[];
    playingMonsterName: string;
    turn: number;

    constructor(monsters: Monster[], playingMonsterName: string, turn: number) {
        this.monsters = monsters;
        this.playingMonsterName = playingMonsterName;
        this.turn = turn;
    }
}