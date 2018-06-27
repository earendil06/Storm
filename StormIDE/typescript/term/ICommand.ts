export interface ICommand {
    execute(inputText: string, args: Array<string>): void;
}