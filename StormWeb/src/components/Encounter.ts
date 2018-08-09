import Vue from "vue";
import {SetInitiativeCommand} from "../term/commands/SetInitiativeCommand";
import {NextTurnCommand} from "../term/commands/NextTurnCommand";
import {GetMonsterCommand} from "../term/commands/GetMonsterCommand";
import * as $ from "jquery";
import {DamageCommand} from "../term/commands/DamageCommand";
import {RollInitiativeCommand} from "../term/commands/RollInitiativeCommand";
import {StaticHelpers} from "../StaticHelpers";

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
                <h1 @click="next(data)" style="cursor: pointer; user-select: none; -moz-user-select: none; -ms-user-select: none;">
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
        modify: async function (monster) {
            let inputHp = $('#' + this.staticId + monster.name + 'hp');
            if (inputHp.val() !== '') {
                let args = [monster.name, inputHp.val()];
                let damageCommand = new DamageCommand();
                const res = await damageCommand.execute(args);
                this.push(res);
                inputHp.val('');

            }
            let inputInit = $('#' + this.staticId + monster.name + 'init');
            if (inputInit.val() !== '') {
                let args = [monster.name, inputInit.val()];
                let init = new SetInitiativeCommand();
                const res = await init.execute(args);
                this.push(res);
                inputInit.val('');
            }
        },
        next: async function (data) {
            if (data.playingMonsterName === "") {
                let initiativeCommand = new RollInitiativeCommand();
                const res = await initiativeCommand.execute([]);
                this.push(res);
            } else {
                let nextCommand = new NextTurnCommand();
                const res = await nextCommand.execute([]);
                this.push(res);
            }
        },
        get: async function (name) {
            let monsterCommand = new GetMonsterCommand();
            const res = await monsterCommand.execute([name]);
            this.push(res);
        },
        isPlaying: function (name) {
            return name === this.data.playingMonsterName ? "#191947" : "#922610"
        },
        push: function (res) {
            if (res != null) {
                StaticHelpers.application().commands.push(res);
            }
        }
    }
});