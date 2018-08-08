import Vue from "vue";
import CommandComponent from "../components/Command";
import StaticEncounterComponent from "../components/StaticEncounter";
import {StaticHelpers} from "../StaticHelpers";
import * as $ from "jquery";
import {Application, IHistoryCommand} from "../Application";
import ClearCommand from "./commands/ClearCommand";
import Engine from "../engine/Engine";

export default class Term {
    static main() {
        (window as any).engine = new Engine();
        (window as any).app = new Vue({

            el: '#container',
            data: {
                user: "gm@Storm =>",
                commands: [],
                history: [],
                currentInputValue: "",
                positionHistory: 0,
                proposals: [],
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
                    vue.encounter = StaticHelpers.engine().getEncounterData()
                    /*$.ajax({
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
                    });*/
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
                            this.currentInputValue = this.proposalsDisplayed[this.proposalsIndex];
                        } else {
                            this.currentInputValue = this.currentCommand + " " + this.proposalsDisplayed[this.proposalsIndex];
                        }

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
                invokeAutoComplete: async function (message) {
                    message.preventDefault();
                    const propEngine = [
                        {
                            "name": "root",
                            "function": "getCommands"
                        },
                        {
                            "name": "block",
                            "function": "getBlocks"
                        },
                        {
                            "name": "monster",
                            "function": "getMonsters"
                        },
                        {
                            "name": "new",
                            "function": "getBlocks"
                        }
                    ];

                    let pointer = this.currentArguments.length === 0 ? "root" : this.currentCommand;
                    let toExecute = propEngine.find(f => f.name === pointer);
                    if (toExecute === undefined) {
                        return;
                    }
                    if (this.proposalsIndex === -1) {
                        StaticHelpers.showSpinner();
                        this.proposals = await StaticHelpers[toExecute.function]();
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
                new ClearCommand().execute(null);
                return false;
            }
            return true;
        });
    }
}