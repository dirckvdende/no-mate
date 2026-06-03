<script setup lang="ts">
    import { mdiCheckBold } from "@mdi/js"
    import Popup from "./Popup.vue"
    import PopupButton from "./PopupButton.vue"
    import { computed } from "vue"
    import { usePuzzleStore } from "@/stores/usePuzzleStore.ts"
    import type { Piece } from "@/types/puzzle.ts"
import HelpPopupPiece from "./HelpPopupPiece.vue"

    const visible = defineModel("visible", { default: false })
    const { puzzle } = usePuzzleStore()

    const uniquePieces = computed(() => {
        if (!puzzle.value)
            return []
        const pieces: Piece[] = []
        for (const piece of puzzle.value.pieces) {
            if (pieces.find(({ name }) => name == piece.name))
                continue
            pieces.push(piece)
        }
        return pieces
    })
</script>

<template>
    <Popup v-model:visible="visible">
        <template v-slot:title>
            Help
        </template>
        <p :class="$style.text">
            Place the chess pieces on the board such that no piece can attack
            another. Pieces (or more specifically: the Rook, Bishop, and Queen)
            cannot attack another piece jumping over a non-placeable area.
        </p>
        <div :class="$style.pieces">
            <HelpPopupPiece v-for="piece in uniquePieces" :piece="piece" />
        </div>
        <template v-slot:buttons>
            <PopupButton
                @click="visible = false"
                :icon="mdiCheckBold"
                text="Got It!" />
        </template>
    </Popup>
</template>

<style lang="scss" module>
    .text {
        font-size: 1.1em;
        margin-top: 0;
    }

    .pieces {
        width: 100%;
        margin: 1em 0;
        display: flex;
        flex-direction: column;
        align-items: stretch;
    }
</style>