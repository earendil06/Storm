export class StaticHelpers {
    static hideSpinner(): void {
        //document.getElementById("loader").style.display = "none";
    }

    static showSpinner(): void {
        //document.getElementById("loader").style.display = "block";
    }

    static eval(input: string) {
        //const arguments = input.trim().split(" ").filter(f => f !== "");
        /*if (arguments.length === 0) {
           // app.commands.push({input: input, output: "Command does not exists.", templateName: "default"});
        } else {
            const commandName = arguments[0].toLowerCase();
            //let commandFound = COMMANDS.find(f => f.name === commandName);
            /*if (typeof commandFound === "undefined") {
                //app.commands.push({input: input, output: "Command does not exists.", templateName: "default"});
            } else {
                this.showSpinner();
                //commandFound.execute(input, arguments);
            }
        }*/
    }
}
import Vue from 'vue'

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
        //hideSpinner();
    }
});