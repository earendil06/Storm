import Vue from "vue";
//import BlockComponent from "../components/Block";
import {StaticHelpers} from "../StaticHelpers";
import {JsonParser} from "../resources/JsonParser";
//import EditableBlock from "../components/EditableBlock";

export default class Ide {
    static main() {
        (window as any).StaticHelpers = StaticHelpers;
        (window as any).JsonParser = JsonParser;
        (window as any).createVue = function(data: any) {
            (window as any).ideBlockApplication = new Vue({
                el: '#ideBlock',
                data: {
                    currentStorm: data
                },
                components: {
                   // BlockComponent, EditableBlock
                }
            });
        }
    }
}