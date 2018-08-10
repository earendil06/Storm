import Vue from "vue";

export default Vue.extend({
    template: `
        <a :href="data.link">{{ data.text }}</a>
    `,
    name: "navigator",
    props: ["data"]
});