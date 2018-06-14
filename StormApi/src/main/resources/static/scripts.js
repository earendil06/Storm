// var server = "florentpastor.ddns.net";
let server = "localhost";
let port = "8080";

Vue.component('command', {
    props: ['command', 'user'],
    template:
    '    <div>' +
    '        <div class="input-line line">' +
    '        <div class="prompt">{{ user }}</div>' +
    '            <div>' +
    '                <input style="color: white;" class="cmdline" v-bind:value="command.input" readonly="" >' +
    '            </div>' +
    '        </div>' +
    '        <div style="padding-bottom: 10px; padding-top: 5px; color: white">' +
    '           <component :is="command.templateName" :data="command.output"></component>' +
    '       </div>' +
    '    </div>'
});

Vue.component('default', {
    props: ["data"],
    template: "<div>{{ data }}</div>",
    mounted: function () {
        window.scrollTo(0, document.body.scrollHeight);
    }
});


const app = new Vue({
    el: '#container',
    data: {
        user: "gm@storm =>",
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
            if (this.currentInputValue !== this.history[this.history.length - 1]) {
                this.history.push(this.currentInputValue);
            }
            eval(this.currentInputValue);

            window.scrollTo(0, document.body.scrollHeight);

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
    },
    mounted: function () {
        window.scrollTo(0, document.body.scrollHeight);
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
        app.commands.push({input: input, output: COMMANDS.map(c => c.name), templateName: "default"});
    }
}

class BlockCommand {
    constructor() {
        this.name = "block";
    }

    execute(input, args) {
        const blockName = args[1];
        $.ajax({
            contentType: "application/json",
            url: `http://${server}:${port}/api/block/` + blockName.toLowerCase(),
            success: function (data) {
                if (data.status === 200) {
                    app.commands.push({input: input, output: data.entity, templateName: "block"});
                    window.scrollTo(0, document.body.scrollHeight);
                } else if (data.status === 404) {
                    app.commands.push({input: input, output: blockName + " is not registered.", templateName: "default"});
                } else {
                    app.commands.push({input: input, output: "Error " + data.status + ", Something went wrong!", templateName: "default"});
                }
            },
            error: function (data) {
                app.commands.push({input: input, output: "Error " + data.status + ", Something went wrong!", templateName: "default"});
            }
        });
    }
}

class NewCommand {
    constructor() {
        this.name = "new";
    }

    execute(input, args) {
        if (args.length < 3) {
            console.log("error");
        } else {
            const monsterType = args[1];
            const monsterName = args[2];
            $.ajax({
                contentType: "application/json",
                method: 'POST',
                url: 'http://localhost:8080/api/new/',
                data: JSON.stringify({"name": monsterName, "blockName": monsterType}),
                success: function (data) {
                    app.commands.push({input: input, output: data, templateName: "default"});
                }
            });

        }
    }
}

class GetMonsterCommand {
    constructor() {
        this.name = "monster";
    }

    execute(input, args) {
        if (args.length < 2) {
            console.log("error");
        } else {
            const monsterName = args[1];
            $.ajax({
                contentType: "application/json",
                url: 'http://localhost:8080/api/monster/' + monsterName,
                success: function (data) {
                    app.commands.push({input: input, output: data, templateName: "default"});
                }
            });

        }
    }
}

class GetEncounterDataCommand {
    constructor() {
        this.name = "encounter";
    }

    execute(input, args) {
        $.ajax({
            contentType: "application/json",
            url: 'http://localhost:8080/api/data',
            success: function (data) {
                const monsters = data.entity.monsters;
                monsters.forEach(m => {
                    m.block = m.block.name;
                });
                app.commands.push({input: input, output: data, templateName: "default"});
            }
        });
    }
}

class GetPlayingMonster {
    constructor() {
        this.name = "playing";
    }

    execute(input, args) {
        $.ajax({
            contentType: "application/json",
            url: `http://${server}:${port}/api/playing`,
            success: function (data) {
                app.commands.push({input: input, output: data, templateName: "default"});
            }
        });
    }
}

class RollInitiativeCommand {
    constructor() {
        this.name = "initiative";
    }

    execute(input, args) {
        $.ajax({
            contentType: "application/json",
            method: 'PUT',
            url: `http://${server}:${port}/api/roll/initiative`,
            success: function (data) {
                app.commands.push({input: input, output: data, templateName: "default"});
            }
        });
    }
}

class DamageCommand {
    constructor() {
        this.name = "damage";
    }

    execute(input, args) {
        if (args.length < 3) {
            console.log("error");
        } else {
            const monsterName = args[1];
            const monsterDamage = args[2];
            $.ajax({
                contentType: "application/json",
                method: 'PUT',
                url: `http://${server}:${port}/api/damage/`,
                data: JSON.stringify({"name": monsterName, "damage": monsterDamage}),
                success: function (data) {
                    app.commands.push({input: input, output: data, templateName: "default"});
                }
            });

        }
    }
}

class ResetCommand {
    constructor() {
        this.name = "reset";
    }

    execute(input, args) {
        $.ajax({
            contentType: "application/json",
            method: 'PUT',
            url: `http://${server}:${port}/api/reset/`,
            success: function (data) {
                app.commands.push({input: input, output: data, templateName: "default"});
            }
        });
    }
}

class NextTurnCommand {
    constructor() {
        this.name = "next";
    }

    execute(input, args) {
        $.ajax({
            contentType: "application/json",
            method: 'PUT',
            url: `http://${server}:${port}/api/nextTurn/`,
            success: function (data) {
                app.commands.push({input: input, output: data, templateName: "default"});
            }
        });
    }
}

class GetTurnCommand {
    constructor() {
        this.name = "turn";
    }

    execute(input, args) {
        $.ajax({
            contentType: "application/json",
            method: 'GET',
            url: `http://${server}:${port}/api/turn/`,
            success: function (data) {
                app.commands.push({input: input, output: data, templateName: "default"});
            }
        });
    }
}

const COMMANDS = [
    new ClearCommand(),
    new HelpCommand(),
    new BlockCommand(),
    new NewCommand(),
    new GetMonsterCommand(),
    new GetEncounterDataCommand(),
    new GetPlayingMonster(),
    new RollInitiativeCommand(),
    new DamageCommand(),
    new NextTurnCommand(),
    new ResetCommand(),
    new GetTurnCommand()
];

function eval(input) {
    const arguments = input.trim().split(" ");
    if (arguments.length === 0) {
        app.commands.push({input: input, output: "Command does not exists.", templateName: "default"});
    } else {
        const commandName = arguments[0];
        let commandFound = COMMANDS.find(f => f.name === commandName);
        if (typeof commandFound === "undefined") {
            app.commands.push({input: input, output: "Command does not exists.", templateName: "default"});
        } else {
            commandFound.execute(input, arguments);
        }
    }
}