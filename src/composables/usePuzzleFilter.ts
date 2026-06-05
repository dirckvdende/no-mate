
import { computed, toRef, type ComputedRef } from "vue"
import { useQueryParams } from "./useQueryParams"

/**
 * Filter for puzzles that are part of the blog post about this puzzle game
 * @param id The id of the puzzle
 * @returns The renamed puzzle as a string, or false if the puzzle is not part
 * of the post
 */
function blogPostFilter(id: string): false | string {
    return {
        "5": "1",
        "9": "2",
        "11": "3",
    }[id] ?? false
}

/**
 * Composable for managing currently active puzzle filter, which is applied to
 * the level selection screen, next level button, and puzzle name display
 * @returns Puzzle filter utilities
 */
export function usePuzzleFilter(): {
    name: ComputedRef<string>
    filter: ComputedRef<(id: string) => boolean | string>
    remove: () => void
} {

    const queryParams = useQueryParams()
    const filterString = toRef(queryParams, "filter")
    const name = computed(() =>
        Array.isArray(filterString.value) ? "" : filterString.value)

    const filter = computed<(id: string) => boolean | string>(() => {
        if (name.value == "blog-post")
            return blogPostFilter
        return () => true
    })

    function remove(): void {
        queryParams.filter = ""
    }

    return { name, filter, remove }

}