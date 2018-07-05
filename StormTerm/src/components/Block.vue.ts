import Vue from "vue";

export default Vue.extend({
    name: "Block",
    props: ["data"],
    methods: {
        splitLine: function (description) {
            if (description == null) return null;
            return description.split('\n');
        }
    },
    mounted: function () {
        window.scrollTo(0, document.body.scrollHeight);
    }
});