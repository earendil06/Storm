import ICommand from "./ICommand";
import {IHistoryCommand} from "../../Application";
import LocalAccessor from "../../resources/LocalAccessor";
import Engine from "../../engine/Engine";

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