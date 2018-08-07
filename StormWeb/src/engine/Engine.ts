import {Block, EncounterData, Monster} from "./Adapters";

export default class Engine {
    // private blockAdapter = new (window as any).BlockAdapter();
    private engine = new (window as any).JSAdapter() as any;

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
            console.log("bbbb")
            throw new Error("missing block")
        }
        this.engine.newMonster(name, this.toBlockAdapter(block));
    }

    getEncounterData(): EncounterData {
        return JSON.parse(this.engine.getEncounterData)
    }

    toBlockAdapter(block: Block): any {
        let adapter = new (window as any).BlockAdapter();
        adapter.setName(block.name);
        block.abilityScores.forEach(ability => adapter.putAbility(ability.abilityType, ability.score, ability.modifier));
        block.stats.forEach(stat => adapter.putStat(stat.statType, stat.statValue));
        block.features.forEach(feature => adapter.putFeature(feature.name, feature.description));
        block.actions.forEach(action => adapter.putAction(action));
        return adapter
    }

    getMonsterByName(name: string): Monster {
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
        this.engine.updateMonster(monster);
    }

    damage(name: string, damage: number): void {
        this.engine.damage(name, damage);
    }

    reset(): void {
        this.engine.reset();
    }

    getTurn(): number {
        return this.engine.getTurn();
    }

    remove(name: string): void {
        this.engine.remove(name);
    }

    setInitiative(name: string, value: number): Monster {
        return this.engine.setInitiative(name, value);
    }
}