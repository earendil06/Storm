import {Command} from "./Command";
import {StaticHelpers} from "../StaticHelpers";
import * as $ from "jquery";
import {IHistoryCommand} from "../Application";
import {HistoryCommand} from "../poco/HistoryCommand";

export class SetInitiativeCommand extends Command {

    constructor(){
        super("set-init");
    }

    async execute(inputText: string, args: string[]): Promise<IHistoryCommand> {
        if (args.length < 3) {
            return new HistoryCommand(inputText, "missing parameters (e.g: set-init adrien 12)", "default-component");
        } else {
            const name = args[1];
            const value = args[2];

            try {
                const result = await $.ajax({
                    contentType: "application/json",
                    method: 'PUT',
                    url: `http://${StaticHelpers.server}:${StaticHelpers.port}/api/set`,
                    data: JSON.stringify({"name": name, "value": value}),
                });
                return new HistoryCommand(inputText, name + " initiative has been set to " + value + ".", "default-component");
            } catch (e) {
                switch (e.status) {
                    case 400: return new HistoryCommand(inputText, 'The request should be like "set-init adrien 12".', "default-component");
                    case 404: return new HistoryCommand(inputText, name + " does not exists in the encounter.", "default-component");
                    case 500 : return new HistoryCommand(inputText, "Error 500, Something went wrong!", "default-component");
                    default: return null;
                }
            }
        }
    }
}