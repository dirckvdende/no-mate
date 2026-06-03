<script setup lang="ts">
    import Icon from "./Icon.vue"

    const { icon, text } = defineProps<{
        /** Icon path to display in the button (default no icon) */
        icon?: string
        /** Text to display in the button (default no text) */
        text?: string
    }>()

    const emit = defineEmits<{
        /** Emitted when the button is clicked */
        (event: "click"): void
    }>()
</script>

<template>
    <button @click="emit('click')" :class="[$style.button, {
        [$style['has-text']]: Boolean(text),
    }]">
        <span v-if="text" :class="$style.text">{{ text }}</span>
        <Icon v-if="icon" :path="icon" :class="$style.icon" />
    </button>
</template>

<style lang="scss" module>
    .button {
        height: 3em;
        background-color: #ddd;
        border: none;
        border-radius: 100em;
        padding: .6em;
        box-sizing: border-box;
        color: #333;
        display: flex;
        flex-direction: row;
        align-items: center;
        cursor: pointer;
        border: .2em solid transparent;

        .icon {
            fill: #333;
            height: 100%;
        }

        .text {
            font-size: 1.1em;
            font-weight: bold;
            white-space: nowrap;
        }

        .text + .icon {
            margin-left: .5em;
        }
    }

    .button + .button {
        margin-left: .4em;
    }

    .button.has-text {
        padding: .6em 1.3em;
    }

    .button:hover {
        border-color: #333;
    }
</style>