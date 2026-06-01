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
            [$style['c-top']]: connectedTop,
            [$style['c-right']]: connectedRight,
            [$style['c-down']]: connectedDown,
            [$style['c-left']]: connectedLeft,
        }]"
        :style="style" />
</template>

<style lang="scss" module>
    $border-radius: .8em;

    .container {
        position: absolute;
        background-color: #bbb;
        box-sizing: border-box;

        // Top-left corner
        &:not(.c-top):not(.c-left) {
            border-top-left-radius: $border-radius;
        }

        // Top-right corner
        &:not(.c-top):not(.c-right) {
            border-top-right-radius: $border-radius;
        }

        // Bottom-left corner
        &:not(.c-down):not(.c-left) {
            border-bottom-left-radius: $border-radius;
        }

        // Bottom-right corner
        &:not(.c-down):not(.c-right) {
            border-bottom-right-radius: $border-radius;
        }

        &.c-top {
            border-top: .1em solid #eee;
        }

        &.c-right {
            border-right: .1em solid #eee;
        }

        &.c-down {
            border-bottom: .1em solid #eee;
        }

        &.c-left {
            border-left: .1em solid #eee;
        }
    }
</style>