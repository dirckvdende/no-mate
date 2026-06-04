<script setup lang="ts">
    import { puzzles } from "@/puzzles/puzzles"
    import { usePuzzleStore } from "@/stores/usePuzzleStore"
    import Icon from "./Icon.vue"
    import { mdiCheckBold, mdiChessBishop, mdiDotsHorizontal } from "@mdi/js"
    import { useCompletedPuzzlesStore } from
        "@/stores/useCompletedPuzzlesStore.ts"
    import Footer from "./Footer.vue"

    const { puzzleId } = usePuzzleStore()
    const { hasSolved, hasAttempted } = useCompletedPuzzlesStore()

    function loadLevel(id: keyof typeof puzzles): void {
        puzzleId.value = id
    }
</script>

<template>
    <h1 :class="$style.title">No Mate</h1>
    <h3 :class="$style.subtitle">A chess-like puzzle game</h3>
    <div :class="$style['level-list']">
        <div :class="$style.list">
            <button
                v-for="_, id in puzzles"
                :class="$style.level"
                @click="loadLevel(id)">
                #{{ id }}
                <div
                    v-if="hasSolved(id)"
                    :class="$style.checkmark">
                    <Icon :path="mdiCheckBold" :class="$style.icon" />
                </div>
                <div
                    v-else-if="hasAttempted(id)"
                    :class="$style.attempted">
                    <Icon :path="mdiDotsHorizontal" :class="$style.icon" />
                </div>
            </button>
        </div>
        <div :class="$style['fade-top']" />
        <div :class="$style['fade-bottom']" />
    </div>
    <Footer />
</template>

<style lang="scss" module>
    .title {
        font-size: 3.5em;
        margin: .8em 0 .2em 0;
        color: #333;
    }

    .subtitle {
        font-weight: normal;
        font-size: 1.3em;
        margin: 0 0 1em 0;
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
            overflow-x: hidden;
            overflow-y: auto;
            display: flex;
            flex-direction: row;
            justify-content: center;
            flex-wrap: wrap;
            scrollbar-color: #222 transparent;
            padding: 1.7em 0 1em 0;
        }

        .fade-top {
            position: absolute;
            height: 2em;
            top: -.01em;
            left: 0;
            width: 100%;
            background: linear-gradient(#eee, transparent);
            pointer-events: none;
        }

        .fade-bottom {
            position: absolute;
            height: 2em;
            bottom: -.01em;
            left: 0;
            width: 100%;
            background: linear-gradient(transparent, #eee);
            pointer-events: none;
        }
    }

    .level {
        width: 2.3em;
        height: 2.3em;
        font-size: 3em;
        background-color: #ddd;
        border-radius: .3em;
        box-sizing: border-box;
        border: .09em solid transparent;
        cursor: pointer;
        margin: .14em;
        position: relative;

        &:hover {
            border-color: #222;
        }

        .checkmark, .attempted {
            pointer-events: none;
            position: absolute;
            display: flex;
            justify-content: center;
            align-items: center;
            width: .8em;
            height: .8em;
            right: -.2em;
            top: -.2em;
            border-radius: .5em;

            .icon {
                fill: white;
                width: 65%;
                height: 65%;
            }
        }

        .checkmark {
            background-color: #1c9c0e;
        }

        .attempted {
            background-color: #ff6f00;
        }
    }
</style>