<script setup lang="ts">
    import { useSnapItem } from "@/composables/useSnapItem"
    import type { Piece } from "@/types/puzzle"
    import type { Position } from "@/types/position"
    import { puzzleKey } from "@/types/PuzzleProvide"
    import { snapAreaKey } from "@/types/SnapAreaProvide"
    import { computed, inject, useTemplateRef } from "vue"
    import { syncPlacementAndTarget } from
        "@/composables/syncPlacementAndTarget"

    const { initialPosition } = defineProps<{
        /** Initial/base position of the puzzle piece */
        initialPosition: Position
        /** The puzzle piece to display */
        piece: Piece
    }>()

    const placement = defineModel<Position | null>("placement",
        { required: true })

    const container = useTemplateRef("container")
    const { transform: { toPixelCoords, pixelSize } } = inject(puzzleKey)!
    const { style, target } = useSnapItem(container, inject(snapAreaKey)!,
        computed(() => toPixelCoords(initialPosition)))
    const sizeStyle = computed(() => `
        width: ${1 / pixelSize.value * .9}px;
        height: ${1 / pixelSize.value * .9}px;
    `)

    syncPlacementAndTarget(placement, target)
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