import Vue from "vue";
import {StaticHelpers} from "../StaticHelpers";
import * as $ from "jquery";

export default Vue.extend({
    template: `
<form v-on:submit.prevent="modify(data)">
<input type="submit" style="display: none"/>
            <div class="stat-block wide">
        <hr class="orange-border"/>
        <div class="section-left">
            <div class="creature-heading">
                <input id='name' type="text" v-bind:placeholder='data.name' autocomplete="off"/>
            </div>
            <svg height="5" width="100%" class="tapered-rule">
                <polyline points="0,0 400,2.5 0,5"></polyline>
            </svg>
            <div class="top-stats">
                <div class="property-line first">
                    <h4>Armor Class</h4>
                    <p>{{ data.stats.find(f => f.statType === "ac").statValue.formulae }}</p>
                </div>
                <div class="property-line">
                    <h4>Hit Points</h4>
                    <input id='hp' type="text" v-bind:placeholder='data.stats.find(f => f.statType === "hp").statValue.formulae + " (" + data.stats.find(f => f.statType === "hp").statValue.meanValue + ")"' autocomplete="off"/>
                </div>
                <div class="property-line last">
                    <h4>Speed</h4>
                    <p>{{ data.stats.find(f => f.statType === "speed").statValue.formulae }}</p>
                </div>
                <svg height="5" width="100%" class="tapered-rule">
                    <polyline points="0,0 400,2.5 0,5"></polyline>
                </svg>
                <div class="abilities">
                    <div class="ability-strength">
                        <h4>STR</h4>
                        <p>
                            {{ data.abilityScores.find(f => f.abilityType === "str").score }}
                            ({{ data.abilityScores.find(f => f.abilityType === "str").modifier }})
                        </p>
                    </div>
                    <div class="ability-dexterity">
                        <h4>DEX</h4>
                        <p>
                            {{ data.abilityScores.find(f => f.abilityType === "dex").score }}
                            ({{ data.abilityScores.find(f => f.abilityType === "dex").modifier }})
                        </p>
                    </div>
                    <div class="ability-constitution">
                        <h4>CON</h4>
                        <p>
                            {{ data.abilityScores.find(f => f.abilityType === "con").score }}
                            ({{ data.abilityScores.find(f => f.abilityType === "con").modifier }})
                        </p>
                    </div>
                    <div class="ability-intelligence">
                        <h4>INT</h4>
                        <p>
                            {{ data.abilityScores.find(f => f.abilityType === "int").score }}
                            ({{ data.abilityScores.find(f => f.abilityType === "int").modifier }})
                        </p>
                    </div>
                    <div class="ability-wisdom">
                        <h4>WIS</h4>
                        <p>
                            {{ data.abilityScores.find(f => f.abilityType === "wis").score }}
                            ({{ data.abilityScores.find(f => f.abilityType === "wis").modifier }})
                        </p>
                    </div>
                    <div class="ability-charisma">
                        <h4>CHA</h4>
                        <p>
                            {{ data.abilityScores.find(f => f.abilityType === "cha").score }}
                            ({{ data.abilityScores.find(f => f.abilityType === "cha").modifier }})
                        </p>
                    </div>
                </div> 
            </div>
            <svg height="5" width="100%" class="tapered-rule">
                <polyline points="0,0 400,2.5 0,5"></polyline>
            </svg>
            <div v-for="feature in data.features" class="property-block">
                <h4>{{ feature.name }}</h4>
                <p v-for="description in splitLine(feature.description)">{{ description }}<br/></p>
            </div>
        </div>
        <div class="section-right">
            <div class="actions">
                <h3>Actions</h3>
                <div v-for="action in data.actions" class="actions">
                    <div class="property-block">
                        <h4>{{ action.name }}</h4>
                        <p>
                            {{ action.toHit.length != 0 ? action.toHit + "." : "" }}
                            <br v-if="action.reach.length != 0">
                            {{ action.reach.length != 0 ? action.reach + "." : "" }}
                            <br v-if="action.range.length != 0">
                            {{ action.range.length != 0 ? action.range + "." : "" }}
                            <br v-if="action.hit.length != 0">
                            {{ action.hit.length != 0 ? action.hit + "." : "" }}
                            <br v-if="action.description != null && action.description.length != 0">
                        </p>
                        <p v-for="description in splitLine(action.description)">
                            {{ description.length == 0 ? "" : description }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <hr class="orange-border bottom"/>
    </div>
</form>
    `,
    name: "editable-block",
    props: ["data"],
    methods: {
        splitLine: function (description: string) : string[] {
            if (description == null) return [];
            return description.split('\n');
        },
        getHp: function () {

        },
        modify: function (data) {
            console.log("fdwd")
            let name = $('#name');
            if (name.val() !== '') {
                // let args = [monster.name, inputHp.val()];
                // let damageCommand = new DamageCommand();
                // this.push(res);
                // inputHp.val('');
                data.name = name;
            }
        }
    },
    mounted: function () {
        StaticHelpers.scrollWindow()
    }
});
