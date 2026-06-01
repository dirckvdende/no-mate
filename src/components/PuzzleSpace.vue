<script setup lang="ts">
    import { useSnapTarget } from "@/composables/useSnapTarget"
    import type { Position } from "@/types/position"
    import { puzzleKey } from "@/types/PuzzleProvide"
    import { snapAreaKey } from "@/types/SnapAreaProvide"
    import { computed, inject } from "vue"

    const { position, connections } = defineProps<{
        /** Position of the space */
        position: Position
        /**
         * Connections with other spaces in the order top, right, bottom, left
         */
        connections: [boolean, boolean, boolean, boolean],
    }>()

    const [
        connectedTop, 
        connectedRight, 
        connectedDown, 
        connectedLeft,
    ] = connections

    const { transform: { toPixelCoords, pixelSize } } = inject(puzzleKey)!
    const snapArea = inject(snapAreaKey)!

    const style = computed(() => {
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
        :class="[$style.container, {
            [$style['empty-top']]: !connectedTop,
            [$style['empty-right']]: !connectedRight,
            [$style['empty-down']]: !connectedDown,
            [$style['empty-left']]: !connectedLeft,
        }]"
        :style="style" />
</template>

<style lang="scss" module>
    .container {
        position: absolute;
        background-color: red;
    }

    $border-radius: .8em;

    // Top-left corner
    .empty-top.empty-left {
        border-top-left-radius: $border-radius;
    }

    // Top-right corner
    .empty-top.empty-right {
        border-top-right-radius: $border-radius;
    }

    // Bottom-left corner
    .empty-down.empty-left {
        border-bottom-left-radius: $border-radius;
    }

    // Bottom-right corner
    .empty-down.empty-right {
        border-bottom-right-radius: $border-radius;
    }
</style>