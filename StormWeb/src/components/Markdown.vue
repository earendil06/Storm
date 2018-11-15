<template>
    <div v-html="markdownHtmlGenerated"></div>
</template>

<script>
    export default {
        props: ['data'],
        computed: {
            markdownHtmlGenerated: function () {
                const showdown = require('showdown');
                let converter = new showdown.Converter();
                return converter.makeHtml(this.data);
            }
        }
    }
</script>
