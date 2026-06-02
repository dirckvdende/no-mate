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
        position: fixed;
        display: flex;
        justify-content: center;
        align-items: center;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;

        & > div {
            height: 100%;
            width: 100%;
            max-width: 35em;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
        }
    }
</style>
