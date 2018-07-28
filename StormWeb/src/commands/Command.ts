import {ICommand} from "./ICommand";
import {IHistoryCommand} from "../Application";

export abstract class Command implements ICommand {
    private readonly commandName: string;

    protected constructor(commandName: string) {
        this.commandName = commandName;
    }

    abstract async execute(inputText: string, args: string[]): Promise<IHistoryCommand>;

    getCommandName(): string {
        return this.commandName;
    }
}