<script setup lang="ts">
    import { mdiArrowLeftThick, mdiTrashCan } from "@mdi/js"
    import Popup from "./Popup.vue"
    import PopupButton from "./PopupButton.vue"
    import { usePuzzleStore } from "@/stores/usePuzzleStore.ts"
    import { useCompletedPuzzlesStore } from
        "@/stores/useCompletedPuzzlesStore.ts"

    const visible = defineModel("visible", { default: false })

    const { puzzleId } = usePuzzleStore()
    const { resetSolved } = useCompletedPuzzlesStore()

    function cancel(): void {
        visible.value = false
    }

    function confirm(): void {
        visible.value = false
        puzzleId.value = null
        resetSolved()
    }
</script>

<template>
    <Popup v-model:visible="visible">
        <template v-slot:title>
            Delete Progress
        </template>
        <p :class="$style.text">
            Are you sure you want to delete all progress and start over?
        </p>
        <template v-slot:buttons>
            <PopupButton
                :icon="mdiArrowLeftThick"
                @click="cancel" />
            <PopupButton
                :icon="mdiTrashCan"
                text="Delete"
                @click="confirm" />
        </template>
    </Popup>
</template>

<style lang="scss" module>
    .text {
        margin: 0 0 1.2em 0;
    }
</style>