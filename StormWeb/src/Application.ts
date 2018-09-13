import {StaticHelpers} from "./StaticHelpers";
import * as $ from "jquery";
import {EncounterData} from "./engine/Adapters";
import {Component, Prop, Provide, Watch} from "vue-property-decorator";
import Vue from "vue"

export interface IHistoryCommand {
    command: string;
    args: string[],
    output: any;
    templateName: string;
}


@Component
export default class App extends Vue {

    constructor(options){
        super(options);
    }

    user: string = "gm@Storm =>";
    commands: IHistoryCommand[] = [];
    history: string[] = [];
    currentInputValue: string = "";
    positionHistory: number = 0;
    proposals: string[] = [];
    proposalsIndex: number = -1;
    encounter: EncounterData = null;
    isValidCommand: boolean = false;

    mounted() {
        console.log("tototot");
        this.encounterUpdate();
        StaticHelpers.scrollWindow();
        $("#container").show();
    }

    updated() {
        console.log("tototot");
        StaticHelpers.scrollWindow();
    }


    @Watch("positionHistory")
    watchPositionHistory(newPosition: number, oldPosition: number): void {
        let command = this.history[this.history.length - newPosition];
        if (typeof command !== 'undefined') {
            this.currentInputValue = command;
        } else {
            this.currentInputValue = "";
        }
    }

    @Watch("commands")
    watchCommands(): void {
        this.encounterUpdate();
    }

    @Watch("currentInputValue")
    watchCurrentInputValue() {
        this.isValidCommand = StaticHelpers.getCommands().find(f => f === this.currentCommand()) != null;
    }






    proposalsDisplayed() {
        if (this.currentArguments.length <= 1) {
            const inputFilter = this.currentArguments.length === 1 ? this.currentArguments()[0] : this.currentCommand();
            return this.proposals.filter(f => f.startsWith(inputFilter));
        }
        return this.proposals;
    }


    currentCommand() :string {
        const values = this.currentInputValue.trim().split(" ").filter(f => f !== "");
        return values.length > 0 ? values[0].toLowerCase() : "";
    }

    currentArguments() {
        return this.currentInputValue.trim().split(" ").filter(f => f !== "").slice(1);
    }


    onClickProposition(index) {
        this.proposalsIndex = index;
        this.pressEnter();
    }

    onMouseOverProposition(index) {
        this.proposalsIndex = index;
    }

    encounterUpdate() {
        let vue = this;
        vue.encounter = StaticHelpers.engine().getEncounterData();
    }

    pressEnter() {
        if (this.currentCommand() !== "" && this.currentArguments()[0] === "!!") {
            if (this.commands.length > 0) {
                let previousCommand = this.commands[this.commands.length - 1] as IHistoryCommand;
                this.currentInputValue = this.currentCommand() + " " + previousCommand.args.join(" ");
                return;
            } else {
                this.currentInputValue = "";
                return;
            }
        }
        if (this.proposalsIndex === -1) {
            const result = StaticHelpers.eval(this.currentCommand(), this.currentArguments());
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
    }

    arrowPressed(message) {
        const [left, up, right, down] = [37, 38, 39, 40];
        if (this.proposalsDisplayed.length > 0) {
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
                default:
                    break;
            }
        } else {
            if (message.keyCode === up && this.positionHistory < this.history.length) {
                this.positionHistory++;
            } else if (message.keyCode === down && this.positionHistory > 0) {
                this.positionHistory--;
            }
        }
    }

    async invokeAutoComplete(message) {
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