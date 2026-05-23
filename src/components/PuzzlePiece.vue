<script setup lang="ts">
    import { useSnapItem } from "@/composables/useSnapItem"
    import { puzzleKey } from "@/types/PuzzleProvide"
import { snapAreaKey } from "@/types/SnapAreaProvide";
    import { computed, inject, useTemplateRef } from "vue"

    const { initialPosition } = defineProps<{
        /** Initial/base position of the puzzle piece */
        initialPosition: [number, number]
    }>()
    
    const container = useTemplateRef("container")
    const { transform: { toPixelCoords, pixelSize } } = inject(puzzleKey)!
    const { style } = useSnapItem(container, inject(snapAreaKey)!,
        computed(() => ({
            x: toPixelCoords(initialPosition)[0],
            y: toPixelCoords(initialPosition)[1],
        })))
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