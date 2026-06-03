<script setup lang="ts">
    import type { Piece } from "@/types/puzzle"
    import Icon from "./Icon.vue"

    const { piece } = defineProps<{
        /** The puzzle piece to show help for */
        piece: Piece
    }>()
</script>

<template>
    <div :class="$style.container">
        <div :class="$style['piece-container']">
            <div
                :class="$style.piece"
                :style="{
                    backgroundColor: piece.color,
                }">
                <Icon :class="$style.icon" :path="piece.icon" />
            </div>
        </div>
        <div :class="$style['text-container']">
            <span>
                <b>{{ piece.name }}</b><br />
                {{ piece.description }}
            </span>
        </div>
    </div>
</template>

<style lang="scss" module>
    .container {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .piece-container {
        width: 4.6em;
        height: 6em;
        box-sizing: border-box;
        padding: .7em 0;
        flex-shrink: 0;
        flex-grow: 0;
        margin-right: 1em;
    }

    .piece {
        border-radius: .7em;
        width: 100%;
        height: 100%;
        box-shadow: inset 0 -.5em 0 0 #0004;
        display: flex;
        justify-content: center;
        align-items: center;
        padding-bottom: .3em;
        box-sizing: border-box;

        .icon {
            fill: white;
            width: 60%;
            height: 60%;
        }
    }

    .text-container {
        flex-shrink: 1;
        flex-grow: 1;
    }
</style>