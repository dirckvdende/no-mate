
import { computed, toValue, type ComputedRef, type MaybeRefOrGetter } from "vue"
import { usePuzzleFilter } from "./usePuzzleFilter"
import { puzzles } from "@/puzzles/puzzles"

/**
 * Get the ID of the next puzzle, given the current puzzle
 * @param puzzleId The puzzle ID to get the next puzzle for
 * @returns Computed ref to the ID of the next puzzle, or null if there is no
 * next puzzle
 */
export function useNextPuzzle(
    puzzleId: MaybeRefOrGetter<string | null>,
): ComputedRef<string | null> {

    const { filter } = usePuzzleFilter()

    return computed(() => {
        if (!toValue(puzzleId))
            return null
        let num = Number(toValue(puzzleId))
        if (!Number.isInteger(num))
            return null
        num++
        while (puzzles.hasOwnProperty(String(num))
            && filter.value(String(num)) === false)
            num++
        if (!puzzles.hasOwnProperty(String(num)))
            return null
        return String(num)
    })

}