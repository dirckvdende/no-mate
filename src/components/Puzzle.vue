<script setup lang="ts">
    import { useViewTransform } from "@/composables/useViewTransform"
    import type { Puzzle } from "@/types/Puzzle"
    import { puzzleRender } from "@/util/puzzleRender"
    import { computed, provide, useTemplateRef } from "vue"
    import SnapArea from "./SnapArea.vue"
    import PuzzleSpace from "./PuzzleSpace.vue"
    import { puzzleKey } from "@/types/PuzzleProvide"

    const { puzzle } = defineProps<{
        /** The puzzle to show */
        puzzle: Puzzle
    }>()

    const container = useTemplateRef("puzzle")
    const render = computed(() => puzzleRender(puzzle))
    const renderSize = computed<[number, number]>(() => [
        render.value.bottomRight[0] - render.value.topLeft[0],
        render.value.bottomRight[1] - render.value.topLeft[1],
    ])

    const containerStyle = computed(() => { 
        const [width, height] = renderSize.value
        if (height / width > 1.4)
            return `height: 35em; aspect-ratio: ${width} / ${height}`
        return `width: 25em; aspect-ratio: ${width} / ${height}`
    })

    const transform = useViewTransform(
        container,
        computed(() => [render.value.topLeft, render.value.bottomRight]),
    )
    provide(puzzleKey, { transform })
    const { toPixelCoords } = transform

    const targets = computed(() => new Map(puzzle.spaces.map(
        (position, index) => [
            String(index),
            toPixelCoords(position)
        ] as const
    )))
</script>

<template>
    <div :class="$style.container">
        <div
            :class="$style.puzzle"
            ref="puzzle"
            :style="containerStyle">
            <SnapArea :targets="targets" :snap-distance="100">
                <PuzzleSpace
                    v-for="space in render.spaces"
                    :position="space.position" />
            </SnapArea>
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
</style>