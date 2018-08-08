import Command from "./Command";
import {StaticHelpers} from "../../StaticHelpers";
import * as $ from "jquery";
import {IHistoryCommand} from "../../Application";
import {HistoryCommand} from "../../poco/HistoryCommand";
import LocalAccessor from "../../resources/LocalAccessor";

export class NewCommand extends Command {

    constructor() {
        super("new");
    }

    async execute(args: string[]): Promise<IHistoryCommand> {
        if (args.length < 2) {
            return new HistoryCommand(this.getCommandName(), args, "missing parameters (e.g.: new goblin adrien)", "default-component");
        } else {
            const monsterType = args[0];
            const monsterName = args[1];

            try {
                const block = await new LocalAccessor().getBlockByName(monsterType);
                const result = StaticHelpers.engine().newMonster(monsterName, block);
                /*const result = await $.ajax({
                    contentType: "application/json",
                    method: 'POST',
                    url: `http://${StaticHelpers.server}:${StaticHelpers.port}/api/new`,
                    data: JSON.stringify({"name": monsterName, "blockName": monsterType}),
                });*/
                return new HistoryCommand(this.getCommandName(), args, monsterName + " has been added to the encounter.", "default-component");
            } catch (e) {
                switch (e.status) {
                    case 400 : return new HistoryCommand(this.getCommandName(), args, monsterName + " already exists in the encounter.", "default-component");
                    case 404 : return new HistoryCommand(this.getCommandName(), args, monsterType + " does not exists.", "default-component");
                    case 500 : return new HistoryCommand(this.getCommandName(), args, "Error 500, Something went wrong!", "default-component");
                    default: return null;
                }
            }


        }
    }

}