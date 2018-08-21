import Vue from "vue";

export default Vue.extend({
    template: `
        <div v-html="markdownHtmlGenerated"></div>
    `,
    name: "help",
    props: ['data'],
    computed: {
        markdownHtmlGenerated: function () {
            let converter = new (window as any).showdown.Converter();
            return converter.makeHtml(this.data);
        },
    }
});