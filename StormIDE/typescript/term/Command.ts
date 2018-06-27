import {ICommand} from "./ICommand";

export abstract class Command implements ICommand {
    private commandName: string;

    protected constructor(commandName: string) {
        this.commandName = commandName;
    }

    abstract execute(inputText: string, args: Array<string>): void;
}