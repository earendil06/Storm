import Vue from "vue";

export default Vue.extend({
    template: `
        <div>{{ data }}</div>
    `,
    name: "default",
    props: ["data"]
});