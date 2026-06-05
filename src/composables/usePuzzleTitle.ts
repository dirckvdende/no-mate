import { computed, toValue, type ComputedRef, type MaybeRefOrGetter } from "vue"
import { usePuzzleFilter } from "./usePuzzleFilter"

/**
 * Get the title of a puzzle from its ID, which can depend on currently active
 * filters
 * @param puzzleId The puzzle ID to get the title of
 * @returns The puzzle title as a string
 */
export function usePuzzleTitle(
    puzzleId: MaybeRefOrGetter<string | null>
): ComputedRef<string> {

    const { filter } = usePuzzleFilter()

    return computed(() => {
        const id = toValue(puzzleId)
        if (id === null || filter.value(id) === false)
            return ""
        if (filter.value(id) === true)
            return `Puzzle #${id}`
        return `Puzzle ${filter.value(id)}`
    })

}