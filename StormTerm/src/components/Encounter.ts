import Vue from "vue";
import {HealCommand} from "../commands/HealCommand";
import {SetInitiativeCommand} from "../commands/SetInitiativeCommand";
import {NextTurnCommand} from "../commands/NextTurnCommand";
import {GetMonsterCommand} from "../commands/GetMonsterCommand";
import * as $ from "jquery";

export default Vue.extend({
    template: `
    <div class="stat-block encounter">
        <hr class="orange-border"/>
        <div v-for="monster in data.monsters" class="creature-heading">
        <form v-on:submit.prevent="modify(monster)">
            <input type="submit" style="display: none"/>
            <h1 @click="get(monster.name)"
                style="cursor: pointer;
                user-select: none;
                -moz-user-select: none;
                -ms-user-select: none;"
                >
                    <!--{{ monster.name === data.playingMonsterName ? "=>" : "" }}-->
                    <span v-bind:style='{ color: isPlaying(monster.name) }'>
                        {{ monster.blockName }} {{ monster.name[0].toUpperCase() + monster.name.slice(1) }}
                    </span>
            </h1>
           AC: {{ monster.ac }},
           HP: 
            <input v-bind:id='staticId + monster.name + "hp"' type="text" v-bind:placeholder="monster.hitPoints" autocomplete="off"/>
            
            <br/>Initiative:
            <input v-bind:id='staticId + monster.name + "init"' type="text"
                v-bind:placeholder="monster.initiative === undefined ? 'none' : monster.initiative"
                autocomplete="off"/>
        </form>
        </div>
        
        <div>
            <div class="creature-heading">
                <h1 @click="next" style="cursor: pointer; user-select: none; -moz-user-select: none; -ms-user-select: none;">
                    {{ data.playingMonsterName === "" ? "Nobody rolled initiative" :
                        data.playingMonsterName + "\\'s turn" }}
                </h1>
            </div>
            <!--<div>Turn {{ data.turn }}</div>-->
        </div>
    </div>
    `,
    name: "encounter",
    props: ['data', 'staticId'],
    methods: {
        modify: function (monster) {
            let inputHp = $('#' + this.staticId + monster.name + 'hp');
            if (inputHp.val() !== '') {
                let args = ['heal', monster.name, inputHp.val()];
                let heal = new HealCommand();
                heal.execute('heal ' + monster.name + ' ' + inputHp.val(), args);
                inputHp.val('');
            }
            let inputInit = $('#' + this.staticId + monster.name + 'init');
            if (inputInit.val() !== '') {
                let args = ['set-init', monster.name, inputInit.val()];
                let init = new SetInitiativeCommand();
                init.execute('set-init ' + monster.name + ' ' + inputInit.val(), args);
                inputInit.val('');
            }
        },
        next: function () {
            let nextCommand = new NextTurnCommand();
            nextCommand.execute("next", [])
        },
        get: function (name) {
            let monsterCommand = new GetMonsterCommand();
            monsterCommand.execute('monster ' + name, ['monster', name])
        },
        isPlaying: function (name) {
            return name === this.data.playingMonsterName ? "#191947" : "#922610"
        }
    }
});