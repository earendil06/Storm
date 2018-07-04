import {ClearCommand} from "./ClearCommand";
import {ICommand} from "./ICommand";
import {BlockCommand} from "./BlockCommand";

export class StaticHelpers {
    static hideSpinner(): void {
        document.getElementById("loader").style.display = "none";
    }

    static showSpinner(): void {
        document.getElementById("loader").style.display = "block";
    }



    static eval(input: string):void {
        const arguments = input.trim().split(" ").filter(f => f !== "");
        if (arguments.length === 0) {
            (window as any).app.commands.push({input: input, output: "Command does not exists.", templateName: "default"});
        } else {
            const commandName = arguments[0].toLowerCase();
            let commandFound = (window as any).COMMANDS.find(f => f.getCommandName() === commandName);
            if (typeof commandFound === "undefined") {
                (window as any).app.commands.push({input: input, output: "Command does not exists.", templateName: "default"});
            } else {
                this.showSpinner();
                commandFound.execute(input, arguments);
            }
        }
    }

    static autoComplete(): void {
        console.log((window as any).app.currentInputValue);
        const pointer = (window as any).app.currentInputValue.trim().split(" ")[0];
        let toExecute = (window as any).propEngine.find(f => f.name === pointer);
        if (toExecute === undefined) {
            console.log("no proposals");
            window.scrollTo(0, document.body.scrollHeight);
            // app.currentInputValue = "block";
            // autoComplete();
            return;
        }
        if ((window as any).app.proposalsIndex === -1) {
            StaticHelpers.showSpinner();
            window[toExecute.function]();
        }
        if ((window as any).app.proposals.length > 0) {
            (window as any).app.proposalsIndex = ((window as any).app.proposalsIndex + 1) % (window as any).app.proposals.length;
        } else {
            (window as any).app.proposalsIndex = -1;
        }
        window.scrollTo(0, document.body.scrollHeight);
    }
}