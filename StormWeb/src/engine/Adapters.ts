export interface Action {
    name: string;
    toHit: string;
    reach: string;
    range: string;
    hit: string;
    description: string;
}

export interface Ability {
    abilityType: string;
    score: number;
    modifier: number;
}

export interface Stat {
    statType: string;
    statValue: StatValue;
}

export interface StatValue {
    /*
    def formulae: String
    def meanValue: Int
    def instantiateValue: Int
    */
    // formulae: string;
    // meanValue: number;
}

export interface ConstValue extends StatValue {
    formulae: string;
    meanValue: number;
    instantiateValue: number;
}

export class DiceValue implements StatValue {
    number: number;
    sides: number;
    modifier: number;
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

export interface Feature {
    name: string;
    description: number;
}

export interface Block {
    name: string;
    abilityScores: Ability[];
    stats: Stat[];
    features: Feature[];
    actions: Action[];
}

export interface Monster {
    block: Block;
    name: String;
    hitPoints: number;
    initiative: number;
}

export interface EncounterData {
    monsters: Monster[];
    playingMonsterName: string;
    turn: number;
}