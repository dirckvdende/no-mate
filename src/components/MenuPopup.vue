<script setup lang="ts">
    import { mdiCloseThick, mdiFullscreen, mdiListStatus, mdiShareVariant, 
        mdiTrashCan } from "@mdi/js"
    import Popup from "./Popup.vue"
    import PopupButton from "./PopupButton.vue"
    import MenuPopupButton from "./MenuPopupButton.vue"
    import { usePuzzleStore } from "@/stores/usePuzzleStore.ts"
    import { useFullscreen } from "@vueuse/core"
    import { usePuzzleShare } from "@/composables/usePuzzleShare.ts"
    import Toast from "./Toast.vue"
    import { ref } from "vue"
    import ClearProgressPopup from "./ClearProgressPopup.vue"

    const visible = defineModel("visible", { default: false })

    const { puzzleId } = usePuzzleStore()
    const { toggle: toggleFullscreen } = useFullscreen()
    const shareToClipboard = usePuzzleShare()
    const copyToastVisible = ref(false)
    const clearProgressPopupVisible = ref(false)

    function showPuzzleList(): void {
        visible.value = false
        puzzleId.value = null
    }

    function sharePuzzle(): void {
        shareToClipboard()
        copyToastVisible.value = true
    }

    function showClearProgressPopup(): void {
        visible.value = false
        clearProgressPopupVisible.value = true
    }
</script>

<template>
    <Popup v-model:visible="visible">
        <template v-slot:title>
            Menu
        </template>
        <div :class="$style['menu-items']">
            <MenuPopupButton
                :icon="mdiListStatus"
                text="Puzzle List"
                @click="showPuzzleList"
                :icon-size=".9" />
            <MenuPopupButton
                :icon="mdiFullscreen"
                text="Toggle Fullscreen"
                @click="toggleFullscreen"
                :icon-size="1" />
            <MenuPopupButton
                :icon="mdiTrashCan"
                text="Delete Progress"
                @click="showClearProgressPopup"
                :icon-size=".9" />
            <MenuPopupButton
                :icon="mdiShareVariant"
                text="Share Puzzle"
                @click="sharePuzzle"
                :icon-size=".82" />
        </div>
        <template v-slot:buttons>
            <PopupButton
                @click="visible = false"
                :icon="mdiCloseThick" />
        </template>
    </Popup>
    <Toast v-model:visible="copyToastVisible">Copied to clipboard</Toast>
    <ClearProgressPopup v-model:visible="clearProgressPopupVisible" />
</template>

<style lang="scss" module>
    .menu-items {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        margin: 0 0 1.5em 0;
    }
</style>