<script setup lang="ts">
    import { useSnapItem } from "@/composables/useSnapItemOld"
    import { puzzleKey } from "@/types/PuzzleProvide"
    import { computed, inject, useTemplateRef, watch } from "vue"

    const { initialPosition } = defineProps<{
        /** Initial/base position of the puzzle piece */
        initialPosition: [number, number]
    }>()
    
    const container = useTemplateRef("container")
    const { transform: { toPixelCoords, pixelSize } } = inject(puzzleKey)!
    const itemId = `piece-${initialPosition[0].toFixed()}`
        + `-${initialPosition[1].toFixed()}`
    const { style } = useSnapItem(container, itemId,
        computed(() => toPixelCoords(initialPosition)))
    const sizeStyle = computed(() => `
        width: ${1 / pixelSize.value * .9}px;
        height: ${1 / pixelSize.value * .9}px;
    `)
</script>

<template>
    <div
        ref="container"
        :class="$style.container"
        :style="[style, sizeStyle]" />
</template>

<style lang="scss" module>
    .container {
        position: absolute;
        background-color: blue;
    }
</style>