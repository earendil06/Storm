import Vue from "vue";
import Command from "./components/Command.vue.ts";
import {StaticHelpers} from "./commands/StaticHelpers";
import {ClearCommand} from "./commands/ClearCommand";
import {BlockCommand} from "./commands/BlockCommand";
import {ICommand} from "./commands/ICommand";


let invokeAutoComplete = function (message) {
    message.preventDefault();
    StaticHelpers.autoComplete();
};

export class Main {
    public main(): void {
        const app = new Vue({
            el: '#container',
            data: {
                user: "gm@Storm =>",
                commands: [],
                history: [],
                currentInputValue: "",
                positionHistory: 0,
                proposals: "",
                proposalsIndex: -1
            },
            watch: {
                positionHistory: function (newPosition, oldPosition) {
                    let command = this.history[this.history.length - newPosition];
                    if (typeof command !== 'undefined') {
                        this.currentInputValue = command;
                    } else {
                        this.currentInputValue = "";
                    }
                }
            },
            methods: {
                executeCommand: function (message) {
                    if (this.currentInputValue !== "" && this.currentInputValue !== this.history[this.history.length - 1]) {
                        this.history.push(this.currentInputValue);
                    }
                    if (this.proposalsIndex === -1) {
                        StaticHelpers.eval(this.currentInputValue);
                        this.currentInputValue = "";
                        this.positionHistory = 0;
                    } else {
                        let inputArray = this.currentInputValue.trim().split(" ");
                        inputArray.push(this.proposals[this.proposalsIndex]);
                        this.currentInputValue = inputArray.filter(token => token !== "").join(" ");
                    }
                    window.scrollTo(0, document.body.scrollHeight);
                    this.proposalsIndex = -1;
                    this.proposals = [];
                },
                setPositionHistory: function (message) {
                    const downCode = 40;
                    const upCode = 38;
                    if (message.keyCode === upCode && this.positionHistory < this.history.length) {
                        this.positionHistory++;
                    } else if (message.keyCode === downCode && this.positionHistory > 0) {
                        this.positionHistory--;
                    }
                },
                invokeAutocomplete: invokeAutoComplete,
            }
        });

        function getQueryVariable(variable) {
            const query = window.location.search.substring(1);
            const vars = query.split("&");
            for (let i = 0; i < vars.length; i++) {
                const pair = vars[i].split("=");
                if(pair[0] === variable){return pair[1];}
            }
            return(false);
        }
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
        const COMMANDS = [new ClearCommand(), new BlockCommand()];
        $(document as any).keydown(function (e) {
            const tabCode = 9;
            const enterCode = 13;
            if (e.which !== tabCode && e.which !== enterCode) {
                app.proposals = [];
                app.proposalsIndex = -1;
            }
            const lKey = 76;
            if (e.ctrlKey && (e.which === lKey)) {
                e.preventDefault();
                e.stopPropagation();
                new ClearCommand().execute(null, null);
                return false;
            }
        });
        function getCommands() {
            app.proposals = COMMANDS.map(c => c.getCommandName()).sort();
            StaticHelpers.hideSpinner();
        }
        const server = getQueryVariable("server") || "florentpastor.ddns.net";
    }
}
