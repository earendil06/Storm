import Vue from "vue";
import {StaticHelpers} from "../StaticHelpers";
import HelpCommand from "../term/commands/HelpCommand";

export default Vue.extend({
    template: `
        <div class="row">
            <div v-for="(com, index) in data" class="col-md-3">
                <span style="cursor: pointer" v-on:click="onClickHelpProposal(com)">{{ com }}</span>
            </div>
        </div>
    `,
    name: "help",
    props: ["data"],
    methods: {
        onClickHelpProposal: async function(com){
            let helpSpecificCommand = new HelpCommand();
            const res = await helpSpecificCommand.execute([com]);
            if (res != null) {
                StaticHelpers.application().commands.push(res);
            }
        }
    }
});