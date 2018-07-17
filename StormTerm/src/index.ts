import Vue from "vue";
import {StaticHelpers} from "./commands/StaticHelpers";
import {ClearCommand} from "./commands/ClearCommand";

import CommandComponent from "./components/Command";
import {Application} from "./Application";
import StaticEncounterComponent from "./components/StaticEncounter";
import * as $ from "jquery";

let v = new Vue({

    el: '#container',
    data: {
        user: "gm@Storm =>",
        commands: [],
        history: [],
        currentInputValue: "",
        positionHistory: 0,
        proposals: "",
        proposalsIndex: -1,
        encounter: ""
    },
    components: {
        CommandComponent, StaticEncounterComponent
    },
    watch: {
        positionHistory(newPosition: number, oldPosition: number): void {
            let command = this.history[this.history.length - newPosition];
            if (typeof command !== 'undefined') {
                this.currentInputValue = command;
            } else {
                this.currentInputValue = "";
            }
        },
        commands: function () {
            this.encounterUpdate();
        }
    },
    mounted: function () {
        this.encounterUpdate();
        window.scrollTo(0, document.body.scrollHeight);
    },
    updated: function () {
        window.scrollTo(0, document.body.scrollHeight);
    },
    methods: {
        encounterUpdate: function () {
            let vue = this;
            $.ajax({
                contentType: "application/json",
                url: `http://${StaticHelpers.server}:${StaticHelpers.port}/api/data`,
                statusCode: {
                    200: function (data) {
                        const monsters = data.monsters;
                        monsters.forEach(m => {
                            m.ac = m.block.stats.find(f => f.statType === "ac").statValue.formulae;
                            m.blockName = m.block.name[0].toUpperCase() + m.block.name.slice(1)
                        });
                        vue.encounter = data;
                    }
                }
            });
        },
        executeCommand: function () {
            if (this.currentInputValue !== "" && this.currentInputValue !== this.history[this.history.length - 1]) {
                this.history.push(this.currentInputValue);
            }
            if (this.proposalsIndex === -1) {
                StaticHelpers.eval(this.currentInputValue);
                this.currentInputValue = "";
                this.positionHistory = 0;
            } else {
                let inputArray = this.currentInputValue.trim().split(" ");
                inputArray.push(this.proposals[this.proposalsIndex]);
                this.currentInputValue = inputArray.filter(token => token !== "").join(" ");
            }
            this.proposalsIndex = -1;
            this.proposals = [];
            this.encounterUpdate()
        },
        setPositionHistory: function (message) {
            const downCode = 40;
            const upCode = 38;
            if (message.keyCode === upCode && this.positionHistory < this.history.length) {
                this.positionHistory++;
            } else if (message.keyCode === downCode && this.positionHistory > 0) {
                this.positionHistory--;
            }
        },
        invokeAutoComplete: function (message) {
            message.preventDefault();
            StaticHelpers.autoComplete();
        }
    }
}) as Application;

(window as any).app = v;

$(document as any).keydown(function (e) {
    const tabCode = 9;
    const enterCode = 13;
    if (e.which !== tabCode && e.which !== enterCode) {
        (window as any).app.proposals = [];
        (window as any).app.proposalsIndex = -1;
    }
    const lKey = 76;
    if (e.ctrlKey && (e.which === lKey)) {
        e.preventDefault();
        e.stopPropagation();
        new ClearCommand().execute(null, null);
        return false;
    }
    return true;
});
//(window as any).main = Main;
