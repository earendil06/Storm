export interface IHistoryCommand {
    command: string;
    args: string[],
    output: any;
    templateName: string;
}