import Vue from "vue";
import BlockComponent from "./Block";

export default Vue.extend({
    template:`
    <div>
        <div class="stat-block">
            <hr class="orange-border"/>
            <div class="creature-heading">
                <h1>{{ data.entity.name[0].toUpperCase() + data.entity.name.slice(1) }}</h1>
                <span>HP: {{ data.entity.hitPoints }}</span>
                <br/>
                <span>Initiative: {{ data.entity.initiative === null ? "not rolled" : data.entity.initiative }}</span>
            </div>
            <block-component :data="data.entity.block"></block-component>
        </div>
    </div>
    `,
    name: "monster",
    props: ['data'],
    components: {
        BlockComponent
    }
});