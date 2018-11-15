<template>
    <div>
        <div class="stat-block">
            <hr class="orange-border"/>
            <div class="creature-heading">
                <h1>{{ data.name[0].toUpperCase() + data.name.slice(1) }}</h1>
                <span>HP: {{ data.hitPoints[0] }}</span>
                <br/>
                <span>Initiative: {{ data.initiative === undefined ? "not rolled" : data.initiative[0] }}</span>
            </div>
            <block :data="data.block"></block>
        </div>
    </div>
</template>

<script>
    import Block from "./Block";

    export default {
        props: ['data'],
        components: {
            Block
        }
    }
</script>