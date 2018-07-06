import {ICommand} from "./ICommand";

export abstract class Command implements ICommand {
    private readonly commandName: string;

    protected constructor(commandName: string) {
        this.commandName = commandName;
    }

    abstract execute(inputText: string, args: string[]): void;

    getCommandName(): string {
        return this.commandName;
    }
}