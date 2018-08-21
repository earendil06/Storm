import Vue from "vue";
import {StaticHelpers} from "../StaticHelpers";
import DefaultComponent from "./Default";
import BlockComponent from "./Block";
import EncounterComponent from "./Encounter";
import MonsterComponent from "./Monster";
import NavigatorComponent from "./Navigator";
import MarkdownComponent from "./Markdown";
import ErrorComponent from "./Error";
import HelpComponent from "./Help";

export default Vue.extend({
    template: `
    <div class="input-line col-md-12">
        <div class="row">
            <div class="pull-left username">-></div>
            <div class="pull-left">{{ completeInput }}</div>
        </div>
        <div class="col-md-12">
            <component :is="command.templateName" :data="command.output"></component>
        </div>     
    </div>
    `,
    name: "command",
    props: ['command', 'user'],
    components: {
        DefaultComponent, BlockComponent, MonsterComponent, EncounterComponent, NavigatorComponent, MarkdownComponent, ErrorComponent, HelpComponent
    },
    computed: {
        completeInput: function () {
            return this.command.command + " " + this.command.args.join(" ");
        }
    },
    mounted: function () {
        StaticHelpers.scrollWindow();
        StaticHelpers.hideSpinner();
    }
});
