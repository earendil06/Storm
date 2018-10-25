
<template>
    <encounter v-bind:data="encounter" staticId="static"></encounter>
</template>
<script>
    import Encounter from "./Encounter";

    export default {
        props: ['encounter'],
        components: {
            Encounter
        }
    }
</script>

