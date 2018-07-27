import {IHistoryCommand} from "../Application";

export class HistoryCommand implements IHistoryCommand {

    constructor(input: string, output: string, templateName: string){
        this.input = input;
        this.output = output;
        this.templateName = templateName;
    }

    input: string;
    output: any;
    templateName: string;

}