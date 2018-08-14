import {Ability, Action, Block, ConstValue, DiceValue, EncounterData, Feature, Monster, Stat} from "./Adapters";

export default class Engine {
    private engine = new (window as any).JSAdapter() as any;

    private static MISSING_BLOCK = "missing block.";
    private static COOKIE = "cookie/encounter";

    constructor() {
        console.log(document.cookie);
        this.updateEncounter();
    }

    bakeCookie(): void {
        let encounter = this.getEncounterData();
        localStorage.setItem(Engine.COOKIE, JSON.stringify(encounter));
        console.log(localStorage.getItem(Engine.COOKIE));
    }

    updateEncounter(): void {
        let encounter = localStorage.getItem(Engine.COOKIE);
        if (encounter && encounter !== '') {
            this.engine.setEncounter(encounter);
        }
    }

    newMonster(name: string, block: Block): void {
        this.updateEncounter();
        let ba = this.toBlockAdapter(block);
        let ed = this.getEncounterData();
        let existing = ed.monsters.find(monster => monster.name === name);
        if (existing) {
            throw new Error(name + " already exists in the encounter.")
        }
        this.engine.newMonster(name, ba);
        this.bakeCookie();
    }

    getEncounterData(): EncounterData {
        let scalaEncounter = JSON.parse(this.engine.getEncounterData) as EncounterData;
        let monsters = scalaEncounter.monsters.map(m => new Monster(this.fromScalaBlock(m.block), m.name, m.hitPoints, m.initiative));
        return new EncounterData(monsters, scalaEncounter.playingMonsterName, scalaEncounter.turn);
    }

    toBlockAdapter(block: Block): any {
        if (block == null) {
            throw new Error(Engine.MISSING_BLOCK)
        }
        let adapter = new (window as any).BlockAdapter();
        adapter.setName(block.name);

        block.abilityScores.forEach(ability => adapter.putAbility(ability.abilityType, ability.score, ability.modifier));

        block.stats.forEach(function (stat) {
            let sv = stat.statValue;
            if (sv instanceof ConstValue) {
                let cv = new (window as any).ConstValue(sv.formulae, sv.meanValue);
                adapter.putStat(stat.statType, cv);
            } else if (sv instanceof DiceValue) {
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
        const result = JSON.parse(this.engine.getMonsterByName(name)) as Monster[];
        if (result.length === 0) {
            throw new Error("No monster found");
        }
        let m = result[0];

        let block = this.fromScalaBlock(m.block);
        return new Monster(block, m.name, m.hitPoints, m.initiative);
    }

    fromScalaBlock(scalaBlock: Block): Block {
        let b = new Block();
        b.name = scalaBlock.name;
        scalaBlock.actions.forEach(value => b.actions.push(new Action(value.name, value.toHit, value.reach, value.range, value.hit, value.description)));
        scalaBlock.features.forEach(value => b.features.push(new Feature(value.name, value.description)));
        scalaBlock.stats.forEach(value => {
            if ((value.statValue as any).$type == "com.pastorm.model.ConstValue") {
                let cv = value.statValue as any;
                b.stats.push(new Stat(value.statType, new ConstValue(cv.formulae, cv.meanValue)))
            } else {
                let dv = value.statValue as DiceValue;
                b.stats.push(new Stat(value.statType, new DiceValue(dv.number, dv.sides, dv.modifier)))
            }
        });
        scalaBlock.abilityScores.forEach(value => b.abilityScores.push(new Ability(value.abilityType, value.score, value.modifier)));
        return b;
    }

    getPlayingMonsterName(): string {
        return this.engine.getPlayingMonsterName;
    }

    rollInitiative(): void {
        this.updateEncounter();
        this.engine.rollInitiative();
        this.bakeCookie()
    }

    nextTurn(): Monster {
        this.updateEncounter();
        this.engine.nextTurn();
        this.bakeCookie();
        return this.getPlayingMonster();
    }

    getPlayingMonster(): Monster {
        let m = JSON.parse(this.engine.getPlayingMonster)[0];
        return new Monster(this.fromScalaBlock(m.block), m.name, m.hitPoints, m.initiative);
    }

    updateMonster(monster: Monster): void {
        if (monster == null) {
            throw new Error("Missing monster.")
        }
        this.engine.updateMonster(JSON.stringify(monster));
    }

    damage(name: string, damage: number): Monster {
        this.updateEncounter();
        if (name == null) {
            throw new Error("Missing name.")
        }
        if (damage == null) {
            throw new Error("Missing damage.")
        }
        let damaged = JSON.parse(this.engine.damage(name, damage)) as Monster[];
        if (damaged.length === 0) {
            throw Error("Not found");
        }
        this.updateMonster(damaged[0]);
        this.bakeCookie();
        return this.getMonsterByName(name);
    }

    isMonsterInEncounter(name: string): boolean {
        const result = JSON.parse(this.engine.getMonsterByName(name)) as Monster[];
        return result.length > 0;
    }

    reset(): void {
        this.updateEncounter();
        this.engine.reset();
        this.bakeCookie();
    }

    getTurn(): number {
        return this.engine.getTurn;
    }

    remove(name: string): void {
        this.updateEncounter();
        if (name == null) {
            throw new Error("Missing name.")
        }
        this.engine.remove(name);
        this.bakeCookie();
    }

    setInitiative(name: string, value: number): Monster {
        this.updateEncounter();
        if (name == null) {
            throw new Error("Missing name.")
        }
        if (value == null) {
            throw new Error("Missing value.")
        }
        let updated = JSON.parse(this.engine.setInitiative(name, value));
        this.updateMonster(updated[0]);
        this.bakeCookie();
        return this.getMonsterByName(name);
    }
}