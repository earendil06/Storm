export interface ICommand {
    execute(inputText: string, args: string[]): void;
    getCommandName(): string;
}