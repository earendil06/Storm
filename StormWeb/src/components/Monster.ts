import Vue from "vue";
import BlockComponent from "./Block";

export default Vue.extend({
    template:`
    <div>
        <div class="stat-block">
            <hr class="orange-border"/>
            <div class="creature-heading">
                <h1>{{ data.name[0].toUpperCase() + data.name.slice(1) }}</h1>
                <span>HP: {{ data.hitPoints[0] }}</span>
                <br/>
                <span>Initiative: {{ data.initiative === undefined ? "not rolled" : data.initiative[0] }}</span>
            </div>
            <block-component :data="data.block"></block-component>
        </div>
    </div>
    `,
    name: "monster",
    props: ['data'],
    components: {
        BlockComponent
    }
});