<template>
    <a v-if="data.download" download :href="data.link">{{ data.text }}</a>
    <a v-else :href="data.link">{{ data.text }}</a>
</template>

<script>
    export default {
        props: ["data"]
    }
</script>
