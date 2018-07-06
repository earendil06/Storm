import {StaticHelpers} from "./commands/StaticHelpers";

interface Data {
    user: string;
    commands: HistoryCommand[];
    history: string[];
    currentInputValue: "";
    positionHistory: number;
    proposals: string[];
    proposalsIndex: number;
}

interface HistoryCommand {
    input: string;
    output: any;
    templateName: string;
}

interface Watches {
    positionHistory(newPosition: number, oldPosition: number): void;
}

interface Methods {
    executeCommand(message);

    setPositionHistory(message);

    invokeAutoComplete(message);
}


export interface Application {
    user: string;
    commands: HistoryCommand[];
    history: string[];
    currentInputValue: "";
    positionHistory: number;
    proposals: string[];
    proposalsIndex: number;

    watch: Watches;
    methods: Methods;
}