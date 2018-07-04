<template>
    <div>
        <div class="input-line line">
            <div class="prompt">{{ user }}</div>
            <div>
                <input style="color: white;" class="cmdline" v-bind:value="command.input" readonly="">
            </div>
        </div>
        <div style="padding-bottom: 10px; padding-top: 5px; color: white">
            <component :is="command.templateName" :data="command.output"></component>
        </div>
    </div>
</template>

<script lang="ts" src="Command.vue.ts"></script>