import Vue from "vue";
import CommandComponent from "../components/Command";
import StaticEncounterComponent from "../components/StaticEncounter";
import {StaticHelpers} from "../StaticHelpers";
import * as $ from "jquery";
import App, {IHistoryCommand} from "../Application";
import Engine from "../engine/Engine";

export default class Term {
    static main() {
        (window as any).engine = new Engine();
        (window as any).app = /* new Vue({
            el: '#container',
            data: {
                user: "gm@Storm =>",
                commands: [],
                history: [],
                currentInputValue: "",
                positionHistory: 0,
                proposals: [],
                proposalsIndex: -1,
                encounter: "",
                isValidCommand: false
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
                },
                currentInputValue: function () {
                    this.isValidCommand = StaticHelpers.getCommands().find(f => f === this.currentCommand) != null;
                }
            },
            mounted: function () {
                this.encounterUpdate();
                StaticHelpers.scrollWindow();
                $("#container").show();
            },
            updated: function () {
                StaticHelpers.scrollWindow()
            },
            computed: {
                proposalsDisplayed: function () {
                    if (this.currentArguments.length <= 1) {
                        const inputFilter = this.currentArguments.length === 1 ? this.currentArguments[0] : this.currentCommand;
                        return this.proposals.filter(f => f.startsWith(inputFilter));
                    }
                    return this.proposals;
                },
                currentCommand: function () {
                    const values = this.currentInputValue.trim().split(" ").filter(f => f !== "");
                    return values.length > 0 ? values[0].toLowerCase() : "";
                },
                currentArguments: function() {
                    return this.currentInputValue.trim().split(" ").filter(f => f !== "").slice(1);
                }
            },
            methods: {
                onClickProposition: function (index) {
                    this.proposalsIndex = index;
                    this.pressEnter();
                },
                onMouseOverProposition: function (index) {
                    this.proposalsIndex = index;
                },
                encounterUpdate: function () {
                    let vue = this;
                    vue.encounter = StaticHelpers.engine().getEncounterData();
                },
                pressEnter: function () {
                    if (this.currentCommand !== "" && this.currentArguments[0] === "!!") {
                        if (this.commands.length > 0) {
                            let previousCommand = this.commands[this.commands.length - 1] as IHistoryCommand;
                            this.currentInputValue = this.currentCommand + " " + previousCommand.args.join(" ");
                            return;
                        } else {
                            this.currentInputValue = "";
                            return;
                        }
                    }
                    if (this.proposalsIndex === -1) {
                        const result = StaticHelpers.eval(this.currentCommand, this.currentArguments);
                        if (this.currentInputValue !== "" && this.currentInputValue !== this.history[this.history.length - 1]) {
                            this.history.push(this.currentInputValue);
                        }
                        this.currentInputValue = "";
                        this.positionHistory = 0;

                    } else {
                        if (this.currentArguments.length === 0) {
                            this.currentInputValue = this.proposalsDisplayed[this.proposalsIndex] + " ";
                        } else {
                            this.currentInputValue = this.currentCommand + " " + this.proposalsDisplayed[this.proposalsIndex] + " ";
                        }

                    }
                    this.proposalsIndex = -1;
                    this.proposals = [];
                    this.encounterUpdate();
                    $("#inputLine")[0].focus();
                },
                arrowPressed: function (message) {
                    const [left, up, right, down] = [37, 38, 39, 40];
                    if (this.proposalsDisplayed.length > 0){
                        switch (message.keyCode) {
                            case left:
                                this.proposalsIndex = Math.max(this.proposalsIndex - 1, 0);
                                break;
                            case right:
                                this.proposalsIndex = Math.min(this.proposalsIndex + 1, this.proposalsDisplayed.length - 1);
                                break;
                            case up:
                                this.proposalsIndex = Math.max(this.proposalsIndex - 4, 0);
                                break;
                            case down:
                                this.proposalsIndex = Math.min(this.proposalsIndex + 4, this.proposalsDisplayed.length - 1);
                                break;
                            default: break;
                        }
                    } else {
                        if (message.keyCode === up && this.positionHistory < this.history.length) {
                            this.positionHistory++;
                        } else if (message.keyCode === down && this.positionHistory > 0) {
                            this.positionHistory--;
                        }
                    }
                },
                invokeAutoComplete: async function (message) {
                    message.preventDefault();

                    let toExecute = StaticHelpers.autocompleteParameters()
                        .find(f => f.entryPoint.test(this.currentInputValue));
                    if (toExecute === undefined) {
                        return;
                    }
                    if (this.proposalsIndex === -1) {
                        StaticHelpers.showSpinner();
                        this.proposals = await toExecute.callback();
                        this.proposalsIndex = (this.proposalsIndex + 1) % this.proposalsDisplayed.length;
                        StaticHelpers.hideSpinner();
                        if (this.proposalsDisplayed.length === 1) {
                            this.pressEnter();
                        }
                        return;
                    }

                    if (this.proposalsDisplayed.length > 0) {
                        this.proposalsIndex = (this.proposalsIndex + 1) % this.proposalsDisplayed.length;
                    } else {
                        this.proposalsIndex = -1;
                    }
                }
            }
        }) as Application;*/ new App({
            el: '#container',
            components: {
                CommandComponent, StaticEncounterComponent
            }
        });

        $(document as any).keydown(function (e) {
            const codes = [9, 13, 37, 38, 39, 40];
            if (codes.indexOf(e.which) === -1) {
                StaticHelpers.application().proposals = [];
                StaticHelpers.application().proposalsIndex = -1;
            }
            return true;
        });
    }
}