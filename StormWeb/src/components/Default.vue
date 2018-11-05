<template>
    <div class="tototo" v-html="data"></div>
</template>

<script>
    export default {
        props: ["data"]
    }
</script>

<style scoped>
    .tototo {
        background-color:red;
    }
</style>
