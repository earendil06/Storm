import Vue from "vue";
import {StaticHelpers} from "../StaticHelpers";
import HelpCommand from "../term/commands/HelpCommand";

export default Vue.extend({
    template: `
        <div class="row">
        <div>
        Useful Tips:
        <ul>
    <li>
        Use tab after typing one or more characters to see a list a auto-completion proposition,
        you can then use tab to navigate between them and enter to select one. Mouse navigation works too!
    </li>
    <li>
        The component on the left is interactive. You can :
        <ul>
            <li>
                Roll initiative or go to the next turn by click the bottom text.
            </li>
            <li>
                Damage a monster by typing a number where it's hit points are and pressing the enter key.
            </li>
            <li>
                Change the initiative of a monster by typing a number where it's initiative is and pressing the enter key.
            </li>
            <li>
                Show a monster block by clicking its name.
            </li>
        </ul>
    </li>
    <li>
        Below is a list of all the available commands, click on them or use the command "help [command_name]" to show a description of its usage.
    </li>
<ul>
</div>
            <div v-for="(com, index) in data" class="col-md-3">
                <span style="cursor: pointer" v-on:click="onClickHelpProposal(com)">{{ com }}</span>
            </div>
        </div>
    `,
    name: "help",
    props: ["data"],
    methods: {
        onClickHelpProposal: async function(com){
            let helpSpecificCommand = new HelpCommand();
            const res = await helpSpecificCommand.execute([com]);
            if (res != null) {
                StaticHelpers.application().commands.push(res);
            }
        }
    }
});

