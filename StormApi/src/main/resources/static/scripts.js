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
    '        <div style="padding-bottom: 10px; padding-top: 5px">' +
    '           <component :is="command.templateName" :data="command.output"></component>' +
    '       </div>' +
    '    </div>'
});

Vue.component('block', {
    props: ["data"],
    template: '<div style="background-color: red;">{{ data }}</div>'
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
            contentType: "application/json",
            url: 'http://localhost:8080/api/block/' + blockName,
            success: function (data) {
                app.commands.push({ input: input, output: data, templateName: "block" });
            }
        });
    }
}

class NewCommand {
    constructor(){
        this.name = "new";
    }

    execute(input, args){
        if (args.length < 3){
            console.log("error");
        }else {
            const monsterType = args[1];
            const monsterName = args[2];
            $.ajax({
                contentType: "application/json",
                method: 'POST',
                url: 'http://localhost:8080/api/new/',
                data: JSON.stringify({ "name" : monsterName, "blockName" : monsterType}),
                success: function (data) {
                    var html = '<toto v-bind:output="data"></toto>';
                    app.commands.push({input: input, output: html});
                }
            });

        }
    }
}

class GetMonsterCommand {
    constructor(){
        this.name = "monster";
    }

    execute(input, args){
        if (args.length < 2){
            console.log("error");
        } else {
            const monsterName = args[1];
            $.ajax({
                contentType: "application/json",
                url: 'http://localhost:8080/api/monster/' + monsterName,
                success: function (data) {
                    app.commands.push({input: input, output: data});
                }
            });

        }
    }
}

class GetEncounterDataCommand {
    constructor(){
        this.name = "encounter";
    }

    execute(input, args){
        $.ajax({
            contentType: "application/json",
            url: 'http://localhost:8080/api/data',
            success: function (data) {
                const monsters = data.entity.monsters;
                monsters.forEach(m => {
                   m.block = m.block.name;
                });
                app.commands.push({input: input, output: data});
            }
        });
    }
}

class GetPlayingMonster {
    constructor(){
        this.name = "playing";
    }

    execute(input, args){
        $.ajax({
            contentType: "application/json",
            url: 'http://localhost:8080/api/playing',
            success: function (data) {
                app.commands.push({input: input, output: data});
            }
        });
    }
}

class RollInitiativeCommand {
    constructor(){
        this.name = "initiative";
    }

    execute(input, args){
        $.ajax({
            contentType: "application/json",
            method: 'PUT',
            url: 'http://localhost:8080/api/roll/initiative',
            success: function (data) {
                app.commands.push({input: input, output: data});
            }
        });
    }
}

class DamageCommand {
    constructor(){
        this.name = "damage";
    }

    execute(input, args){
        if (args.length < 3){
            console.log("error");
        }else {
            const monsterName = args[1];
            const monsterDamage = args[2];
            $.ajax({
                contentType: "application/json",
                method: 'PUT',
                url: 'http://localhost:8080/api/damage/',
                data: JSON.stringify({ "name" : monsterName, "damage" : monsterDamage}),
                success: function (data) {
                    app.commands.push({input: input, output: data});
                }
            });

        }
    }
}

class NextTurnCommand {
    constructor(){
        this.name = "next";
    }

    execute(input, args){
        $.ajax({
            contentType: "application/json",
            method: 'PUT',
            url: 'http://localhost:8080/api/nextTurn/',
            success: function (data) {
                app.commands.push({input: input, output: data});
            }
        });
    }
}

class ResetCommand {
    constructor(){
        this.name = "reset";
    }

    execute(input, args){
        $.ajax({
            contentType: "application/json",
            method: 'PUT',
            url: 'http://localhost:8080/api/reset/',
            success: function (data) {
                app.commands.push({input: input, output: data});
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
    new ResetCommand()
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