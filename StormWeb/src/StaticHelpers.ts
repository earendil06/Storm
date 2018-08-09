import ClearCommand from "./term/commands/ClearCommand";
import {BlockCommand} from "./term/commands/BlockCommand";
import HelpCommand from "./term/commands/HelpCommand";
import {NewCommand} from "./term/commands/NewCommand";
import {GetMonsterCommand} from "./term/commands/GetMonsterCommand";
import {GetEncounterDataCommand} from "./term/commands/GetEncounterDataCommand";
import {RollInitiativeCommand} from "./term/commands/RollInitiativeCommand";
import {DamageCommand} from "./term/commands/DamageCommand";
import {GetTurnCommand} from "./term/commands/GetTurnCommand";
import {ResetCommand} from "./term/commands/ResetCommand";
import {NextTurnCommand} from "./term/commands/NextTurnCommand";
import {HealCommand} from "./term/commands/HealCommand";
import {RemoveCommand} from "./term/commands/RemoveCommand";
import {SetInitiativeCommand} from "./term/commands/SetInitiativeCommand";
import {GetBlocksCommand} from "./term/commands/GetBlocksCommand";
import {GetPlayingMonsterCommand} from "./term/commands/GetPlayingMonsterCommand";
import {Application} from "./Application";
import * as $ from "jquery";
import {ExportEncounterCommand} from "./term/commands/ExportEncounterCommand";
import {LoadEncounterCommand} from "./term/commands/LoadEncounterCommand";
import ICommand from "./term/commands/ICommand";
import Engine from "./engine/Engine";
import LocalAccessor from "./resources/LocalAccessor";

export class StaticHelpers {
    private static accessor = new LocalAccessor();

    static hideSpinner(): void {
        document.getElementById("loader-img").style.display = "none";
    }

    static showSpinner(): void {
        document.getElementById("loader-img").style.display = "block";
    }

    static scrollWindow(): void {
        let container = document.getElementById('commandsContainer');
        if (container != null) {
            container.scrollTop = container.scrollHeight;
        }
    }

    static port = 8080;
    static server = StaticHelpers.getQueryVariable("server") === "" ? "localhost" : StaticHelpers.getQueryVariable("server");


    static async eval(command: string, additionalArgs: string[]): Promise<any> {
        if (command === "") {
            StaticHelpers.application().commands.push({
                command: command,
                args: additionalArgs,
                output: "Command does not exists.",
                templateName: "default-component"
            });
        } else {
            let commandFound = StaticHelpers.COMMANDS().find(f => f.getCommandName() === command) as ICommand;
            if (typeof commandFound === "undefined") {
                StaticHelpers.application().commands.push({
                    command: command,
                    args: additionalArgs,
                    output: "Command does not exists.",
                    templateName: "default-component"
                });
            } else {
                StaticHelpers.showSpinner();
                const res = await commandFound.execute(additionalArgs);
                if (res != null) {
                    StaticHelpers.application().commands.push(res);
                }
                StaticHelpers.hideSpinner();
            }
        }
    }

    static getQueryVariable(variable: string): string {
        const query = (window as any).location.search.substring(1);
        const vars = query.split("&");
        for (let i = 0; i < vars.length; i++) {
            const pair = vars[i].split("=");
            if (pair[0] === variable) {
                return pair[1];
            }
        }
        return "";
    }

    static getCommands(): string[] {
        return StaticHelpers.COMMANDS().map(c => c.getCommandName()).sort();
    }

    static async getBlocks() {
        return await this.accessor.getBlockNameList();
    }

    static getAccessor() {
        return this.accessor;
    }

    static async getMonsters() {
        return await $.ajax({
            contentType: "application/json",
            url: `http://${StaticHelpers.server}:${StaticHelpers.port}/api/data/names`
        });

    }

    static application(): Application {
        return (window as any).app as Application;
    }

    static engine(): Engine {
        return (window as any).engine as Engine;
    }

    static COMMANDS() {
        return [
            new ClearCommand(),
            new HelpCommand(),
            new BlockCommand(),
            new NewCommand(),
            new GetMonsterCommand(),
            new GetEncounterDataCommand(),
            new GetPlayingMonsterCommand(),
            new RollInitiativeCommand(),
            new DamageCommand(),
            new HealCommand(),
            new NextTurnCommand(),
            new ResetCommand(),
            new GetTurnCommand(),
            new RemoveCommand(),
            new SetInitiativeCommand(),
            new GetBlocksCommand(),
            new ExportEncounterCommand(),
            new LoadEncounterCommand()
        ];
    }
}