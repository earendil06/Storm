<template>
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
                    <p>{{ data.stats.find(f => f.type === "ARMOR_CLASS").formulae }}</p>
                </div> <!-- property line -->
                <div class="property-line">
                    <h4>Hit Points</h4>
                    <p>{{ data.stats.find(f => f.type === "HIT_POINTS").formulae }}
                        ({{data.stats.find(f => f.type === "HIT_POINTS").meanValue}})</p>
                </div> <!-- property line -->
                <div class="property-line last">
                    <h4>Speed</h4>
                    <p>{{ data.stats.find(f => f.type === "SPEED").formulae }}</p>
                </div> <!-- property line -->
                <svg height="5" width="100%" class="tapered-rule">
                    <polyline points="0,0 400,2.5 0,5"></polyline>
                </svg>
                <div class="abilities">
                    <div class="ability-strength">
                        <h4>STR</h4>
                        <p>
                            {{ data.abilityScores.find(f => f.abilityType === "STRENGTH").score }}
                            ({{ data.abilityScores.find(f => f.abilityType === "STRENGTH").modifier }})
                        </p>
                    </div> <!-- ability strength -->
                    <div class="ability-dexterity">
                        <h4>DEX</h4>
                        <p>
                            {{ data.abilityScores.find(f => f.abilityType === "DEXTERITY").score }}
                            ({{ data.abilityScores.find(f => f.abilityType === "DEXTERITY").modifier }})
                        </p>
                    </div> <!-- ability dexterity -->
                    <div class="ability-constitution">
                        <h4>CON</h4>
                        <p>
                            {{ data.abilityScores.find(f => f.abilityType === "CONSTITUTION").score }}
                            ({{ data.abilityScores.find(f => f.abilityType === "CONSTITUTION").modifier }})
                        </p>
                    </div> <!-- ability constitution -->
                    <div class="ability-intelligence">
                        <h4>INT</h4>
                        <p>
                            {{ data.abilityScores.find(f => f.abilityType === "INTELLIGENCE").score }}
                            ({{ data.abilityScores.find(f => f.abilityType === "INTELLIGENCE").modifier }})
                        </p>
                    </div> <!-- ability intelligence -->
                    <div class="ability-wisdom">
                        <h4>WIS</h4>
                        <p>
                            {{ data.abilityScores.find(f => f.abilityType === "WISDOM").score }}
                            ({{ data.abilityScores.find(f => f.abilityType === "WISDOM").modifier }})
                        </p>
                    </div> <!-- ability wisdom -->
                    <div class="ability-charisma">
                        <h4>CHA</h4>
                        <p>
                            {{ data.abilityScores.find(f => f.abilityType === "CHARISMA").score }}
                            ({{ data.abilityScores.find(f => f.abilityType === "CHARISMA").modifier }})
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
                            {{ action.toHit != null ? action.toHit + "." : "" }}
                            {{ action.reach != null ? action.reach + "." : "" }}
                            {{ action.range != null ? action.range + "." : "" }}
                            {{ action.hit != null ? action.hit + "." : "" }}
                            <!--{{ action.description == null ? "" : ". " + action.description }}-->
                        </p>
                        <p v-for="description in splitLine(action.description)">
                            {{ description == null ? "" : description }}
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
    </div> <!-- stat block -->
</template>

<script lang="ts" src="Block.vue.ts"></script>

