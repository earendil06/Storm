import Vue from "vue";

export default Vue.extend({
    template: `
        <div v-html="markdownHtmlGenerated"></div>
    `,
    name: "help",
    props: ['data'],
    computed: {
        markdownHtmlGenerated: function () {
            const showdown  = require('showdown');
            let converter = new showdown.Converter();
            return converter.makeHtml(this.data);
        },
    }
});