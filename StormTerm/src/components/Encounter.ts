import Vue from "vue";

export default Vue.extend({
    template: `
        <div class="stat-block">
        <hr class="orange-border"/>
        <div v-for="monster in data.entity.monsters" class="creature-heading">
            <h1>{{ monster.name === data.entity.playingMonsterName ? "=>" : "" }}
                {{ monster.blockName }} {{ monster.name[0].toUpperCase() + monster.name.slice(1) }}
            </h1>
            HP: {{ monster.hitPoints }}, AC: {{ monster.ac }}
            <br/>Initiative: {{ monster.initiative === null ? "not rolled" : monster.initiative }}
        </div>
        <div>
            <div class="creature-heading">
                <h1>{{ data.entity.playingMonsterName === "" ? "Nobody rolled initiative" :
                    data.entity.playingMonsterName + "\\'s turn" }}</h1>
            </div>
            <div>Turn {{ data.entity.turn }}</div>
        </div>
    </div>
    `,
    name: "encounter",
    props: ['data']
});