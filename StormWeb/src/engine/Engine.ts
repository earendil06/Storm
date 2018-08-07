import {Block, EncounterData, Monster} from "./Adapters";

export default class Engine {
    // private blockAdapter = new (window as any).BlockAdapter();
    private engine = new (window as any).JSAdapter() as any;

    private static MISSING_BLOCK = "missing block.";

    constructor() {
        // console.log(this.engine.getEncounterData)
        // console.log(this.engine.getEncounterData.turn)
    }

    newMonster(name: string, block: Block): void {
        console.log("aaaa")
        console.log(block);
        console.log(block.name);
        console.log(block.abilityScores);
        console.log(block.features);
        console.log(block.stats);
        console.log(block.actions);
        if (name == null) {
            throw new Error("missing name")
        }
        if (block == null) {
            throw new Error(Engine.MISSING_BLOCK)
        }
        this.engine.newMonster(name, this.toBlockAdapter(block));
    }

    getEncounterData(): EncounterData {
        return JSON.parse(this.engine.getEncounterData)
    }

    toBlockAdapter(block: Block): any {
        if (block == null) {
            throw new Error(Engine.MISSING_BLOCK)
        }
        let adapter = new (window as any).BlockAdapter();
        adapter.setName(block.name);
        block.abilityScores.forEach(ability => adapter.putAbility(ability.abilityType, ability.score, ability.modifier));
        block.stats.forEach(stat => adapter.putStat(stat.statType, stat.statValue));
        block.features.forEach(feature => adapter.putFeature(feature.name, feature.description));
        block.actions.forEach(action => adapter.putAction(action));
        return adapter
    }

    getMonsterByName(name: string): Monster {
        if (name == null) {
            throw new Error("Missing name.")
        }
        return this.engine.getMonsterByName(name);
    }

    getPlayingMonsterName(): string {
        return this.engine.getPlayingMonsterName;
    }

    rollInitiative(): void {
        this.engine.rollInitiative();
    }

    nextTurn(): void {
        this.engine.nextTurn();
    }

    getPlayingMonster(): Monster {
        return this.engine.getPlayingMonster();
    }

    updateMonster(monster: Monster): void {
        if (monster == null) {
            throw new Error("Missing monster.")
        }
        this.engine.updateMonster(monster);
    }

    damage(name: string, damage: number): void {
        if (name == null) {
            throw new Error("Missing name.")
        }
        if (damage == null) {
            throw new Error("Missing damage.")
        }
        this.engine.damage(name, damage);
    }

    reset(): void {
        this.engine.reset();
    }

    getTurn(): number {
        return this.engine.getTurn();
    }

    remove(name: string): void {
        if (name == null) {
            throw new Error("Missing name.")
        }
        this.engine.remove(name);
    }

    setInitiative(name: string, value: number): Monster {
        if (name == null) {
            throw new Error("Missing name.")
        }
        if (value == null) {
            throw new Error("Missing value.")
        }
        return this.engine.setInitiative(name, value);
    }
}