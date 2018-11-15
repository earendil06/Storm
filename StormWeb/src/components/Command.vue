<template>
    <div class="input-line col-md-12">
        <div class="row">
            <div class="pull-left username">-></div>
            <div id="command-result-input" class="pull-left">{{ completeInput }}</div>
        </div>
        <div class="col-md-12">
            <component id="command-result-output" :data-template="command.templateName" :is="command.templateName" :data="command.output"></component>
        </div>
    </div>
</template>

<script>
    import {StaticHelpers} from "../StaticHelpers";
    import Default from "./Default";
    import Block from "./Block";
    import Encounter from "./Encounter";
    import Monster from "./Monster";
    import Navigator from "./Navigator";
    import Markdown from "./Markdown";
    import Error from "./Error";
    import Help from "./Help";

    export default {
        props: ['command', 'user'],
        components: {
            Default,
            Block,
            Monster,
            Encounter,
            Navigator,
            Markdown,
            Error,
            Help
        },
        computed: {
            completeInput: function () {
                return this.command.command + " " + this.command.args.join(" ");
            }
        },

        mounted: function () {
            StaticHelpers.scrollWindow();
            StaticHelpers.hideSpinner();
        }
    }
</script>
