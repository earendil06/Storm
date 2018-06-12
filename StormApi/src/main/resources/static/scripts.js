Vue.component('command', {
    props: ['command', 'user'],
    template:
    '    <div>' +
    '        <div class="input-line line">' +
    '        <div class="prompt">{{ user }}</div>' +
    '            <div>' +
    '                <input class="cmdline" v-bind:value="command.input" readonly="" >' +
    '            </div>' +
    '        </div>' +
    '        <div style="padding-bottom: 10px; padding-top: 5px">{{ command.output }}</div>' +
    '    </div>'
});

const app = new Vue({
    el: '#container',
    data: {
        user: "[gm@storm-cli] $",
        commands: [],
        history: [],
        currentInputValue: "",
        positionHistory: 0,
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
            this.history.push(this.currentInputValue);
            eval(this.currentInputValue);

            this.currentInputValue = "";
            this.positionHistory = 0;

        },
        setPositionHistory: function (message) {
            const downCode = 40;
            const upCode = 38;
            if (message.keyCode === upCode && this.positionHistory < this.history.length) {
                this.positionHistory++;
            } else if (message.keyCode === downCode && this.positionHistory > 0) {
                this.positionHistory--;
            }
        }
    }
});

class ClearCommand {
    constructor() {
        this.name = "clear";
    }

    execute(input, args) {
        app.commands = [];
    }
}

class HelpCommand {
    constructor() {
        this.name = "help";
    }

    execute(input, args) {

    }
}

class BlockCommand {
    constructor() {
        this.name = "block";
    }

    execute(input, args) {
        const blockName = args[1];
        $.ajax({
            dataType:"jsonp",
            url: 'http://localhost:8080/api/block/' + blockName,
            success: function (data) {
                app.commands.push({input: input, output: JSON.stringify(data)});
            }
        });
    }
}

const COMMANDS = [
    new ClearCommand(),
    new HelpCommand(),
    new BlockCommand()
];

function eval(input) {
    const arguments = input.trim().split(" ");
    if (arguments.length === 0) {
        app.commands.push({input: input, output: "error"});
    } else {
        const commandName = arguments[0];
        let commandFound = COMMANDS.find(f => f.name === commandName);
        if (typeof commandFound === "undefined") {
            app.commands.push({input: input, output: "error"});
        } else {
            commandFound.execute(input, arguments);
        }
    }
}