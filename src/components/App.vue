<script setup lang="ts">
    import { usePuzzleStore } from "@/stores/usePuzzleStore.ts";
    import Puzzle from "./Puzzle.vue"
    import { puzzle } from "@/puzzles/1"

    usePuzzleStore().puzzle.value = puzzle
</script>

<template>
    <div :class="$style.container">
        <div>
            <Puzzle />
        </div>
    </div>
</template>

<style lang="scss" module>
    body {
        background-color: #eee;
        margin: 0;
        font-size: min(2vh, 4vw);
        touch-action: none;
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
            justify-content: center;
            align-items: center;
        }
    }
</style>
