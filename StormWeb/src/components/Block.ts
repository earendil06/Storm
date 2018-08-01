import Vue from "vue";
import {StaticHelpers} from "../StaticHelpers";

export default Vue.extend({
    template: `
            <div class="stat-block wide">
        <hr class="orange-border"/>
        <div class="section-left">
            <div class="creature-heading">
                <h1>{{ data.name }}</h1>
                <!--<h2>Medium construct, unaligned</h2>-->
            </div>
            <svg height="5" width="100%" class="tapered-rule">
                <polyline points="0,0 400,2.5 0,5"></polyline>
            </svg>
            <div class="top-stats">
                <div class="property-line first">
                    <h4>Armor Class</h4>
                    <p>{{ data.stats.find(f => f.statType === "ac").statValue.formulae }}</p>
                </div> <!-- property line -->
                <div class="property-line">
                    <h4>Hit Points</h4>
                    <p>{{ data.stats.find(f => f.statType === "hp").statValue.formulae }}
                        ({{data.stats.find(f => f.statType === "hp").statValue.meanValue}})</p>
                </div> <!-- property line -->
                <div class="property-line last">
                    <h4>Speed</h4>
                    <p>{{ data.stats.find(f => f.statType === "speed").statValue.formulae }}</p>
                </div> <!-- property line -->
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
                    </div> <!-- ability strength -->
                    <div class="ability-dexterity">
                        <h4>DEX</h4>
                        <p>
                            {{ data.abilityScores.find(f => f.abilityType === "dex").score }}
                            ({{ data.abilityScores.find(f => f.abilityType === "dex").modifier }})
                        </p>
                    </div> <!-- ability dexterity -->
                    <div class="ability-constitution">
                        <h4>CON</h4>
                        <p>
                            {{ data.abilityScores.find(f => f.abilityType === "con").score }}
                            ({{ data.abilityScores.find(f => f.abilityType === "con").modifier }})
                        </p>
                    </div> <!-- ability constitution -->
                    <div class="ability-intelligence">
                        <h4>INT</h4>
                        <p>
                            {{ data.abilityScores.find(f => f.abilityType === "int").score }}
                            ({{ data.abilityScores.find(f => f.abilityType === "int").modifier }})
                        </p>
                    </div> <!-- ability intelligence -->
                    <div class="ability-wisdom">
                        <h4>WIS</h4>
                        <p>
                            {{ data.abilityScores.find(f => f.abilityType === "wis").score }}
                            ({{ data.abilityScores.find(f => f.abilityType === "wis").modifier }})
                        </p>
                    </div> <!-- ability wisdom -->
                    <div class="ability-charisma">
                        <h4>CHA</h4>
                        <p>
                            {{ data.abilityScores.find(f => f.abilityType === "cha").score }}
                            ({{ data.abilityScores.find(f => f.abilityType === "cha").modifier }})
                        </p>
                    </div>
                </div> <!-- abilities -->
                <!--<svg height="5" width="100%" class="tapered-rule">
                    <polyline points="0,0 400,2.5 0,5"></polyline>
                </svg>-->


                <!--<div class="property-line first">
                    <h4>Damage Immunities</h4>
                    <p>poison, psychic</p>
                </div>
                <div class="property-line">
                    <h4>Condition Immunities</h4>
                    <p>blinded, charmed, deafened, exhaustion, frightened,
                        petrified, poisoned</p>
                </div>
                <div class="property-line">
                    <h4>Senses</h4>
                    <p>blindsight 60ft. (blind beyond this radius), passive Perception 6</p>
                </div>
                <div class="property-line">
                    <h4>Languages</h4>
                    <p>&mdash;</p>
                </div>
                <div class="property-line last">
                    <h4>Challenge</h4>
                    <p>1 (200 XP)</p>
                </div> -->
            </div>
            <svg height="5" width="100%" class="tapered-rule">
                <polyline points="0,0 400,2.5 0,5"></polyline>
            </svg>
            <div v-for="feature in data.features" class="property-block">
                <h4>{{ feature.name }}</h4>
                <p v-for="description in splitLine(feature.description)">{{ description }}<br/></p>
            </div> <!-- property block -->
        </div> <!-- section left -->
        <div class="section-right">
            <div class="actions">
                <h3>Actions</h3>
                <div v-for="action in data.actions" class="actions">
                    <div class="property-block">
                        <h4>{{ action.name }}</h4>
                        <p>
                            {{ action.toHit.length != 0 ? action.toHit + "." : "" }}
                            <br v-if="action.toHit.length != 0">
                            {{ action.reach.length != 0 ? action.reach + "." : "" }}
                            <br v-if="action.reach.length != 0">
                            {{ action.range.length != 0 ? action.range + "." : "" }}
                            <br v-if="action.range.length != 0">
                            {{ action.hit.length != 0 ? action.hit + "." : "" }}
                            <br v-if="action.hit.length != 0">
                            <!--{{ action.description == null ? "" : ". " + action.description }}-->
                        </p>
                        <p v-for="description in splitLine(action.description)">
                            {{ description.length == 0 ? "" : description }}
                            <br/>
                        </p>
                    </div>
                </div> <!-- property block -->
            </div> <!-- actions -->
            <!--<div class="actions">
                <h3>Legendary Actions</h3>
                <div class="property-block">
                    <h4>Multiattack.</h4>
                    <p>The armor makes two melee attacks.</p>
                </div>
                <div class="property-block">
                    <h4>Slam.</h4>
                    <p><i>Melee Weapon Attack:</i> +4 to hit, reach 5 ft., one target.
                        <i>Hit:</i> 5 (1d6 + 2) bludgeoning damage.</p>
                </div>
            </div>-->
        </div> <!-- section right -->
        <hr class="orange-border bottom"/>
    </div>
    `,
    name: "block",
    props: ["data"],
    methods: {
        splitLine: function (description) {
            if (description == null) return null;
            return description.split('\n');
        }
    },
    mounted: function () {
        StaticHelpers.scrollWindow()
    }
});
