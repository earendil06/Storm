import {ClearCommand} from "./commands/ClearCommand";
import {BlockCommand} from "./commands/BlockCommand";
import {HelpCommand} from "./commands/HelpCommand";
import {NewCommand} from "./commands/NewCommand";
import {GetMonsterCommand} from "./commands/GetMonsterCommand";
import {GetEncounterDataCommand} from "./commands/GetEncounterDataCommand";
import {RollInitiativeCommand} from "./commands/RollInitiativeCommand";
import {DamageCommand} from "./commands/DamageCommand";
import {GetTurnCommand} from "./commands/GetTurnCommand";
import {ResetCommand} from "./commands/ResetCommand";
import {NextTurnCommand} from "./commands/NextTurnCommand";
import {HealCommand} from "./commands/HealCommand";
import {RemoveCommand} from "./commands/RemoveCommand";
import {SetInitiativeCommand} from "./commands/SetInitiativeCommand";
import {GetBlocksCommand} from "./commands/GetBlocksCommand";
import {GetPlayingMonsterCommand} from "./commands/GetPlayingMonsterCommand";
import {Application} from "./Application";
import * as $ from "jquery";

export class StaticHelpers {
    static hideSpinner(): void {
        document.getElementById("loader-img").style.display = "none";
    }

    static showSpinner(): void {
        document.getElementById("loader-img").style.display = "block";
    }

    static scrollWindow(): void {
        let container = document.getElementById('commandsContainer');
        container.scrollTop = container.scrollHeight;
    }

    static port = 8080;
    static server = StaticHelpers.getQueryVariable("server") === "" ? "localhost" : StaticHelpers.getQueryVariable("server");


    static eval(input: string): void {
        const args = input.trim().split(" ").filter(f => f !== "");
        if (args.length === 0) {
            StaticHelpers.application().commands.push({
                input: input,
                output: "Command does not exists.",
                templateName: "default-component"
            });
        } else {
            const commandName = args[0].toLowerCase();
            let commandFound = StaticHelpers.COMMANDS.find(f => f.getCommandName() === commandName);
            if (typeof commandFound === "undefined") {
                StaticHelpers.application().commands.push({
                    input: input,
                    output: "Command does not exists.",
                    templateName: "default-component"
                });
            } else {
                this.showSpinner();
                commandFound.execute(input, args);
            }
        }
    }

    static autoComplete(): void {
        const propEngine = [
            {
                "name": "",
                "function": "getCommands"
            },
            {
                "name": "block",
                "function": "getBlocks"
            },
            {
                "name": "monster",
                "function": "getMonsters"
            },
            {
                "name": "new",
                "function": "getBlocks"
            }
        ];
        const pointer = StaticHelpers.application().currentInputValue.trim().split(" ")[0];
        let toExecute = propEngine.find(f => f.name === pointer);
        if (toExecute === undefined) {
            console.log("no proposals");
            //app.currentInputValue = "block";
            //autoComplete();
            return;
        }
        if (StaticHelpers.application().proposalsIndex === -1) {
            StaticHelpers.showSpinner();
            this[toExecute.function]();
        }
        if (StaticHelpers.application().proposalsDisplayed.length > 0) {
            StaticHelpers.application().proposalsIndex = (StaticHelpers.application().proposalsIndex + 1) % StaticHelpers.application().proposalsDisplayed.length;
        } else {
            StaticHelpers.application().proposalsIndex = -1;
        }
    }

    static getQueryVariable(variable: string): string {
        const query = window.location.search.substring(1);
        const vars = query.split("&");
        for (let i = 0; i < vars.length; i++) {
            const pair = vars[i].split("=");
            if (pair[0] === variable) {
                return pair[1];
            }
        }
        return "";
    }

    static getCommands() {
        StaticHelpers.application().proposals = StaticHelpers.COMMANDS.map(c => c.getCommandName()).sort();
        StaticHelpers.hideSpinner();
    }

    static getBlocks() {
        (async function () {
            StaticHelpers.application().proposals = await $.ajax({
                contentType: "application/json",
                url: `http://${StaticHelpers.server}:${StaticHelpers.port}/api/blocks`
            });
            StaticHelpers.application().proposalsIndex = (StaticHelpers.application().proposalsIndex + 1) % StaticHelpers.application().proposalsDisplayed.length;
            StaticHelpers.hideSpinner();
        })();
    }

    static getMonsters() {
        (async function () {
            StaticHelpers.application().proposals = await $.ajax({
                contentType: "application/json",
                url: `http://${StaticHelpers.server}:${StaticHelpers.port}/api/data/names`
            });
            StaticHelpers.application().proposalsIndex = (StaticHelpers.application().proposalsIndex + 1) % StaticHelpers.application().proposalsDisplayed.length;
            StaticHelpers.hideSpinner();
        })();
    }

    static application(): Application {
        return (window as any).app as Application;
    }

    static COMMANDS = [
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
        new GetBlocksCommand()
    ];
}