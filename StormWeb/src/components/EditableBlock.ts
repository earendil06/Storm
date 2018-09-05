import Vue from "vue";
import {StaticHelpers} from "../StaticHelpers";
import * as $ from "jquery";
import {JsonParser} from "../resources/JsonParser";


let model = {};

export default Vue.extend({
    template: `
<div class="stat-block wide">
        <hr class="orange-border"/>
        <div class="section-left">
            <div class="creature-heading">
                <input id='name' type="text" v-bind:placeholder='block.name' autocomplete="off"/>
            </div>
            <svg height="5" width="100%" class="tapered-rule">
                <polyline points="0,0 400,2.5 0,5"></polyline>
            </svg>
            <div class="top-stats">
                <div class="property-line first">
                    <h4>Armor Class</h4>
                    <p>{{ block.stats.find(f => f.statType === "ac").statValue.formulae }}</p>
                </div>
                <div class="property-line">
                    <h4>Hit Points</h4>
                    <input id='hp' type="text" v-model="hp"
                    v-bind:placeholder='block.stats.find(f => f.statType === "hp").statValue.formulae'
                    autocomplete="off"/>
                    ( {{ meanHp }} )
                </div>
                <div class="property-line last">
                    <h4>Speed</h4>
                    <p>{{ block.stats.find(f => f.statType === "speed").statValue.formulae }}</p>
                </div>
                <svg height="5" width="100%" class="tapered-rule">
                    <polyline points="0,0 400,2.5 0,5"></polyline>
                </svg>
                <div class="abilities">
                    <div class="ability-strength">
                        <h4>STR</h4>
                        <p>
                            {{ block.abilityScores.find(f => f.abilityType === "str").score }}
                            ({{ block.abilityScores.find(f => f.abilityType === "str").modifier }})
                        </p>
                    </div>
                    <div class="ability-dexterity">
                        <h4>DEX</h4>
                        <p>
                            {{ block.abilityScores.find(f => f.abilityType === "dex").score }}
                            ({{ block.abilityScores.find(f => f.abilityType === "dex").modifier }})
                        </p>
                    </div>
                    <div class="ability-constitution">
                        <h4>CON</h4>
                        <p>
                            {{ block.abilityScores.find(f => f.abilityType === "con").score }}
                            ({{ block.abilityScores.find(f => f.abilityType === "con").modifier }})
                        </p>
                    </div>
                    <div class="ability-intelligence">
                        <h4>INT</h4>
                        <p>
                            {{ block.abilityScores.find(f => f.abilityType === "int").score }}
                            ({{ block.abilityScores.find(f => f.abilityType === "int").modifier }})
                        </p>
                    </div>
                    <div class="ability-wisdom">
                        <h4>WIS</h4>
                        <p>
                            {{ block.abilityScores.find(f => f.abilityType === "wis").score }}
                            ({{ block.abilityScores.find(f => f.abilityType === "wis").modifier }})
                        </p>
                    </div>
                    <div class="ability-charisma">
                        <h4>CHA</h4>
                        <p>
                            {{ block.abilityScores.find(f => f.abilityType === "cha").score }}
                            ({{ block.abilityScores.find(f => f.abilityType === "cha").modifier }})
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
    data: function() {
      return {
          hp: []
      }
    },
    methods: {
        splitLine: function (description: string) : string[] {
            if (description == null) return [];
            return description.split('\n');
        },
        getHp: function () {

        },
        save: function (data) {
            console.log("save has been called");
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
    computed: {
      meanHp: function () {
          let hpInput = this.hp;
          console.log(hpInput);
          if (hpInput.length != 0) {
              this.block.stats.find(f => f.statType === "hp").statValue = JsonParser.parseStatValue(hpInput);
          }
          // console.log(this.data.stats.find(f => f.statType === "hp"));
          return this.block.stats.find(f => f.statType === "hp").statValue === undefined ? "" : this.block.stats.find(f => f.statType === "hp").statValue.meanValue;
      }
    },
    mounted: function () {
        StaticHelpers.scrollWindow()
    }
});