<script setup lang="ts">
    import { watch } from "vue"

    const { displayTime = 2000 } = defineProps<{
        /** Time to display the toast for is ms (default 2000) */
        displayTime?: number
    }>()

    const visible = defineModel("visible", { default: false })

    watch(visible, value => {
        if (!value)
            return
        setTimeout(() => visible.value = false, displayTime)
    })
</script>

<template>
    <Teleport to="#app">
        <div :class="[$style.container, {
            [$style.visible]: visible,
        }]">
            <span><slot /></span>
        </div>
    </Teleport>
</template>

<style lang="scss" module>
    .container {
        position: fixed;
        white-space: nowrap;
        bottom: -3em;
        height: 3em;
        left: 50%;
        translate: -50% 0;
        pointer-events: none;
        border-radius: 100em;
        padding: 0 1.3em;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #333;
        color: #eee;
        font-size: 1.1em;
        transition: bottom .2s, opacity .2s;
        z-index: 200;
        opacity: 0;
    }

    .container.visible {
        bottom: 1em;
        opacity: 1;
    }
</style>