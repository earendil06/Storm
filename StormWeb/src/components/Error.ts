import Vue from "vue";

export default Vue.extend({
    template: `
        <div style="color: #7A200D">{{ data }}</div>
    `,
    name: "error",
    props: ["data"]
});