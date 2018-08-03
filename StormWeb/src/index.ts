import Vue from "vue";
import {StaticHelpers} from "./StaticHelpers";
import {ClearCommand} from "./commands/ClearCommand";

import CommandComponent from "./components/Command";
import {Application} from "./Application";
import StaticEncounterComponent from "./components/StaticEncounter";
import BlockComponent from "./components/Block";
import * as $ from "jquery";

if ($("#container").length > 0) {
    (window as any).app = new Vue({

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
            StaticHelpers.scrollWindow()
        },
        updated: function () {
            StaticHelpers.scrollWindow()
        },
        computed: {
            proposalsDisplayed: function () {
                if (this.currentArguments.length === 1) {
                    return this.proposals.filter(f => f.startsWith(this.currentArguments[0]));
                }
                return this.proposals;
            },
            currentCommand: function () {
                const values = this.currentInputValue.trim().split(" ").filter(f => f !== "");
                return values > 0 ? values[0].toLowerCase() : "";
            },
            currentArguments: function() {
                return this.currentInputValue.trim().split(" ").filter(f => f !== "").slice(1);
            }
        },
        methods: {
            onClickProposition: function (index) {
                this.proposalsIndex = index;
                this.executeCommand();
            },
            onMouseOverProposition: function (index) {
                this.proposalsIndex = index;
            },
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
                let inputArray = this.currentInputValue.trim().split(" ").filter(f => f !== "");
                if (inputArray.length > 0 && inputArray[inputArray.length - 1] === "!$") {
                    if (this.history.length > 0) {
                        let previousCommand = this.history[this.history.length - 1];
                        let previousArgs = previousCommand.trim().split(" ").filter(f => f !== "").slice(1).join(" ");
                        this.currentInputValue = inputArray[0] + " " + previousArgs;
                        return;
                    } else {
                        this.currentInputValue = "";
                        return;
                    }
                }
                if (this.currentInputValue !== "" && this.currentInputValue !== this.history[this.history.length - 1]) {
                    this.history.push(this.currentInputValue);
                }
                if (this.proposalsIndex === -1) {
                    StaticHelpers.eval(this.currentCommand, this.currentArguments);
                    this.currentInputValue = "";
                    this.positionHistory = 0;

                } else {
                    let inputArray = this.currentInputValue.trim().split(" ").filter(f => f !== "");
                    if (inputArray.length === 2) {
                        inputArray.splice(-1, 1);
                    }
                    inputArray.push(this.proposalsDisplayed[this.proposalsIndex]);
                    this.currentInputValue = inputArray.filter(token => token !== "").join(" ");
                }
                this.proposalsIndex = -1;
                this.proposals = [];
                this.encounterUpdate();
                document.getElementById("inputLine").focus()
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
    $(document as any).keydown(function (e) {
        const tabCode = 9;
        const enterCode = 13;
        if (e.which !== tabCode && e.which !== enterCode) {
            StaticHelpers.application().proposals = [];
            StaticHelpers.application().proposalsIndex = -1;
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
} else {
    (window as any).createVue = function(data) {
        (window as any).ideBlockApplication = new Vue({
            el: '#ideBlock',
            data: {
                currentStorm: data
            },
            components: {
                BlockComponent
            }
        });
    }



}



