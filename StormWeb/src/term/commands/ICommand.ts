import {IHistoryCommand} from "../../IHistoryCommand";

export default interface ICommand {
    execute(args: string[]): Promise<IHistoryCommand>;
    getCommandName(): string;
}