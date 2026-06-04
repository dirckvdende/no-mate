<script setup lang="ts">
    import { usePuzzleStore } from "@/stores/usePuzzleStore.ts";
    import AppLevelSelect from "./AppLevelSelect.vue";
    import AppPuzzleView from "./AppPuzzleView.vue"

    const { puzzle } = usePuzzleStore()
</script>

<template>
    <div :class="$style.container">
        <div>
            <AppPuzzleView v-if="puzzle" />
            <AppLevelSelect v-else />
        </div>
    </div>
</template>

<style lang="scss" module>
    @use "@/scss/container";

    body {
        background-color: #eee;
        margin: 0;
        --true-width: calc(100lvw
            - env(safe-area-inset-left, 0px)
            - env(safe-area-inset-right, 0px));
        --true-height: calc(100lvh
            - env(safe-area-inset-top, 0px)
            - env(safe-area-inset-bottom, 0px));
        font-size: min(
            calc(var(--true-width) / 100 * 4),
            calc(var(--true-height) / 100 * 2),
        );
        touch-action: none;
        font-family: "Doppio One", sans-serif;
        color: #222;
        user-select: none;
    }

    button {
        font-size: 1em;
        font-family: inherit;
        color: inherit;
        outline: none;
        -webkit-tap-highlight-color: transparent;
    }

    .container {
        @extend %main-container;

        & > div {
            @extend %main-container-inside;
        }
    }
</style>
