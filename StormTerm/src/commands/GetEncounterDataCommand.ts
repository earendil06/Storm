import {Command} from "./Command";
import {StaticHelpers} from "./StaticHelpers";

export class GetEncounterDataCommand extends Command{

    constructor(){
        super("encounter");
    }


    execute(inputText: string, args: string[]): void {
        $.ajax({
            contentType: "application/json",
            url: `http://${StaticHelpers.server}:${StaticHelpers.port}/api/data`,
            success: function (data) {
                const monsters = data.monsters;
                monsters.forEach(m => {
                    m.ac = m.block.stats.find(f => f.statType === "ac").statValue.formulae;
                    // m.blockName = m.block.name;
                    m.blockName = m.block.name[0].toUpperCase() + m.block.name.slice(1)
                });
                (window as any).app.commands.push({input: inputText, output: data, templateName: "encounter-component"});
            }
        });
    }
}