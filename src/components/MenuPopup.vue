<script setup lang="ts">
    import { mdiCloseThick, mdiFullscreen, mdiListStatus } from "@mdi/js"
    import Popup from "./Popup.vue"
    import PopupButton from "./PopupButton.vue"
    import MenuPopupButton from "./MenuPopupButton.vue"
    import { usePuzzleStore } from "@/stores/usePuzzleStore.ts"
    import { useFullscreen } from "@vueuse/core"

    const visible = defineModel("visible", { default: false })

    const { puzzleId } = usePuzzleStore()
    const { toggle: toggleFullscreen } = useFullscreen()

    function showPuzzleList(): void {
        visible.value = false
        puzzleId.value = null
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
                @click="showPuzzleList" />
            <MenuPopupButton
                :icon="mdiFullscreen"
                text="Toggle Fullscreen"
                @click="toggleFullscreen" />
        </div>
        <template v-slot:buttons>
            <PopupButton
                @click="visible = false"
                :icon="mdiCloseThick" />
        </template>
    </Popup>
</template>

<style lang="scss" module>
    .menu-items {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        margin: 0 0 1.5em 0;
    }
</style>