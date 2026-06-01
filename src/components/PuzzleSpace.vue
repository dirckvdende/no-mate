<script setup lang="ts">
    import { useSnapTarget } from "@/composables/useSnapTarget"
    import type { Position } from "@/types/position"
    import { puzzleKey } from "@/types/PuzzleProvide"
    import { snapAreaKey } from "@/types/SnapAreaProvide"
    import { computed, inject } from "vue"

    const { position } = defineProps<{
        /** Position of the space */
        position: Position
    }>()

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
    <div :class="$style.container" :style="style" />
</template>

<style lang="scss" module>
    .container {
        position: absolute;
        background-color: red;
    }
</style>