<script setup lang="ts">
    const { path } = defineProps<{
        /** SVG path of the icon */
        path: string
    }>()
</script>

<template>
    <svg
        :class="$style.svg"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24">
        <path :d="path" />
    </svg>
</template>

<style lang="scss" module>
    .svg {
        display: block;
        aspect-ratio: 1 / 1;
        width: 100%;
        height: 100%;
    }
</style>