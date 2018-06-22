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
    '        </div>' +
    '    </div>',
    mounted: function () {
        window.scrollTo(0, document.body.scrollHeight);
        hideSpinner();
    }
});

Vue.component('encounter', {
    props: ["data"],
    template:
    '    <div class="stat-block">' +
    '    <hr class="orange-border"/>' +
    '        <div v-for="monster in data.entity.monsters" class="creature-heading">' +
    '           <h1>{{ monster.name === data.entity.playingMonsterName ? "=>" : "" }} ' +
    '               {{ monster.blockName }} {{ monster.name[0].toUpperCase() + monster.name.slice(1) }}' +
    '           </h1>' +
    '               HP: {{ monster.hitPoints }}, AC: {{ monster.ac }}' +
    '               </br>Initiative: {{ monster.initiative === null ? "not rolled" : monster.initiative }}' +
    '        </div>' +
    '    <div>' +
    '    <div class="creature-heading">' +
    '       <h1>{{ data.entity.playingMonsterName === "" ? "Nobody rolled initiative" : data.entity.playingMonsterName + "\'s turn" }}</h1>' +
    '    </div>' +
    '<div>Turn {{ data.entity.turn }}</div>'
});

Vue.component('monster', {
    props: ["data"],
    template:
    '    <div>' +
    '        <div class="stat-block">' +
    '            <hr class="orange-border"/>' +
    '            <div class="creature-heading">' +
    '                   <h1>{{ data.entity.name[0].toUpperCase() + data.entity.name.slice(1) }}</h1>' +
    '                       HP: {{ data.entity.hitPoints }}</br>Initiative: {{ data.entity.initiative === null ? "not rolled" : data.entity.initiative }}' +
    '            </div>' +
    '            <block :data="data.entity.block"></block>' +
    '        </div>' +
    '    </div>'
});

Vue.component('default', {
    props: ["data"],
    template: "<div>{{ data }}</div>"
});

Vue.component('entity', {
    props: ["data"],
    template: "<div>{{ data.entity }}</div>"
});

let invokeAutoComplete = function (message) {
    message.preventDefault();
    autoComplete();
};

function autoComplete() {
    console.log(app.currentInputValue);
    const pointer = app.currentInputValue.trim().split(" ")[0];
    let toExecute = propEngine.find(f => f.name === pointer);
    if (toExecute === undefined) {
        console.log("no proposals");
        window.scrollTo(0, document.body.scrollHeight);
        // app.currentInputValue = "block";
        // autoComplete();
        return;
    }
    if (app.proposalsIndex === -1) {
        showSpinner();
        window[toExecute.function]();
    }
    if (app.proposals.length > 0) {
        app.proposalsIndex = (app.proposalsIndex + 1) % app.proposals.length;
    } else {
        app.proposalsIndex = -1;
    }
    window.scrollTo(0, document.body.scrollHeight);
}

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
                eval(this.currentInputValue);
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

$(document).keydown(function (e) {
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
        new ClearCommand().execute();
        return false;
    }
});

