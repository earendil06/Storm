import Vue from "vue";
import EncounterComponent from "./Encounter";

export default Vue.extend({
    template: `
        <encounter-component v-bind:data="encounter"></encounter-component>
    `,
    name: "static-encounter",
    props: ['encounter'],
    components: {
        EncounterComponent
    }
});
