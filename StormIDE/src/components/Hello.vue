<template>
    <div>
        <div class="greeting">Hello {{name}}{{exclamationMarks}}</div>
        <button @click="decrement">-</button>
        <button @click="increment">+</button>
    </div>
</template>

<script lang="ts" src="./Hello.vue.ts"></script>

<style>
    .greeting {
        font-size: 20px;
    }
</style>