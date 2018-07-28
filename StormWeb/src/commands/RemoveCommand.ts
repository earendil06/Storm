import {Command} from "./Command";
import {StaticHelpers} from "../StaticHelpers";
import * as $ from "jquery";
import {IHistoryCommand} from "../Application";
import {HistoryCommand} from "../poco/HistoryCommand";

export class RemoveCommand extends Command{

    constructor() {
        super("remove");
    }

    async execute(inputText: string, args: string[]): Promise<IHistoryCommand> {
        if (args.length < 2) {
            return new HistoryCommand(inputText, "missing parameter (e.g.: remove adrien)", "default-component");
        } else {
            const monsterName = args[1];
            try {
                const result = await $.ajax({
                    contentType: "application/json",
                    method: 'DELETE',
                    url: `http://${StaticHelpers.server}:${StaticHelpers.port}/api/remove/` + monsterName
                });
                return new HistoryCommand(inputText, monsterName + " has been removed from the encounter.", "default-component");
            } catch (e) {
                switch (e.status) {
                    case 404 : return new HistoryCommand(inputText, monsterName + " does not exists in the encounter.", "default-component");
                    case 500 : return new HistoryCommand(inputText, "Error 500, Something went wrong!", "default-component");
                    default : return null;
                }
            }
        }
    }

}