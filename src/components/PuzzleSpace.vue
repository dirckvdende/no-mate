<script setup lang="ts">
    import { useSnapTarget } from "@/composables/useSnapTarget"
    import type { Position } from "@/types/position"
    import { puzzleKey } from "@/types/PuzzleProvide"
    import { snapAreaKey } from "@/types/SnapAreaProvide"
    import { computed, inject } from "vue"

    const { position, connections: _connections } = defineProps<{
        /** Position of the space */
        position: Position
        /**
         * Connections with other spaces in the order top, right, bottom, left
         */
        connections: [boolean, boolean, boolean, boolean],
    }>()

    const { transform: { toPixelCoords, pixelSize } } = inject(puzzleKey)!
    const snapArea = inject(snapAreaKey)!

    const containerStyle = computed(() => {
        return `
            left: ${toPixelCoords(position).x}px;
            top: ${toPixelCoords(position).y}px;
            width: ${1 / pixelSize.value}px;
            height: ${1 / pixelSize.value}px;
        `
    })

    useSnapTarget(snapArea,
        computed(() => `${position.x},${position.y}`),
        computed(() => toPixelCoords(position)))
</script>

<template>
    <div
        :class="$style.container"
        :style="containerStyle">
        <div :class="$style.square" />
    </div>
</template>

<style lang="scss" module>
    $border-radius: .8em;

    .container {
        position: absolute;
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        align-items: center;

        .square {
            border-radius: $border-radius;
            width: 85%;
            height: 85%;
            background-color: #c9c9c9;
        }
    }
</style>