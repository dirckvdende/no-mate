<script setup lang="ts">
    import type { Puzzle } from "@/types/Puzzle"
    import { puzzleRender } from "@/util/puzzleRender";
    import { useElementSize } from "@vueuse/core";
    import { computed, useTemplateRef } from "vue";

    const { puzzle } = defineProps<{
        /** The puzzle to show */
        puzzle: Puzzle
    }>()

    const render = computed(() => puzzleRender(puzzle))
    const {
        width: containerWidth,
        height: containerHeight,
    } = useElementSize(useTemplateRef("puzzle"))

    const renderSize = computed<[number, number]>(() => {
        const { topLeft, bottomRight } = render.value
        return [
            bottomRight[0] - topLeft[0],
            bottomRight[1] - topLeft[1],
        ]
    })

    /**
     * Convert a position given by the puzzle render to a pixel position
     * @param position Position as given by the puzzle render
     * @returns The pixel position for display inside the puzzle container
     */
    function displayPosition(position: [number, number]): [number, number] {
        const { topLeft } = render.value
        const [width, height] = renderSize.value
        return [
            (position[0] - topLeft[0]) / width * containerWidth.value,
            (position[1] - topLeft[1]) / height * containerHeight.value,
        ]
    }

    const puzzleAspectRatioStyle = computed(() => {
        const [width, height] = renderSize.value
        if (height / width > 1.4)
            return `height: 35em; aspect-ratio: ${width} / ${height}`
        return `width: 25em; aspect-ratio: ${width} / ${height}`
    })

    const pixelRatio = computed(() =>
        containerWidth.value / renderSize.value[0])

    const spaceStyles = computed(() => {
        return render.value.spaces.map((space) => {
            const position = displayPosition(space.position)
            return `
                top: ${position[1]}px;
                left: ${position[0]}px;
                width: ${pixelRatio.value}px;
                height: ${pixelRatio.value}px;
            `
        })
    })
</script>

<template>
    <div :class="$style.container">
        <div
            :class="$style.puzzle"
            ref="puzzle"
            :style="puzzleAspectRatioStyle">
            <div
                v-for="spaceStyle in spaceStyles"
                :style="spaceStyle"
                :class="$style.space" />
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