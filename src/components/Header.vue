<script setup lang="ts">
    import { mdiDotsHorizontal, mdiHelp } from "@mdi/js"
    import Icon from "./Icon.vue"
    import { usePuzzleStore } from "@/stores/usePuzzleStore.ts"

    const {
        title = "",
    } = defineProps<{
        /** Title to display in the middle of the header */
        title?: string
    }>()

    const { puzzleId } = usePuzzleStore()
</script>

<template>
    <header>
        <div :class="$style.container">
            <div :class="$style.left">
                <button
                    :class="$style['nav-button']"
                    @click="puzzleId = null">
                    <Icon :path="mdiDotsHorizontal" :class="$style.icon" />
                </button>
            </div>
            <div :class="$style.center">
                <h1 :class="$style.title">{{ title }}</h1>
            </div>
            <div :class="$style.right">
                <button :class="$style['nav-button']">
                    <Icon :path="mdiHelp" :class="$style.icon" />
                </button>
            </div>
        </div>
    </header>
</template>

<style lang="scss" module>
    header {
        width: 100%;
        height: 5.5em;
        padding: 1em;
        box-sizing: border-box;
    }

    .container {
        width: 100%;
        height: 100%;
        background-color: #333;
        border-radius: 100em;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        color: #eee;
        box-sizing: border-box;
        padding: .3em .6em;

        .left, .right {
            display: flex;
            flex-direction: row;
            align-items: center;
            height: 100%;
            
            .nav-button {
                height: 100%;
                aspect-ratio: 1 / 1;
                border-radius: 100em;
                display: flex;
                justify-content: center;
                align-items: center;
                background-color: transparent;
                border: none;
                cursor: pointer;

                .icon {
                    fill: #eee;
                    width: 90%;
                    height: 90%;
                }

                &:hover {
                    background-color: #eee;
                    
                    .icon {
                        fill: #333;
                    }
                }
            }
        }

        .center {

            .title {
                font-size: 1.5em;
                font-weight: normal;
            }
        }
    }
</style>