<style scoped>

    .stat-block.wide {
        text-align: center;
        font-size: 13.5px;
        line-height: 1.2em;
        color: black;
    }

    .stat-block.wide {
        box-sizing: border-box;
        max-width: 100%;
        font-family: 'Noto Sans', 'Myriad Pro', Calibri, Helvetica,
        Arial, sans-serif;
        color: black;
    }

    .stat-block {
        text-align: left;
        margin: 20px;
        display: inline-block;
        vertical-align: top;
        width: 17%;
        min-width: 280px;
        background: #FDF1DC;
        padding: 5px 10px 20px;
        box-shadow: 0 0 1.5em #867453;
        color: black;
    }

    .stat-block.wide {
        width: 46.5%;
        min-width: 560px;
        text-align: center;
    }

    .stat-block.wide .section-left,
    .stat-block.wide .section-right {
        display: inline-block;
        vertical-align: top;
        width: 48%;
        text-align: left;
    }

    .stat-block.wide .section-left {
        margin-right: 1.5%;
    }

    .stat-block.wide .section-right {
        margin-left: 1.5%;
    }

    @media screen and (max-width: 675px) {
        .stat-block.wide {
            min-width: 280px;
        }

        .stat-block.wide .section-left,
        .stat-block.wide .section-right {
            display: block;
            width: 100%;
        }

        .stat-block.wide .section-left {
            margin: 0;
        }

        .stat-block.wide .section-right {
            margin: 0;
        }
    }

    .orange-border {
        display: block;
        background: #E69A28;
        border: 1px solid #000;
        height: 5px;
        padding: 0 10px 0;
        margin: -10px -10px 0;
        box-sizing: initial;
    }

    .orange-border.bottom {
        margin: 15px -10px -20px;
    }

    .tapered-rule {
        display: block;
        width: 100%;
        height: 5px;
        border: none;
        color: #922610 !important;
        fill: #922610 !important;
        stroke: #922610 !important;
    }

    .creature-heading h1 {
        font-family: 'Libre Baskerville', 'Lora', 'Calisto MT', 'Bookman Old Style', Bookman, 'Goudy Old Style', Garamond, 'Hoefler Text', 'Bitstream Charter', Georgia, serif;
        color: #922610;
        font-size: 23px;
        line-height: 1.2em;
        margin: 10px 0 0;
        letter-spacing: 1px;
        font-variant: small-caps;
        font-weight: bold;
    }

    .creature-heading h2 {
        font-weight: normal;
        font-style: italic;
        font-size: 12px;
        line-height: 1.2em;
        margin: 0 0 10px;
    }

    .property-line h4,
    .property-line p {
        display: inline;
        margin: 0;
        color: #922610 !important;
        font-size: 13.5px;
        line-height: 1.2em;
    }

    .property-line h4 {
        color: #7A200D;
    }

    .property-line {
        text-indent: -1em;
        padding-left: 1.1em;
        line-height: 1.4em;
    }

    .property-line.first {
        margin: 8px 0 0
    }

    .property-line.last {
        margin: 0 0 10px;
    }

    .abilities {
        text-align: center;
        color: #922610 !important;
    }

    .abilities > div {
        display: inline-block;
        vertical-align: middle;
        width: 15.5%;
        min-width: 40px;
        font-size: 12px;
        line-height: 1em;
    }

    .abilities h4 {
        margin: 10px 0 2px;
        font-size: 14px;
        line-height: 1.2em;
        text-transform: uppercase;
        color: #7A200D;
    }

    .abilities p {
        margin: 0 0 10px;
        line-height: 1.2em;
    }

    .property-block h4,
    .property-block p {
        font-size: 13.5px;
        line-height: 1.2em;
        display: inline;
        margin: 0;
    }

    .property-block h4 {
        font-style: italic;
    }

    .property-block {
        padding: 10px 2px 0;
    }

    .actions h3 {
        border-bottom: 1px solid #7A200D;
        color: #7A200D;
        font-size: 21px;
        font-variant: small-caps;
        font-weight: normal;
        letter-spacing: 1px;
        margin: 20px 0 0;
        padding: 0 0 10px;
        text-indent: 5px;
    }

    .actions {
        margin: 0 0 20px;
    }

    .actions:last-child {
        margin: 0;
    }

    @media print {
        .orange-border {
            display: none;
        }

        .stat-block,
        .stat-block.wide,
        .stat-block.wide .section-left,
        .stat-block.wide .section-right,
        .property-line,
        .property-block {
            width: 100%;
            display: block;
        }

        .stat-block.wide .section-left {
            margin: 0;
        }

        .stat-block.wide .section-right {
            margin: 0;
        }

        .stat-block {
            width: 40%;
            display: inline-block;
            vertical-align: top;
        }

        .stat-block.wide {
            page-break-after: always;
        }
    }

    @media screen and (max-width: 575px) {
        .stat-block {
            margin: 20px 0;
        }
    }

</style>