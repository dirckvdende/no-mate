<script setup lang="ts">
    import Icon from "./Icon.vue"

    const { icon, text } = defineProps<{
        /** Icon to display inside the button */
        icon: string
        /** Text to display inside the button */
        text: string
    }>()

    const emit = defineEmits<{
        /** Emitted when the button is clicked */
        (event: "click"): void
    }>()
</script>

<template>
    <button @click="emit('click')" :class="$style.button">
        <div :class="$style['icon-container']">
            <Icon :path="icon" :class="$style.icon" />
        </div>
        <span :class="$style.text">{{ text }}</span>
    </button>
</template>

<style lang="scss" module>
    .button {
        height: 3em;
        background-color: #ddd;
        border: none;
        border-radius: 100em;
        box-sizing: border-box;
        color: #333;
        display: flex;
        flex-direction: row;
        align-items: center;
        cursor: pointer;
        border: .2em solid transparent;
        padding: .3em 1.3em;

        .icon-container {
            height: 100%;
            aspect-ratio: 1 / 1;
            flex-shrink: 0;
            flex-grow: 0;

            .icon {
                fill: #333;
            }
        }

        .text {
            font-size: 1.1em;
            font-weight: bold;
            white-space: nowrap;
            margin-left: 1em;
        }
    }

    .button + .button {
        margin-top: .4em;
    }

    .button:hover {
        border-color: #333;
    }
</style>