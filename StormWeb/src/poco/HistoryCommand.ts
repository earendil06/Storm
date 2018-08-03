import {IHistoryCommand} from "../Application";

export class HistoryCommand implements IHistoryCommand {

    constructor(command: string, args : string[], output: string, templateName: string){
        this.command = command;
        this.output = output;
        this.args = args;
        this.templateName = templateName;
    }

    command: string;
    args: string[];
    output: any;
    templateName: string;

}