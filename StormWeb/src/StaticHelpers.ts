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
import App, {IHistoryCommand} from "./Application";
import {ExportEncounterCommand} from "./term/commands/ExportEncounterCommand";
import {LoadEncounterCommand} from "./term/commands/LoadEncounterCommand";
import ICommand from "./term/commands/ICommand";
import Engine from "./engine/Engine";
import LocalAccessor from "./resources/LocalAccessor";
import IdeCommand from "./term/commands/IdeCommand";
import {ExportBlocksCommand} from "./term/commands/ExportBlocks";
import {LoadBlocksCommand} from "./term/commands/LoadBlocksCommand";
import {DeleteBlockCommand} from "./term/commands/DeleteBlockCommand";
import AutocompleteParameter from "./poco/AutocompleteParameter";
import {ElectronCommand} from "./term/commands/ElectronCommand";
import Optional from "typescript-optional";

export class StaticHelpers {
    private static accessor = new LocalAccessor();

    static hideSpinner(): void {
        const target = document.getElementById("loader-img");
        if (target != null) {
            target.style.display = "none";
        }

    }

    static showSpinner(): void {
        const target = document.getElementById("loader-img");
        if (target != null) {
            target.style.display = "block";
        }
    }

    static scrollWindow(): void {
        let container = document.getElementById('inputLine');
        if (container != null) {
            container.scrollIntoView();
        }
    }


    static async getCommands(): Promise<string[]> {
        return StaticHelpers.COMMANDS().map(c => c.getCommandName()).sort();
    }

    static async getBlocks(): Promise<string[]> {
        return await StaticHelpers.accessor.getBlockNameList();
    }

    static getAccessor() {
        return StaticHelpers.accessor;
    }

    static async getMonsters(): Promise<string[]> {
        return StaticHelpers.engine().getEncounterData().monsters.map(m => m.name);
    }

    static async getReleases(): Promise<string[]> {
        return ["linux", "windows", "macOS"]
    }

    static application(): App {
        return (window as any).app as App;
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
            new DeleteBlockCommand(),
            new ElectronCommand()
        ];
    }

    static async eval(command: string, additionalArgs: string[]): Promise<IHistoryCommand> {
        let commandFound = Optional.ofNullable(StaticHelpers.COMMANDS().find(f => f.getCommandName() === command)) as Optional<ICommand>;
        if (commandFound.isEmpty) {
            return {
                command: command,
                args: additionalArgs,
                output: "Command does not exists.",
                templateName: "error-component"
            };
        } else {
            return await commandFound.get().execute(additionalArgs);
        }
    }

    static autocompleteParameters(): Array<AutocompleteParameter> {
        return [
            new AutocompleteParameter(new RegExp("^[a-z]*$"), StaticHelpers.getCommands),
            new AutocompleteParameter(new RegExp("^(block)\\s[a-z]*$"), StaticHelpers.getBlocks),
            new AutocompleteParameter(new RegExp("^(monster)\\s[a-z]*$"), StaticHelpers.getMonsters),
            new AutocompleteParameter(new RegExp("^(new)\\s[a-z]*$"), StaticHelpers.getBlocks),
            new AutocompleteParameter(new RegExp("^(damage)\\s[a-z]*$"), StaticHelpers.getMonsters),
            new AutocompleteParameter(new RegExp("^(heal)\\s[a-z]*$"), StaticHelpers.getMonsters),
            new AutocompleteParameter(new RegExp("^(electron)\\s[a-z]*$"), StaticHelpers.getReleases)
        ];
    }
}