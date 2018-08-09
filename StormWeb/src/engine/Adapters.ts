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
    meanValue(): number;

    formulae(): string;
}

export class ConstValue implements StatValue {
    formulaeField: string;
    meanValueField: number;
    instantiateValue: number;

    constructor(formulae: string, meanValue: number) {
        this.formulaeField = formulae;
        this.meanValueField = meanValue;
        this.instantiateValue = meanValue;
    }

    formulae(): string {
        return this.formulaeField;
    }

    meanValue(): number {
        return this.meanValueField;
    }
}

export class DiceValue implements StatValue {
    number: number;
    sides: number;
    modifier: number;

    constructor(number: number, sides: number, modifier: number) {
        this.number = number;
        this.sides = sides;
        this.modifier = modifier;
    }

    meanValue(): number {
        let facesUp = this.sides + 1;
        let div = facesUp / 2;
        let res = this.number * div + this.modifier;
        return Math.floor(res);
    };

    formulae(): string {
        let modifierFormat = '+';
        if (this.modifier > 0) {
            modifierFormat = '-';
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
    name: String;
    hitPoints: number;
    initiative: number;

    constructor(block: Block, name: String, hitPoints: number, initiative: number) {
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