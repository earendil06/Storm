import ICommand from "./ICommand";
import {IHistoryCommand} from "../../Application";

export default abstract class Command implements ICommand {
    private readonly commandName: string;

    protected constructor(commandName: string) {
        this.commandName = commandName;
    }

    abstract async execute(args: string[]): Promise<IHistoryCommand>;

    getCommandName(): string {
        return this.commandName;
    }
}