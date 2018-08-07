import {Block, EncounterData} from "./Adapters";

export default class Engine {
    // private blockAdapter = new (window as any).BlockAdapter();
    private engine = new (window as any).JSAdapter() as any;

    constructor() {
        // console.log(this.engine.getEncounterData)
        // console.log(this.engine.getEncounterData.turn)
    }

    newMonster(name: string, block: Block): void {
        this.engine.newMonster(name, this.toBlockAdapter(block))
    }

    getEncounterData(): EncounterData {
        return this.engine.getEncounterData
    }

    toBlockAdapter(block: Block) : any {
        let adapter = new (window as any).BlockAdapter();
        adapter.setName(block.name);
        block.abilityScores.forEach(ability => adapter.putAbility(ability.abilityType, ability.score, ability.modifier));
        block.stats.forEach(stat => adapter.putStat(stat.statType, stat.statValue));
        block.features.forEach(feature => adapter.putFeature(feature.name, feature.description));
        block.actions.forEach(action => adapter.putAction(action));
        return adapter
    }

}