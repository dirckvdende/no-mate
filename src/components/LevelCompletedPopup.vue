<script setup lang="ts">
    import { mdiArrowRight, mdiCheckBold, mdiDotsHorizontal } from "@mdi/js"
    import Popup from "./Popup.vue"
    import PopupButton from "./PopupButton.vue"
    import Icon from "./Icon.vue"
    import { usePuzzleStore } from "@/stores/usePuzzleStore"
    import { puzzles } from "@/puzzles/puzzles.ts"
    import { computed } from "vue"

    const visible = defineModel("visible", { default: false })

    const { puzzleId } = usePuzzleStore()

    function showLevelSelect(): void {
        visible.value = false
        puzzleId.value = null
    }

    const nextPuzzleId = computed(() => {
        if (!puzzleId.value)
            return null
        const index = Number(puzzleId.value)
        if (!Number.isInteger(index))
            return null
        const nextId = String(index + 1)
        if (!puzzles.hasOwnProperty(nextId))
            return null
        return nextId
    })

    function loadNextPuzzle(): void {
        const nextId = nextPuzzleId.value
        if (nextId === null)
            return
        visible.value = false
        puzzleId.value = nextId as keyof typeof puzzles
    }
</script>

<template>
    <Popup v-model:visible="visible">
        <template v-slot:title>
            Puzzle Solved!
        </template>
        <div :class="$style['check-container']">
            <div>
                <Icon :class="$style.icon" :path="mdiCheckBold" />
            </div>
        </div>
        <p v-if="!nextPuzzleId" :class="$style['no-next-text']">
            It looks like you've reached the last puzzle. Keep your eyes peeled
            for more puzzles coming soon!
        </p>
        <template v-slot:buttons>
            <PopupButton
                v-if="nextPuzzleId"
                :icon="mdiDotsHorizontal"
                @click="showLevelSelect" />
            <PopupButton
                v-else
                :icon="mdiDotsHorizontal"
                text="Puzzle List"
                @click="showLevelSelect" />
            <PopupButton
                v-if="nextPuzzleId"
                :icon="mdiArrowRight"
                text="Next Puzzle"
                @click="loadNextPuzzle" />
        </template>
    </Popup>
</template>

<style lang="scss" module>
    .check-container {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        margin: 1em 0 2em 0;

        & > div {
            width: 7em;
            height: 7em;
            border-radius: 50%;
            background-color: #1c9c0e;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }

    .icon {
        fill: white;
        width: 70%;
        height: 70%;
    }

    .no-next-text {
        font-size: 1.2em;
        text-align: center;
    }
</style>