function getCommands() {
    app.proposals = COMMANDS.map(c => c.name).sort();
    hideSpinner();
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

function getBlocks() {
    (async function () {
        let response = await $.ajax({
            contentType: "application/json",
            url: `http://${server}:${port}/api/blocks/`
        });
        app.proposals = response.entity;
        app.proposalsIndex = (app.proposalsIndex + 1) % app.proposals.length;
        hideSpinner();
    })();
}

function getMonsters() {
    (async function () {
        let response = await $.ajax({
            contentType: "application/json",
            url: `http://${server}:${port}/api/data/names`
        });
        app.proposals = response.entity;
        app.proposalsIndex = (app.proposalsIndex + 1) % app.proposals.length;
        hideSpinner();
    })();
}

class GetBlocksCommand {
    constructor() {
        this.name = "get-blocks";
    }

    execute(input, args) {
        const blockName = args[1];
        $.ajax({
            contentType: "application/json",
            url: `http://${server}:${port}/api/blocks/`,
            success: function (data) {
                app.commands.push({input: input, output: data, templateName: "entity"});
                window.scrollTo(0, document.body.scrollHeight);
            }
        });
    }
}

class ClearCommand {
    constructor() {
        this.name = "clear";
    }

    execute(input, args) {
        app.commands = [];
        hideSpinner();
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
        if (args.length < 2) {
            app.commands.push({input: input, output: "missing parameter (e.g.: block goblin)", templateName: "default"});
            hideSpinner();
        } else {
            const blockName = args[1];
            $.ajax({
                contentType: "application/json",
                url: `http://${server}:${port}/api/block/` + blockName.toLowerCase(),
                success: function (data) {
                    if (data.status === 200) {
                        app.commands.push({input: input, output: data.entity, templateName: "block"});
                        window.scrollTo(0, document.body.scrollHeight);
                    } else if (data.status === 404) {
                        app.commands.push({
                            input: input,
                            output: blockName + " is not registered.",
                            templateName: "default"
                        });
                    } else {
                        app.commands.push({
                            input: input,
                            output: "Error " + data.status + ", Something went wrong!",
                            templateName: "default"
                        });
                    }
                },
                error: function (data) {
                    app.commands.push({
                        input: input,
                        output: "Error " + data.status + ", Something went wrong!",
                        templateName: "default"
                    });
                }
            });
        }
    }
}

class NewCommand {
    constructor() {
        this.name = "new";
    }

    execute(input, args) {
        if (args.length < 3) {
            app.commands.push({input: input, output: "missing parameters (e.g.: new goblin adrien)", templateName: "default"});
            hideSpinner();
        } else {
            const monsterType = args[1];
            const monsterName = args[2];
            $.ajax({
                contentType: "application/json",
                method: 'POST',
                url: `http://${server}:${port}/api/new/`,
                data: JSON.stringify({"name": monsterName, "blockName": monsterType}),
                success: function (data) {
                    app.commands.push({input: input, output: data, templateName: "entity"});
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
            app.commands.push({input: input, output: "missing parameter (e.g.: monster adrien)", templateName: "default"});
            hideSpinner();
        } else {
            const monsterName = args[1];
            $.ajax({
                contentType: "application/json",
                url: `http://${server}:${port}/api/monster/` + monsterName,
                success: function (data) {
                    if (data.status === 200) {
                        app.commands.push({input: input, output: data, templateName: "monster"});
                    } else {
                        app.commands.push({input: input, output: data, templateName: "entity"});
                    }
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
            url: `http://${server}:${port}/api/data`,
            success: function (data) {
                const monsters = data.entity.monsters;
                monsters.forEach(m => {
                    m.ac = m.block.stats.find(f => f.type === "ARMOR_CLASS").formulae;
                    m.blockName = m.block.name;
                });
                app.commands.push({input: input, output: data, templateName: "encounter"});
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
                if (data.status === 200) {
                    app.commands.push({input: input, output: data, templateName: "monster"});
                } else {
                    app.commands.push({input: input, output: data, templateName: "entity"});
                }
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
                let encounterCommand = COMMANDS.find(f => f.name === "encounter");
                encounterCommand.execute("", "");
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
            app.commands.push({input: input, output: "missing parameters (e.g.: damage adrien 2)", templateName: "default"});
            hideSpinner();
        } else {
            const monsterName = args[1];
            const monsterDamage = args[2];
            $.ajax({
                contentType: "application/json",
                method: 'PUT',
                url: `http://${server}:${port}/api/damage/`,
                data: JSON.stringify({"name": monsterName, "damage": -monsterDamage}),
                success: function (data) {
                    if (data.status === 200) {
                        app.commands.push({input: input, output: data, templateName: "monster"});
                    } else {
                        app.commands.push({input: input, output: data, templateName: "entity"});
                    }
                }
            });

        }
    }
}

class HealCommand {
    constructor() {
        this.name = "heal";
    }

    execute(input, args) {
        if (args.length < 3) {
            app.commands.push({input: input, output: "missing parameters (e.g.: heal adrien 2)", templateName: "default"});
            hideSpinner();
        } else {
            const monsterName = args[1];
            const monsterDamage = args[2];
            $.ajax({
                contentType: "application/json",
                method: 'PUT',
                url: `http://${server}:${port}/api/damage/`,
                data: JSON.stringify({"name": monsterName, "damage": monsterDamage}),
                success: function (data) {
                    if (data.status === 200) {
                        app.commands.push({input: input, output: data, templateName: "monster"});
                    } else {
                        app.commands.push({input: input, output: data, templateName: "entity"});
                    }
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
                app.commands.push({input: input, output: data, templateName: "entity"});
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
                let encounterCommand = COMMANDS.find(f => f.name === "encounter");
                encounterCommand.execute("", "");
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
                let encounterCommand = COMMANDS.find(f => f.name === "encounter");
                encounterCommand.execute("", "");
            }
        });
    }
}

class RemoveCommand {
    constructor() {
        this.name = "remove";
    }

    execute(input, args) {
        if (args.length < 2) {
            app.commands.push({input: input, output: "missing parameter (e.g.: remove adrien)", templateName: "default"});
            hideSpinner();
        } else {
            const monsterName = args[1];
            $.ajax({
                contentType: "application/json",
                method: 'DELETE',
                url: `http://${server}:${port}/api/remove/` + monsterName,
                success: function (data) {
                    app.commands.push({input: input, output: data, templateName: "entity"});
                }
            });
        }
    }
}

class SetInitiativeCommand {
    constructor() {
        this.name = "set-init";
    }

    execute(input, args) {
        if (args.length < 3) {
            app.commands.push({input: input, output: "missing parameters (e.g: set-init adrien 12)", templateName: "default"});
            hideSpinner();
        } else {
            const name = args[1];
            const value = args[2];
            $.ajax({
                contentType: "application/json",
                method: 'PUT',
                url: `http://${server}:${port}/api/set/`,
                data: JSON.stringify({"name": name, "value": value}),
                success: function (data) {
                    if (data.status === 200) {
                        app.commands.push({input: input, output: data, templateName: "monster"});
                    } else {
                        app.commands.push({input: input, output: data, templateName: "entity"});
                    }
                }
            });
        }
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
    new HealCommand(),
    new NextTurnCommand(),
    new ResetCommand(),
    new GetTurnCommand(),
    new RemoveCommand(),
    new SetInitiativeCommand(),
    new GetBlocksCommand()
];

function eval(input) {
    const arguments = input.trim().split(" ").filter(f => f !== "");
    if (arguments.length === 0) {
        app.commands.push({input: input, output: "Command does not exists.", templateName: "default"});
    } else {
        const commandName = arguments[0].toLowerCase();
        let commandFound = COMMANDS.find(f => f.name === commandName);
        if (typeof commandFound === "undefined") {
            app.commands.push({input: input, output: "Command does not exists.", templateName: "default"});
        } else {
            showSpinner();
            commandFound.execute(input, arguments);
        }
    }
}

function showSpinner() {
    document.getElementById("loader").style.display = "block";
}

function hideSpinner() {
    document.getElementById("loader").style.display = "none";
}