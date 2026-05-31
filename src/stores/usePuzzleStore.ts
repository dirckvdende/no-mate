
import type { Puzzle, PuzzleState } from "@/types/puzzle"
import { createGlobalState } from "@vueuse/core"
import { ref, watch, type Ref } from "vue"

/** Store for the currently loaded puzzle and solving state */
export const usePuzzleStore = createGlobalState(() => {
    const puzzle: Ref<Puzzle | null> = ref(null)
    const state: Ref<PuzzleState | null> = ref(null)

    // When the puzzle changes, reset puzzle state
    watch(puzzle, (puzzle, prevPuzzle) => {
        if (puzzle == prevPuzzle)
            return
        if (!puzzle) {
            state.value = null
            return
        }
        state.value = {
            placements: puzzle.pieces.map(() => null)
        }
    })

    return { puzzle, state }
})