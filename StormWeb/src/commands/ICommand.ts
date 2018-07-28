import {IHistoryCommand} from "../Application";

export interface ICommand {
    execute(inputText: string, args: string[]): Promise<IHistoryCommand>;
    getCommandName(): string;
}