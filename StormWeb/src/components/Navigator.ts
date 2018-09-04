import Vue from "vue";

export default Vue.extend({
    template: `
<a v-if="data.download" download :href="data.link">{{ data.text }}</a>
<a v-else :href="data.link">{{ data.text }}</a>
    `,
    name: "navigator",
    props: ["data"]
});