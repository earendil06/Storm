import Vue from "vue";
import {StaticHelpers} from "../StaticHelpers";
import {JsonParser} from "../resources/JsonParser";
import {Ability} from "../engine/Adapters";

export default Vue.extend({
    template: `
<div class="stat-block wide">
        <hr class="orange-border"/>
        <div class="section-left">
            <div class="creature-heading">
                <input id='name' type="text" v-model="name" autocomplete="off"/>
            </div>
            <svg height="5" width="100%" class="tapered-rule">
                <polyline points="0,0 400,2.5 0,5"></polyline>
            </svg>
            <div class="top-stats">
                <div class="property-line first">
                    <h4>Armor Class</h4>
                    <input id='name' type="text" v-model="ac" autocomplete="off"/>
                </div>
                <div class="property-line">
                    <h4>Hit Points</h4>
                    ({{ meanHp }})
                    <input id='hp' type="text" v-model="hp" autocomplete="off"/>
                </div>
                <div class="property-line last">
                    <h4>Speed</h4>
                    <input id='name' type="text" v-model="speed" autocomplete="off"/>
                </div>
                <svg height="5" width="100%" class="tapered-rule">
                    <polyline points="0,0 400,2.5 0,5"></polyline>
                </svg>
                <div class="abilities">
                    <div class="ability-strength">
                        <h4>STR</h4>
                        <p>
                            <input id='name' type="text" v-model="abilities.str.score" autocomplete="off"/>
                            ({{ abilityModifier(this.abilities.str) }})
                        </p>
                    </div>
                    <div class="ability-dexterity">
                        <h4>DEX</h4>
                        <p>
                            <input id='name' type="text" v-model="abilities.dex.score" autocomplete="off"/>
                            ({{ abilityModifier(this.abilities.dex) }})
                        </p>
                    </div>
                    <div class="ability-constitution">
                        <h4>CON</h4>
                        <p>
                            <input id='name' type="text" v-model="abilities.con.score" autocomplete="off"/>
                            ({{ abilityModifier(this.abilities.con) }})
                        </p>
                    </div>
                    <div class="ability-intelligence">
                        <h4>INT</h4>
                        <p>
                            <input id='name' type="text" v-model="abilities.int.score" autocomplete="off"/>
                            ({{ abilityModifier(this.abilities.int) }})
                        </p>
                    </div>
                    <div class="ability-wisdom">
                        <h4>WIS</h4>
                        <p>
                            <input id='name' type="text" v-model="abilities.wis.score" autocomplete="off"/>
                            ({{ abilityModifier(this.abilities.wis) }})
                        </p>
                    </div>
                    <div class="ability-charisma">
                        <h4>CHA</h4>
                        <p>
                            <input id='name' type="text" v-model="abilities.cha.score" autocomplete="off"/>
                            ({{ abilityModifier(this.abilities.cha) }})
                        </p>
                    </div>
                </div> 
            </div>
            <svg height="5" width="100%" class="tapered-rule">
                <polyline points="0,0 400,2.5 0,5"></polyline>
            </svg>
            <div v-for="feature in block.features" class="property-block">
                <h4>{{ feature.name }}</h4>
                <p v-for="description in splitLine(feature.description)">{{ description }}<br/></p>
            </div>
            <div @click="addFeature" style="color: blue; cursor: pointer">Add Feature</div>
        </div>
        <div class="section-right">
            <div class="actions">
                <h3>Actions</h3>
                <div v-for="action in block.actions" class="actions">
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
    `,
    name: "editable-block",
    props: ["block"],
    data: function () {
        return {
            name: this.block.name,
            ac: this.block.stats.find(f => f.statType === "ac").statValue.formulae,
            hp: this.block.stats.find(f => f.statType === "hp").statValue.formulae,
            speed: this.block.stats.find(f => f.statType === "speed").statValue.formulae,
            features: this.block.features,
            abilities: {
                str: this.block.abilityScores.find(f => f.abilityType === "str"),
                dex: this.block.abilityScores.find(f => f.abilityType === "dex"),
                con: this.block.abilityScores.find(f => f.abilityType === "con"),
                int: this.block.abilityScores.find(f => f.abilityType === "int"),
                cha: this.block.abilityScores.find(f => f.abilityType === "cha"),
                wis: this.block.abilityScores.find(f => f.abilityType === "wis")
            }
        }
    },
    methods: {
        addFeature: function (): void {
            this.features.push({
                name: "feature " + this.features.length,
                description: "description"
            })
        },
        splitLine: function (description: string): string[] {
            if (description == null) return [];
            return description.split('\n');
        },
        save: function (): void {
            console.log("save has been called");
            if (this.name !== undefined) {
                this.block.name = this.name;
            }
            if (this.ac !== undefined) {
                this.block.stats.find(f => f.statType === "ac").statValue = JsonParser.parseStatValue(this.ac);
            }
            if (this.hp !== undefined) {
                this.block.stats.find(f => f.statType === "hp").statValue = JsonParser.parseStatValue(this.hp);
            }
            if (this.speed !== undefined) {
                this.block.stats.find(f => f.statType === "speed").statValue = JsonParser.parseStatValue(this.speed);
            }

            let key;
            for (key in this.abilities) {
                let ability = this.abilities[key];
                let index = this.block.abilityScores.indexOf(this.block.abilityScores.find(f => f.abilityType === ability.abilityType));
                this.block.abilityScores[index] = JsonParser.parseAbility(ability);
            }
            console.log("after save");
            console.log(this.block)
        },
        abilityModifier: function (ability: Ability) {
            let newAbility = JsonParser.parseAbility(ability);
            return newAbility.modifier;
        }
    },
    computed: {
        meanHp: function () {
            return JsonParser.parseStatValue(this.hp).meanValue;
        }
    },
    mounted: function (): void {
        StaticHelpers.scrollWindow()
    }
});