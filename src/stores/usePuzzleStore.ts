
import type { Puzzle, PuzzleState, PuzzleStateInterface } from "@/types/puzzle"
import { puzzleStateInterface } from "@/util/puzzleStateInterface"
import { createGlobalState } from "@vueuse/core"
import { computed, ref, toValue, watch, type ComputedRef, type MaybeRefOrGetter,
    type Ref } from "vue"

/** Store for the currently loaded puzzle and solving state */
export const usePuzzleStore = createGlobalState(() => {

    const puzzle: Ref<Puzzle | null> = ref(null)
    const state: Ref<PuzzleState | null> = ref(null)
    const puzzleInterface = computed(() => {
        if (!puzzle.value || !state.value)
            return null
        return puzzleStateInterface(puzzle.value, state.value)
    })

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
    }, { flush: "sync" })

    return {
        puzzle,
        state,
        isSolved: useIsSolved(puzzle, state, puzzleInterface),
    }

})

/**
 * Composable to check if a puzzle is in a solved state
 * @param puzzle The puzzle
 * @param state The puzzle state
 * @param puzzleInterface Puzzle state interface to pass to Piece.isValid
 * functions
 * @returns Whether the puzzle is in a solved state
 */
function useIsSolved(
    puzzle: MaybeRefOrGetter<Puzzle | null>,
    state: MaybeRefOrGetter<PuzzleState | null>,
    puzzleInterface: MaybeRefOrGetter<PuzzleStateInterface | null>,
): ComputedRef<boolean> {

    return computed(() => {
        const puzzleValue = toValue(puzzle)
        const stateValue = toValue(state)
        const puzzleInterfaceValue = toValue(puzzleInterface)
        if (!puzzleValue || !stateValue || !puzzleInterfaceValue)
            return false
        for (const [index, piece] of puzzleValue.pieces.entries()) {
            const position = stateValue.placements[index]
            if (!position)
                return false
            if (!piece.isValid(puzzleInterfaceValue, position))
                return false
        }
        return true
    })

}