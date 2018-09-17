import {ArrowDirection} from "./ArrowDirection";
import Optional from "typescript-optional";
import AutocompleteParameter from "./poco/AutocompleteParameter";
import {IHistoryCommand} from "./Application";

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

    public async computeProposals(toExecuteOption: Optional<AutocompleteParameter>): Promise<string[]> {
        if (toExecuteOption.isEmpty) {
            return [];
        }else {
            return await toExecuteOption.get().callback()
        }
    }

    public getProposalsIndex(proposalsIndex: Optional<number>, proposalsDisplayed: string[]) : Optional<number> {
        if (proposalsDisplayed.length === 0){
            return Optional.empty();
        }
        return Optional.of((proposalsIndex.orElse(-1) + 1) % proposalsDisplayed.length);
    }

    public getCurrentCommand(currentInputValue: string): Optional<string> {
        const values = currentInputValue.trim().split(" ").filter(f => f !== "");
        return values.length > 0 ? Optional.of(values[0].toLowerCase()) : Optional.empty();
    }

    public getCurrentArguments(currentInputValue: string) : string[] {
        return currentInputValue.trim().split(" ").filter(f => f !== "").slice(1);
    }

    public computeProposalsDisplayed(proposals: string[], currentCommand: Optional<string>, currentArguments: string[]): string[] {
        if (currentArguments.length <= 1) {
            const inputFilter = currentArguments.length === 1 ? currentArguments[0] : currentCommand.orElse("");
            return proposals.filter(f => f.startsWith(inputFilter));
        }
        return proposals;
    }

    public transformInputBangBang(currentInputValue: string, optionalPreviousCommand: Optional<IHistoryCommand>): string {
        const currentCommand = this.getCurrentCommand(currentInputValue);
        if (currentCommand.isEmpty){
            return "";
        }
        return optionalPreviousCommand.matches({
            present: (previousCommand) => currentCommand.get() + " " + previousCommand.args.join(" "),
            empty: () => ""
        });
    }

    public transformInputAutocomplete(currentCommand: Optional<string>, currentArguments: string[], proposalSelected: string) {
        if (currentCommand.isEmpty) {
            return "";
        }

        if (currentArguments.length === 0) {
            return proposalSelected;
        } else {
            return currentCommand.get() + currentArguments.slice(0, currentArguments.length - 1).join(" ") + " " + proposalSelected;
        }
    }
}