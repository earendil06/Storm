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
import {ExportEncounterCommand} from "./term/commands/ExportEncounterCommand";
import {LoadEncounterCommand} from "./term/commands/LoadEncounterCommand";
import ICommand from "./term/commands/ICommand";
import Engine from "./engine/Engine";
import LocalAccessor from "./resources/LocalAccessor";
import IdeCommand from "./term/commands/IdeCommand";
import {ExportBlocksCommand} from "./term/commands/ExportBlocks";
import {LoadBlocksCommand} from "./term/commands/LoadBlocksCommand";
import {DeleteBlockCommand} from "./term/commands/DeleteBlockCommand";
import HomeCommand from "./term/commands/HomeCommand";
import AutocompleteParameter from "./poco/AutocompleteParameter";

export class StaticHelpers {
    private static accessor = new LocalAccessor();

    static hideSpinner(): void {
        document.getElementById("loader-img").style.display = "none";
    }

    static showSpinner(): void {
        document.getElementById("loader-img").style.display = "block";
    }

    static scrollWindow(): void {
        let container = document.getElementById('inputLine');
        if (container != null) {
            container.scrollIntoView();
        }
    }

    static async eval(command: string, additionalArgs: string[]): Promise<any> {
        if (command === "") {
            StaticHelpers.application().commands.push({
                command: command,
                args: additionalArgs,
                output: "Command does not exists.",
                templateName: "error-component"
            });
        } else {
            let commandFound = StaticHelpers.COMMANDS().find(f => f.getCommandName() === command) as ICommand;
            if (typeof commandFound === "undefined") {
                StaticHelpers.application().commands.push({
                    command: command,
                    args: additionalArgs,
                    output: "Command does not exists.",
                    templateName: "error-component"
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
        StaticHelpers.scrollWindow();
    }

    static getCommands(): string[] {
        return StaticHelpers.COMMANDS().map(c => c.getCommandName()).sort();
    }

    static async getBlocks(): Promise<string[]> {
        return await StaticHelpers.accessor.getBlockNameList();
    }

    static getAccessor() {
        return StaticHelpers.accessor;
    }

    static getMonsters(): string[] {
        return StaticHelpers.engine().getEncounterData().monsters.map(m => m.name);
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
            new LoadEncounterCommand(),
            new ExportBlocksCommand(),
            new LoadBlocksCommand(),
            new IdeCommand(),
            new HomeCommand(),
            new DeleteBlockCommand()
        ];
    }

    static autocompleteParameters(): Array<AutocompleteParameter> {
        return [
            new AutocompleteParameter(new RegExp("^[a-z]*$"), StaticHelpers.getCommands),
            new AutocompleteParameter(new RegExp("^(block)\\s[a-z]*$"), StaticHelpers.getBlocks),
            new AutocompleteParameter(new RegExp("^(monster)\\s[a-z]*$"), StaticHelpers.getMonsters),
            new AutocompleteParameter(new RegExp("^(new)\\s[a-z]*$"), StaticHelpers.getBlocks),
            new AutocompleteParameter(new RegExp("^(damage)\\s[a-z]*$"), StaticHelpers.getMonsters),
            new AutocompleteParameter(new RegExp("^(heal)\\s[a-z]*$"), StaticHelpers.getMonsters)
        ];
    }
}