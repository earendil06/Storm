import {IHistoryCommand} from "../Application";

export interface ICommand {
    execute(args: string[]): Promise<IHistoryCommand>;
    getCommandName(): string;
}