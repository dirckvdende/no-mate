<script setup lang="ts">
    import { useViewTransform } from "@/composables/useViewTransform"
    import type { Puzzle } from "@/types/Puzzle"
    import { puzzleRender } from "@/util/puzzleRender"
    import { computed, useTemplateRef } from "vue"

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

    const { pixelSize, toPixelCoords } = useViewTransform(
        container,
        computed(() => [render.value.topLeft, render.value.bottomRight]),
    )

    const spaceStyles = computed(() => {
        return render.value.spaces.map((space) => {
            const position = toPixelCoords(space.position)
            return `
                top: ${position[1]}px;
                left: ${position[0]}px;
                width: ${1 / pixelSize.value}px;
                height: ${1 / pixelSize.value}px;
            `
        })
    })
</script>

<template>
    <div :class="$style.container">
        <div
            :class="$style.puzzle"
            ref="puzzle"
            :style="containerStyle">
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