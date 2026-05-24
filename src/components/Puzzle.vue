<script setup lang="ts">
    import { useViewTransform } from "@/composables/useViewTransform"
    import type { Puzzle } from "@/types/Puzzle"
    import { puzzleRender } from "@/util/puzzleRender"
    import { computed, provide, useTemplateRef } from "vue"
    import PuzzleSpace from "./PuzzleSpace.vue"
    import PuzzlePiece from "./PuzzlePiece.vue"
    import { puzzleKey } from "@/types/PuzzleProvide"
    import { useSnapArea } from "@/composables/useSnapArea"
    import { snapAreaKey } from "@/types/SnapAreaProvide"
    import type { Position } from "@/types/Position"

    const { puzzle } = defineProps<{
        /** The puzzle to show */
        puzzle: Puzzle
    }>()

    const container = useTemplateRef("puzzle")
    const render = computed(() => puzzleRender(puzzle))
    const renderSize = computed<Position>(() => ({
        x: render.value.bottomRight.x - render.value.topLeft.x,
        y: render.value.bottomRight.y - render.value.topLeft.y,
    }))

    const containerStyle = computed(() => { 
        const { x: width, y: height } = renderSize.value
        if (height / width > 1.4)
            return `height: 35em; aspect-ratio: ${width} / ${height}`
        return `width: 25em; aspect-ratio: ${width} / ${height}`
    })

    const transform = useViewTransform(container, computed(() => ({
        topLeft: render.value.topLeft,
        bottomRight: render.value.bottomRight,
    })))
    provide(puzzleKey, { transform })

    const puzzleContainer = useTemplateRef("puzzle-container")
    const snapArea = useSnapArea(puzzleContainer, {
        snapDistance: 100,
    })
    provide(snapAreaKey, snapArea)
</script>

<template>
    <div :class="$style.container">
        <div
            :class="$style.puzzle"
            ref="puzzle"
            :style="containerStyle">
            <div ref="puzzle-container" :class="$style['puzzle-container']">
                <PuzzleSpace
                    v-for="space in render.spaces"
                    :position="space.position" />
                <PuzzlePiece
                    v-for="piece in render.pieces"
                    :initial-position="piece.position" />
            </div>
        </div>
    </div>
</template>

<style lang="scss" module>
    .container {
        width: 100%;
        max-height: calc(100% - 10em);
        aspect-ratio: 1 / 1.4;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .puzzle {
        background-color: green;
        aspect-ratio: 1 / 1;
        position: relative;
    }

    .space {
        position: absolute;
        width: 4em;
        height: 4em;
        background-color: red;
    }

    .puzzle-container {
        position: relative;
        width: 100%;
        height: 100%;
    }
</style>