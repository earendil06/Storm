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
    formulae: string;
    meanValue: number;
}

export interface ConstValue extends StatValue {
    formulae: string;
    meanValue: number;
}

export interface DiceValue extends StatValue {
    formulae: string;
    description: string;
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