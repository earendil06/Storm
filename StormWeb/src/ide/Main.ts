import Vue from "vue";
import BlockComponent from "../components/Block";
import {StaticHelpers} from "../StaticHelpers";

export default class Ide {
    static main() {
        (window as any).StaticHelpers = StaticHelpers;
        /*(window as any).createVue = function(data) {
            (window as any).ideBlockApplication = new Vue({
                el: '#ideBlock',
                data: {
                    currentStorm: data
                },
                components: {
                    BlockComponent
                }
            });
        }*/
    }
}