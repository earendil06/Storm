import {IHistoryCommand} from "../Application";

export default interface ICommand {
    execute(args: string[]): Promise<IHistoryCommand>;
    getCommandName(): string;
}