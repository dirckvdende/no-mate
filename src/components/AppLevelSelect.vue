<script setup lang="ts">
    import { puzzles } from "@/puzzles/puzzles"
    import { usePuzzleStore } from "@/stores/usePuzzleStore"
    import Icon from "./Icon.vue"
    import { mdiCheckBold } from "@mdi/js"

    const { puzzleId } = usePuzzleStore()

    function loadLevel(id: keyof typeof puzzles): void {
        puzzleId.value = id
    }
</script>

<template>
    <h1>Tomaat</h1>
    <div :class="$style['level-list']">
        <button
            v-for="_, id in puzzles"
            :class="$style.level"
            @click="loadLevel(id)">
            #{{ id }}
            <div :class="$style.checkmark">
                <Icon :path="mdiCheckBold" :class="$style.icon" />
            </div>
        </button>
    </div>
</template>

<style lang="scss" module>
    h1 {
        font-size: 3em;
        margin: 1.5em 0 1em 0;
    }

    .level-list {
        flex-shrink: 1;
        width: 100%;
        overflow-x: hidden;
        overflow-y: auto;
        display: flex;
        flex-direction: row;
        justify-content: center;
        flex-wrap: wrap;
        scrollbar-color: #222 transparent;
        margin-bottom: 4em;
    }

    .level {
        width: 3em;
        height: 3em;
        font-size: 2em;
        background-color: #ddd;
        border-radius: .3em;
        box-sizing: border-box;
        border: .07em solid transparent;
        cursor: pointer;
        margin: .14em;
        position: relative;

        &:hover {
            border-color: #222;
        }

        .checkmark {
            pointer-events: none;
            position: absolute;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 1em;
            height: 1em;
            right: -.2em;
            top: -.2em;
            background-color: #1c9c0e;
            border-radius: .5em;

            .icon {
                fill: white;
                width: 65%;
                height: 65%;
            }
        }
    }
</style>