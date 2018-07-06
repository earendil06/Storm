import {StaticHelpers} from "./commands/StaticHelpers";

interface Data {
    user: string;
    commands: string[];
    history: string[];
    currentInputValue: "";
    positionHistory: number;
    proposals: string[];
    proposalsIndex: number;
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
    data: Data;
    watch: Watches;
    methods: Methods;
}