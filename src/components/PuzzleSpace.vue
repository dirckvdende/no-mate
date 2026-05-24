<script setup lang="ts">
    import { useSnapTarget } from "@/composables/useSnapTarget";
    import { puzzleKey } from "@/types/PuzzleProvide"
    import { snapAreaKey } from "@/types/SnapAreaProvide"
    import { computed, inject } from "vue"

    const { position } = defineProps<{
        /** Position of the space */
        position: [number, number]
    }>()

    const { transform: { toPixelCoords, pixelSize } } = inject(puzzleKey)!
    const snapArea = inject(snapAreaKey)!

    const style = computed(() => {
        return `
            left: ${toPixelCoords(position)[0]}px;
            top: ${toPixelCoords(position)[1]}px;
            width: ${1 / pixelSize.value * .9}px;
            height: ${1 / pixelSize.value * .9}px;
        `
    })

    useSnapTarget(snapArea,
        computed(() => `${position[0]},${position[1]}`),
        computed(() => ({
            x: toPixelCoords(position)[0],
            y: toPixelCoords(position)[1],
        })))
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