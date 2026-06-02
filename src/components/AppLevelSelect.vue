<script setup lang="ts">
    import { puzzles } from "@/puzzles/puzzles"
    import { usePuzzleStore } from "@/stores/usePuzzleStore"
    import Icon from "./Icon.vue"
    import { mdiCheckBold } from "@mdi/js"
    import { useCompletedPuzzlesStore } from
        "@/stores/useCompletedPuzzlesStore.ts"

    const { puzzleId } = usePuzzleStore()
    const { completedPuzzles } = useCompletedPuzzlesStore()

    function loadLevel(id: keyof typeof puzzles): void {
        puzzleId.value = id
    }
</script>

<template>
    <h1>Tomaat</h1>
    <div :class="$style['level-list']">
        <div :class="$style.list">
            <template v-for="_ in 100">
                <button
                    v-for="_, id in puzzles"
                    :class="$style.level"
                    @click="loadLevel(id)">
                    #{{ id }}
                    <div
                        v-if="completedPuzzles.find(v => v == id)"
                        :class="$style.checkmark">
                        <Icon :path="mdiCheckBold" :class="$style.icon" />
                    </div>
                </button>
            </template>
        </div>
        <div :class="$style['fade-top']" />
        <div :class="$style['fade-bottom']" />
    </div>
    <p :class="$style.credit">
        Created by Dirck van den Ende<br />
        <a href="https://dirck.dev/projects">View more projects</a>
    </p>
</template>

<style lang="scss" module>
    h1 {
        font-size: 3.5em;
        margin: 1.5em 0 .5em 0;
    }

    .level-list {
        flex-shrink: 1;
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 0;
        margin-bottom: 1em;
        position: relative;
        
        .list {
            width: 100%;
            flex-shrink: 1;
            flex-grow: 1;
            overflow-x: hidden;
            overflow-y: auto;
            display: flex;
            flex-direction: row;
            justify-content: center;
            flex-wrap: wrap;
            scrollbar-color: #222 transparent;
            padding: 1em 0;
        }

        .fade-top {
            position: absolute;
            height: 1.5em;
            top: -.1em;
            left: 0;
            width: 100%;
            background: linear-gradient(#eee, transparent);
            pointer-events: none;
        }

        .fade-bottom {
            position: absolute;
            height: 1.5em;
            bottom: -.1em;
            left: 0;
            width: 100%;
            background: linear-gradient(transparent, #eee);
            pointer-events: none;
        }
    }

    .level {
        width: 2.6em;
        height: 2.6em;
        font-size: 3em;
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
            width: .9em;
            height: .9em;
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

    .credit {
        text-align: center;
        color: #666;
        font-size: .8em;
        margin-bottom: 1em;

        & > a {
            color: inherit;
            text-decoration: underline;
        }
    }
</style>