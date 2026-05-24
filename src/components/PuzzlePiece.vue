<script setup lang="ts">
    import { useSnapItem } from "@/composables/useSnapItem"
    import type { Piece } from "@/types/Piece"
    import type { Position } from "@/types/Position"
    import { puzzleKey } from "@/types/PuzzleProvide"
    import { snapAreaKey } from "@/types/SnapAreaProvide"
    import { computed, inject, useTemplateRef } from "vue"

    const { initialPosition } = defineProps<{
        /** Initial/base position of the puzzle piece */
        initialPosition: Position
        /** The puzzle piece to display */
        piece: Piece
    }>()

    const container = useTemplateRef("container")
    const { transform: { toPixelCoords, pixelSize } } = inject(puzzleKey)!
    const { style } = useSnapItem(container, inject(snapAreaKey)!,
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
        :style="[style, sizeStyle, {
            backgroundColor: piece.color,
        }]" />
</template>

<style lang="scss" module>
    .container {
        position: absolute;
        background-color: blue;
    }
</style>