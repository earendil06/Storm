import {StaticHelpers} from "../StaticHelpers";
import * as $ from "jquery";
import App from "../Application";
import Engine from "../engine/Engine";
import Optional from "typescript-optional";

export default class Term {
    static main() {
        (window as any).engine = new Engine();
        (window as any).app = new App({
            el: '#container'
        });

        $(document as any).keydown(function (e) {
            const codes = [9, 13, 37, 38, 39, 40];
            if (codes.indexOf(e.which) === -1) {
                StaticHelpers.application().proposals = [];
                StaticHelpers.application().proposalsIndex = Optional.empty();
            }
            return true;
        });
    }
}