import {StaticHelpers} from "./StaticHelpers";
import * as $ from "jquery";
import {EncounterData} from "./engine/Adapters";
import {Component, Watch} from "vue-property-decorator";
import Vue from "vue"
import CommandComponent from "./components/Command";
import StaticEncounterComponent from "./components/StaticEncounter";
import Optional from "typescript-optional";
import {AppEngine} from "./AppEngine";

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

    constructor(options: any) {
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
        return this.appEngine.computeProposalsDisplayed(this.proposals, this.currentInputValue);
    }

    get currentCommand(): Optional<string> {
        return this.appEngine.computeCurrentCommand(this.currentInputValue);
    }

    get currentArguments(): string[] {
        return this.appEngine.computeCurrentArguments(this.currentInputValue);
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
            this.currentInputValue = this.appEngine.transformInputBangBang(this.currentInputValue, Optional.ofNullable(this.commands[this.commands.length - 1]));
            return;
        }

        if (this.proposalsIndex.isEmpty) {
            StaticHelpers.showSpinner();
            const result = await StaticHelpers.eval(this.currentCommand.orElse(""), this.currentArguments);

            this.commands.push(result);

            StaticHelpers.hideSpinner();


            if (this.currentInputValue !== "" && this.currentInputValue !== this.history[this.history.length - 1]) {
                this.history.push(this.currentInputValue);
            }
            this.currentInputValue = "";
            this.positionHistory = 0;

        } else {
            this.currentInputValue = this.appEngine.transformInputAutocomplete(this.currentInputValue, this.proposalsDisplayed[this.proposalsIndex.get()]);
        }


        this.proposalsIndex = Optional.empty();
        this.proposals = [];
        this.encounterUpdate();
        StaticHelpers.scrollWindow();
        $("#inputLine")[0].focus();
    }

    pressArrow(message: KeyboardEvent) {
        this.proposalsIndex.ifPresentOrElse((value) => {
            this.proposalsIndex = Optional.of(this.appEngine.computeProposalsIndexWithArrow(value, this.proposalsDisplayed, message.keyCode));
        }, () => {
            this.positionHistory = this.appEngine.computeHistoryPosition(this.history, this.positionHistory, message.keyCode);
        });
    }

    async pressTab(message: Event) {
        message.preventDefault();

        StaticHelpers.showSpinner();
        const toExecuteOption = this.appEngine.findAutocompleteParameters(this.currentInputValue);

        if (this.proposals.length === 0) {
            this.proposals = await this.appEngine.computeProposals(toExecuteOption);
        }
        this.proposalsIndex = this.appEngine.computeProposalsIndexWithTab(this.proposalsIndex, this.proposalsDisplayed);

        if (this.proposalsDisplayed.length === 1) {
            await this.pressEnter();
        }

        StaticHelpers.hideSpinner();
    }
}