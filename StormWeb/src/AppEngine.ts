import {ArrowDirection} from "./ArrowDirection";
import Optional from "typescript-optional";
import AutocompleteParameter from "./poco/AutocompleteParameter";
import {IHistoryCommand} from "./Application";
import {StaticHelpers} from "./StaticHelpers";

export class AppEngine {
    constructor() {
    }

    public computeHistoryPosition(history: string[], currentPosition: number, direction: ArrowDirection): number {

        if (direction == ArrowDirection.Up && currentPosition < history.length) {
            return currentPosition + 1;
        } else if (direction == ArrowDirection.Down && currentPosition > 0) {
            return currentPosition - 1;
        }
        return currentPosition;
    }

    public computeProposalsIndexWithArrow(currentPosition: number, proposals: string[], direction: ArrowDirection, columnSize: number = 4): number {
        if (proposals.length > 0) {
            switch (direction) {
                case ArrowDirection.Left:
                    return Math.max(currentPosition - 1, 0);
                case ArrowDirection.Right:
                    return Math.min(currentPosition + 1, proposals.length - 1);
                case ArrowDirection.Up:
                    return currentPosition - columnSize >= 0 ? Math.max(currentPosition - columnSize, 0) : currentPosition;
                case ArrowDirection.Down:
                    return currentPosition + columnSize <= proposals.length - 1 ? Math.min(currentPosition + columnSize, proposals.length - 1) : currentPosition;
            }
        }
        return 0;

    }

    public computeProposalsIndexWithTab(proposalsIndex: Optional<number>, proposalsDisplayed: string[]) : Optional<number> {
        if (proposalsDisplayed.length === 0){
            return Optional.empty();
        }
        return Optional.of((proposalsIndex.orElse(-1) + 1) % proposalsDisplayed.length);
    }

    public async computeProposals(toExecuteOption: Optional<AutocompleteParameter>): Promise<string[]> {
        if (toExecuteOption.isEmpty) {
            return [];
        }else {
            return await toExecuteOption.get().callback()
        }
    }



    public computeCurrentCommand(currentInputValue: string): Optional<string> {
        const values = currentInputValue.trim().split(" ").filter(f => f !== "");
        return values.length > 0 ? Optional.of(values[0].toLowerCase()) : Optional.empty();
    }

    public computeCurrentArguments(currentInputValue: string) : string[] {
        return currentInputValue.trim().split(" ").filter(f => f !== "").slice(1);
    }

    public computeProposalsDisplayed(proposals: string[], currentInputValue:string): string[] {

        const currentCommand = this.computeCurrentCommand(currentInputValue);
        const currentArguments = this.computeCurrentArguments(currentInputValue);

        if (currentArguments.length <= 1) {
            const inputFilter = currentArguments.length === 1 ? currentArguments[0] : currentCommand.orElse("");
            return proposals.filter(f => f.startsWith(inputFilter));
        }
        return proposals;
    }

    public transformInputBangBang(currentInputValue: string, optionalPreviousCommand: Optional<IHistoryCommand>): string {
        const currentCommand = this.computeCurrentCommand(currentInputValue);
        const currentArgs = this.computeCurrentArguments(currentInputValue);

        return currentCommand.flatMap((command) => {
            if (command === "!!"){
                return Optional.of("");
            }
            if (currentArgs[0] === "!!") {
                return Optional.of(optionalPreviousCommand.matches({
                    present: (previousCommand) => {
                        if (previousCommand.args.length > 0){
                            return command + " " + previousCommand.args.join(" ")
                        }
                        return command;
                    },
                    empty: () => command
                }));
            }

            return Optional.of(command);
        }).orElse("");
    }

    public transformInputAutocomplete(currentInputValue:string, proposalSelected: string) {

        const currentCommand = this.computeCurrentCommand(currentInputValue);
        const currentArguments = this.computeCurrentArguments(currentInputValue);

        if (currentCommand.isEmpty) {
            return proposalSelected;
        }

        if (proposalSelected === ""){
            return currentCommand.get();
        }

        if (currentArguments.length === 0) {
            if (currentInputValue.endsWith(" ")) {
                return currentCommand.get() + " " + proposalSelected;
            }
            return proposalSelected;
        } else {
            return currentCommand.get() + currentArguments.slice(0, currentArguments.length - 1).join(" ") + " " + proposalSelected;
        }
    }

    public findAutocompleteParameters(currentInputValue: string): Optional<AutocompleteParameter> {
        return Optional.ofNullable(StaticHelpers.autocompleteParameters().find(f => f.entryPoint.test(currentInputValue)));
    }
}