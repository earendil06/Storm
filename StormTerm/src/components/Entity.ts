import Vue from "vue";

export default Vue.extend({
    template: `
    <div>{{ data.entity }}</div>
    `,
    name: "entity",
    props: ["data"]
});