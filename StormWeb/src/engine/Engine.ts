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
        console.log(block);
        if (name == null) {
            throw new Error("missing name")
        }
        if (block == null) {
            throw new Error(Engine.MISSING_BLOCK)
        }
        // this.engine.newMonster(name, JSON.stringify(block));
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

        block.stats.forEach(function (stat) {
            let sv = (stat.statValue as any);
            if (sv.$type === "com.pastorm.model.ConstValue") {
                let cv = new (window as any).ConstValue(sv.formulae, sv.meanValue);
                adapter.putStat(stat.statType, cv);
            } else {
                let dv = new (window as any).DiceValue(sv.number, sv.sides, sv.modifier);
                adapter.putStat(stat.statType, dv);
            }
        });

        block.features.forEach(feature => adapter.putFeature(feature.name, feature.description));

        block.actions.forEach(function (actionTS) {
            const action = new (window as any).Action(actionTS.name, actionTS.toHit, actionTS.reach, actionTS.range, actionTS.hit, actionTS.description);
            adapter.putAction(action)
        });

        console.log(adapter);
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