<script setup lang="ts">
    import { puzzleKey } from "@/types/PuzzleProvide"
    import { computed, inject } from "vue"

    const { position } = defineProps<{
        /** Position of the space */
        position: [number, number]
    }>()

    const { transform: { toPixelCoords, pixelSize } } = inject(puzzleKey)!

    const style = computed(() => {
        return `
            left: ${toPixelCoords(position)[0]}px;
            top: ${toPixelCoords(position)[1]}px;
            width: ${1 / pixelSize.value * .9}px;
            height: ${1 / pixelSize.value * .9}px;
        `
    })
</script>

<template>
    <div :class="$style.container" :style="style" />
</template>

<style lang="scss" module>
    .container {
        position: absolute;
        background-color: red;
    }
</style>