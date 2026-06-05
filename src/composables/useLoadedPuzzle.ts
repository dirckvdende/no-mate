
import { computed, watch, type ComputedRef, type Ref } from "vue"
import { puzzles } from "@/puzzles/puzzles"
import type { Puzzle } from "@/types/puzzle"
import { refWithControl, useUrlSearchParams, watchTriggerable } from "@vueuse/core"

/**
 * Composable for getting/loading a puzzle using query parameters
 * @returns Two refs: The "id" ref stores the name of the puzzle, and can be
 * used to change the current puzzle. The "puzzle" ref stores a ref to the
 * actual loaded puzzle
 */
export function useLoadedPuzzle(): {
    id: Ref<keyof typeof puzzles | null>
    puzzle: ComputedRef<Puzzle | null>
} {

    const queryParams = useUrlSearchParams()
    const id = refWithControl<keyof typeof puzzles | null>(null)

    const { trigger: triggerIdWatch } = watchTriggerable(id, (id) => {
        if (!id)
            delete queryParams.p
        else
            queryParams.p = id
    })

    watch(queryParams, () => {
        const queryValue = queryParams.p
        if (!queryValue
            || Array.isArray(queryValue)
            || !puzzles.hasOwnProperty(queryValue))
            id.value = null
        else
            id.value = queryValue as keyof typeof puzzles
        triggerIdWatch()
    }, { immediate: true })

    const puzzle = computed(() => {
        if (!id.value)
            return null
        return puzzles[id.value]!
    })

    return { id, puzzle }

}