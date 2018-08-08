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
    //formulae: String, meanValue: Int
    formulae: string;
    meanValue: number;
    instantiateValue: number;
}

export interface DiceValue extends StatValue {
    //number: Int, sides: Int, modifier: Int
    number: number;
    sides: number;
    modifier: number;
    instantiateValue: number;
    meanValue: number;
    formulae: number;
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