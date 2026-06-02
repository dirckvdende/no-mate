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
        font-size: min(
            calc(2vh
                - env(safe-area-inset-top, 0px)
                - env(safe-area-inset-bottom, 0px)),
            calc(4vw
                - env(safe-area-inset-left, 0px)
                - env(safe-area-inset-right, 0px)),
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
