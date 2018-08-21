export interface IHistoryCommand {
    command: string;
    args: string[],
    output: any;
    templateName: string;
}

interface Watches {
    positionHistory(newPosition: number, oldPosition: number): void;
    commands();
}

interface Methods {
    encounterUpdate();
    pressEnter();
    setPositionHistory(message);
    invokeAutoComplete(message);
}

interface Computeds {
    proposalsDisplayed();
}


export interface Application {
    user: string;
    commands: IHistoryCommand[];
    history: string[];
    currentInputValue: string;
    positionHistory: number;
    proposals: string[];
    proposalsIndex: number;

    currentCommand: string;
    currentArguments: string[];

    watch: Watches;
    methods: Methods;
    computed: Computeds

    proposalsDisplayed();
    encounterUpdate();
    executeCommand();
    setPositionHistory(message);
    invokeAutoComplete(message);
}