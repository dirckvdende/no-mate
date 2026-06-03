<script setup lang="ts">
    import { useViewTransform } from "@/composables/useViewTransform"
    import { puzzleRender } from "@/util/puzzleRender"
    import { computed, provide, ref, useTemplateRef, watch } from "vue"
    import PuzzleSpace from "./PuzzleSpace.vue"
    import PuzzlePiece from "./PuzzlePiece.vue"
    import { puzzleKey } from "@/types/PuzzleProvide"
    import { useSnapArea } from "@/composables/useSnapArea"
    import { snapAreaKey } from "@/types/SnapAreaProvide"
    import type { Position } from "@/types/position.ts"
    import { usePuzzleStore } from "@/stores/usePuzzleStore.ts"
    import LevelCompletedPopup from "./LevelCompletedPopup.vue"
    import { useCompletedPuzzlesStore } from
        "@/stores/useCompletedPuzzlesStore.ts"

    const { puzzle, puzzleId, state, isSolved } = usePuzzleStore()

    const container = useTemplateRef("puzzle")
    const render = computed(() => puzzle.value ? puzzleRender(puzzle.value) : {
        topLeft: { x: 0, y: 0 },
        bottomRight: { x: 0, y: 0 },
        spaces: [],
        pieces: [],
    })
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
        snapDistance: computed(() => .6 / transform.pixelSize.value),
    })
    provide(snapAreaKey, snapArea)

    // Show popup and store solved status once solved
    const popupVisible = ref(false)
    const { addSolved } = useCompletedPuzzlesStore()
    watch(isSolved, (solved, prevSolved) => {
        if (!solved || prevSolved == solved || !puzzleId.value)
            return
        popupVisible.value = true
        addSolved(puzzleId.value)
    })
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
                    :position="space.position"
                    :connections="space.connections" />
                <PuzzlePiece
                    v-for="piece, index in render.pieces"
                    :initial-position="piece.position"
                    :piece="puzzle!.pieces[index]!"
                    :piece-index="index"
                    v-model:placement="state!.placements[index]!" />
            </div>
        </div>
    </div>
    <LevelCompletedPopup v-model:visible="popupVisible" />
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
        box-sizing: border-box;
        aspect-ratio: 1 / 1;
        position: relative;
    }

    .puzzle-container {
        position: relative;
        width: 100%;
        height: 100%;
    }
</style>