import {Block, EncounterData, Monster} from "./Adapters";

export default class Engine {
    private engine = new (window as any).JSAdapter() as any;

    private static MISSING_BLOCK = "missing block.";

    constructor() {
    }

    newMonster(name: string, block: Block): void {
        if (name == null) {
            throw new Error("missing name")
        }
        if (block == null) {
            throw new Error(Engine.MISSING_BLOCK)
        }
        let ba = this.toBlockAdapter(block);
        this.engine.newMonster(name, ba);
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

        return adapter
    }

    getMonsterByName(name: string): Monster {
        if (name == null) {
            throw new Error("Missing name.")
        }
        return JSON.parse(this.engine.getMonsterByName(name));
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
        return JSON.parse(this.engine.getPlayingMonster());
    }

    updateMonster(monster: Monster): void {
        if (monster == null) {
            throw new Error("Missing monster.")
        }
        this.engine.updateMonster(JSON.stringify(monster));
    }

    damage(name: string, damage: number): Monster {
        if (name == null) {
            throw new Error("Missing name.")
        }
        if (damage == null) {
            throw new Error("Missing damage.")
        }
        // this.engine.updateMonster(JSON.parse(this.engine.damage(name, damage)));
        let damaged = JSON.parse(this.engine.damage(name, damage));
        this.updateMonster(damaged[0]);
        return this.getMonsterByName(name);
    }

    reset(): void {
        this.engine.reset();
    }

    getTurn(): number {
        return this.engine.getTurn;
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
        return JSON.parse(this.engine.setInitiative(name, value));
    }
}