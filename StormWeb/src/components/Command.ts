import Vue from "vue";
import {StaticHelpers} from "../StaticHelpers";
import DefaultComponent from "./Default";
import BlockComponent from "./Block";
import EncounterComponent from "./Encounter";
import MonsterComponent from "./Monster";

export default Vue.extend({
    template: `
        <div>
        <div class="input-line line">
            <div class="prompt">{{ user }}</div>
            <div>
                <input class="cmdline" v-bind:value="command.completeInput" readonly="" autofocus>
            </div>
        </div>
        <div style="padding-bottom: 10px; padding-top: 5px;">
            <component :is="command.templateName" :data="command.output"></component>
        </div>
    </div>
    `,
    name: "command",
    props: ['command', 'user'],
    components: {
        DefaultComponent, BlockComponent, MonsterComponent, EncounterComponent
    },
    computed: {
        completeInput: function() {
            return this.command.command + " " + this.command.args.join(" ");
        }
    },
    mounted: function () {
        StaticHelpers.scrollWindow();
        StaticHelpers.hideSpinner();
    }
});
