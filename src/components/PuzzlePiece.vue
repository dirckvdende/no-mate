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
    import { usePuzzleStore } from "@/stores/usePuzzleStore.ts"
    import { mdiExclamationThick } from "@mdi/js"

    const { initialPosition, piece, pieceIndex } = defineProps<{
        /** Initial/base position of the puzzle piece */
        initialPosition: Position
        /** The puzzle piece to display */
        piece: Piece
        /** Index of the piece in the puzzle */
        pieceIndex: number
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

    const { state, puzzleInterface } = usePuzzleStore()
    const placedPosition = computed(() => {
        const position = state.value?.placements[pieceIndex]
        if (!position)
            return null
        return position
    })
    const isValid = computed(() => {
        if (!puzzleInterface.value || !placedPosition.value)
            return false
        return piece.isValid(puzzleInterface.value, placedPosition.value)
    })
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
            [$style['invalid-warn']]: !isValid && target,
        }]"
        :style="[style, sizeStyle, {
            backgroundColor: piece.color,
        }]">
        <Icon :path="piece.icon" :class="$style['piece-icon']" />
        <div :class="$style['warn-icon']">
            <Icon :path="mdiExclamationThick" :class="$style.icon" />
        </div>
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
        padding-bottom: .3em;
        border-radius: .7em;
        box-shadow: inset 0 -.5em 0 0 #0004;
        display: flex;
        justify-content: center;
        align-items: center;
        user-select: none;
        pointer-events: none;
        z-index: 1;
    }
    .display-box.dragging {
        scale: 1.1;
        opacity: .8;
        z-index: 2;
    }

    .piece-icon {
        fill: white;
        width: 60%;
        height: 60%;
    }

    .warn-icon {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #e04331;
        position: absolute;
        top: -.2em;
        right: -.2em;
        width: 1.5em;
        height: 1.5em;
        border-radius: .75em;
        scale: 1.4;
        opacity: 0;
        transition: scale .2s, opacity .2s;

        .icon {
            width: 80%;
            height: 80%;
            fill: white;
        }
    }
    .display-box.invalid-warn .warn-icon {
        scale: 1;
        opacity: 1;
    }
</style>