import {Command} from "./Command";
import {StaticHelpers} from "../StaticHelpers";
import * as $ from "jquery";
import {IHistoryCommand} from "../Application";
import {HistoryCommand} from "../poco/HistoryCommand";

export class NewCommand extends Command {

    constructor() {
        super("new");
    }

    async execute(inputText: string, args: string[]): Promise<IHistoryCommand> {
        if (args.length < 3) {
            return new HistoryCommand(inputText, "missing parameters (e.g.: new goblin adrien)", "default-component");
        } else {
            const monsterType = args[1];
            const monsterName = args[2];

            try {
                const result = await $.ajax({
                    contentType: "application/json",
                    method: 'POST',
                    url: `http://${StaticHelpers.server}:${StaticHelpers.port}/api/new`,
                    data: JSON.stringify({"name": monsterName, "blockName": monsterType}),
                });
                return new HistoryCommand(inputText, monsterName + " has been added to the encounter.", "default-component");
            } catch (e) {
                switch (e.status) {
                    case 400 : return new HistoryCommand(inputText, monsterName + " already exists in the encounter.", "default-component");
                    case 404 : return new HistoryCommand(inputText, monsterType + " does not exists.", "default-component");
                    case 500 : return new HistoryCommand(inputText, "Error 500, Something went wrong!", "default-component");
                    default: return null;
                }
            }


        }
    }

}