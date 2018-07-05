import Vue from "vue";
import {StaticHelpers} from "../commands/StaticHelpers";

export default Vue.extend({
    name: "Command",
    props: ['command', 'user'],
    mounted: function () {
        window.scrollTo(0, document.body.scrollHeight);
        StaticHelpers.hideSpinner();
    }
});