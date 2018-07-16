import {Command} from "./Command";
import {StaticHelpers} from "./StaticHelpers";

export class GetPlayingMonsterCommand extends Command {
    constructor() {
        super("playing")
    }

    execute(inputText: string, args: string[]): void {
        $.ajax({
            contentType: "application/json",
            url: `http://${StaticHelpers.server}:${StaticHelpers.port}/api/playing`,
            success: function (data) {
                if (data.status === 200) {
                    (window as any).app.commands.push({input: inputText, output: data, templateName: "monster"});
                } else {
                    (window as any).app.commands.push({input: inputText, output: data, templateName: "default-component"});
                }
            }
        });
    }

}