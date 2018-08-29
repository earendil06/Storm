import Vue from "vue";

export default Vue.extend({
    template: `
        <div v-html="data"></div>
    `,
    name: "default",
    props: ["data"]
});