import {StaticHelpers} from "./StaticHelpers";
import * as $ from "jquery";
import {EncounterData} from "./engine/Adapters";
import {Component, Watch} from "vue-property-decorator";
import Vue from "vue"
import CommandComponent from "./components/Command";
import StaticEncounterComponent from "./components/StaticEncounter";
import Optional from "typescript-optional";
import {AppEngine} from "./AppEngine";
import {ArrowDirection} from "./ArrowDirection";

export interface IHistoryCommand {
    command: string;
    args: string[],
    output: any;
    templateName: string;
}

@Component({
    mounted(): void {
        this.encounterUpdate();
        StaticHelpers.scrollWindow();
        $("#container").show();
    },

    updated(): void {
        StaticHelpers.scrollWindow();
    },
    components: {
        CommandComponent, StaticEncounterComponent
    }
})
export default class App extends Vue {

    private appEngine = new AppEngine();

    constructor(options) {
        super(options);
    }

    user: string = "gm@Storm =>";
    commands: IHistoryCommand[] = [];
    history: string[] = [];
    currentInputValue: string = "";
    positionHistory: number = 0;
    proposals: string[] = [];
    proposalsIndex: Optional<number> = Optional.empty();
    encounter: EncounterData = this.encounterUpdate();


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

    get proposalsDisplayed(): string[] {
        if (this.currentArguments.length <= 1) {
            const inputFilter = this.currentArguments.length === 1 ? this.currentArguments[0] : this.currentCommand.orElse("");
            return this.proposals.filter(f => f.startsWith(inputFilter));
        }
        return this.proposals;
    }


    get currentCommand(): Optional<string> {
        const values = this.currentInputValue.trim().split(" ").filter(f => f !== "");
        return values.length > 0 ? Optional.of(values[0].toLowerCase()) : Optional.empty();
    }

    get currentArguments(): string[] {
        return this.currentInputValue.trim().split(" ").filter(f => f !== "").slice(1);
    }


    async onClickProposition(index: number) {
        this.proposalsIndex = Optional.of(index);
        await this.pressEnter();
    }

    onMouseOverProposition(index: number) {
        this.proposalsIndex = Optional.of(index);
    }

    encounterUpdate(): EncounterData {
        return this.encounter = StaticHelpers.engine().getEncounterData();
    }


    async pressEnter(): Promise<void> {
        if (!this.currentCommand.isEmpty && this.currentArguments[0] === "!!") {
            if (this.commands.length > 0) {
                let previousCommand = this.commands[this.commands.length - 1] as IHistoryCommand;
                this.currentInputValue = this.currentCommand.get() + " " + previousCommand.args.join(" ");
                return;
            } else {
                this.currentInputValue = "";
                return;
            }
        }

        this.proposalsIndex.ifPresentOrElse((value) => {
            if (this.currentArguments.length === 0) {
                this.currentInputValue = this.proposalsDisplayed[value] + " ";
            } else {
                this.currentInputValue = this.currentCommand.get() + " " + this.proposalsDisplayed[value] + " ";
            }
        }, async () => {
            StaticHelpers.showSpinner();
            const result = await StaticHelpers.eval(this.currentCommand.orElse(""), this.currentArguments);
            this.commands.push(result);
            StaticHelpers.hideSpinner();

            if (this.currentInputValue !== "" && this.currentInputValue !== this.history[this.history.length - 1]) {
                this.history.push(this.currentInputValue);
            }
            this.currentInputValue = "";
            this.positionHistory = 0;
        });


        this.proposalsIndex = Optional.empty();
        this.proposals = [];
        this.encounterUpdate();
        StaticHelpers.scrollWindow();
        $("#inputLine")[0].focus();
    }

    arrowPressed(message) {
        const [left, up, right, down] = [37, 38, 39, 40];

        this.proposalsIndex.ifPresentOrElse((value) => {
            switch (message.keyCode) {
                case left:
                    this.proposalsIndex = Optional.of(Math.max(value - 1, 0));
                    break;
                case right:
                    this.proposalsIndex = Optional.of(Math.min(value + 1, this.proposalsDisplayed.length - 1));
                    break;
                case up:
                    this.proposalsIndex = Optional.of(Math.max(value - 4, 0));
                    break;
                case down:
                    this.proposalsIndex = Optional.of(Math.min(value + 4, this.proposalsDisplayed.length - 1));
                    break;
                default:
                    break;
            }
        }, () => {
            if (message.keyCode === up) {
                this.positionHistory = this.appEngine.computeHistoryPosition(this.history, this.positionHistory, ArrowDirection.Up);
            } else if (message.keyCode === down) {
                this.positionHistory = this.appEngine.computeHistoryPosition(this.history, this.positionHistory, ArrowDirection.Down);
            }
        });
    }

    private async getAutocompleteResults(): Promise<[Optional<number>, string[]]> {
        const toExecuteOption = Optional.ofNullable(StaticHelpers.autocompleteParameters().find(f => f.entryPoint.test(this.currentInputValue)));

        let proposalsIndex: Optional<number> = Optional.empty();
        let proposals: string[] = [];

        if (toExecuteOption.isEmpty) {
            return [proposalsIndex, proposals];
        }

        const toExecute = toExecuteOption.get();

        if (this.proposalsIndex.isEmpty) {
            return [Optional.of(0), await toExecute.callback()];
        }

        if (this.proposalsDisplayed.length > 0) {
            proposals = this.proposals;
            proposalsIndex = Optional.of((this.proposalsIndex.get() + 1) % this.proposalsDisplayed.length);
        } else {
            proposals = [];
            proposalsIndex = Optional.empty();
        }


        return [proposalsIndex, proposals];
    }


    async invokeAutoComplete(message) {
        message.preventDefault();

        StaticHelpers.showSpinner();

        const tuple = await this.getAutocompleteResults();
        this.proposalsIndex = tuple[0];
        this.proposals = tuple[1];

        if (this.proposalsDisplayed.length === 1) {
            await this.pressEnter();
        }

        StaticHelpers.hideSpinner();


    }
}