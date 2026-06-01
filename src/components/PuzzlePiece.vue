<script setup lang="ts">
    import { useSnapItem } from "@/composables/useSnapItem"
    import type { Piece } from "@/types/puzzle"
    import type { Position } from "@/types/position"
    import { puzzleKey } from "@/types/PuzzleProvide"
    import { snapAreaKey } from "@/types/SnapAreaProvide"
    import { computed, inject, useTemplateRef } from "vue"
    import { syncPlacementAndTarget } from
        "@/composables/syncPlacementAndTarget"
    import Icon from "./Icon.vue"

    const { initialPosition } = defineProps<{
        /** Initial/base position of the puzzle piece */
        initialPosition: Position
        /** The puzzle piece to display */
        piece: Piece
    }>()

    const placement = defineModel<Position | null>("placement",
        { required: true })

    const dragContainer = useTemplateRef("drag-container")
    const dragElement = useTemplateRef("drag-element")
    const { transform: { toPixelCoords, pixelSize } } = inject(puzzleKey)!
    const {
        style,
        target,
        isDragging,
    } = useSnapItem(
        dragElement,
        inject(snapAreaKey)!,
        computed(() => toPixelCoords(initialPosition)),
        dragContainer,
    )
    const sizeStyle = computed(() => `
        width: ${1 / pixelSize.value}px;
        height: ${1 / pixelSize.value}px;
    `)

    syncPlacementAndTarget(placement, target)
</script>

<template>
    <div
        ref="drag-container"
        :class="$style['drag-container']">
        <div
            ref="drag-element"
            :class="$style['drag-element']"
            :style="[style, sizeStyle]" />
    </div>
    <div
        :class="[$style['display-box'], {
            [$style.dragging]: isDragging,
        }]"
        :style="[style, sizeStyle, {
            backgroundColor: piece.color,
        }]">
        <Icon :path="piece.icon" :class="$style.icon" />
    </div>
</template>

<style lang="scss" module>
    .drag-container {
        position: absolute;
        pointer-events: none;
        width: 100%;
        height: 100%;

        .drag-element {
            position: absolute;
            cursor: grab;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: blue;
            pointer-events: all;
        }
    }
    
    .display-box {
        position: absolute;
        left: 5%;
        top: 5%;
        scale: .9;
        background: black;
        box-sizing: border-box;
        border-radius: .5em;
        box-shadow: inset 0 -.5em 0 0 #0006;
        display: flex;
        justify-content: center;
        align-items: center;
        user-select: none;
        pointer-events: none;
    }

    .icon {
        fill: white;
        width: 60%;
        height: 60%;
    }

    .display-box.dragging {
        scale: 1.1;
        opacity: .8;
    }
</style>