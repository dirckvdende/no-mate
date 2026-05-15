
import type { UseViewTransformReturn } from "@/composables/useViewTransform"
import type { InjectionKey } from "vue"

/**
 * Data provided by the Puzzle component
 */
export type PuzzleProvide = {
    /** Transform used for display of the puzzle */
    transform: UseViewTransformReturn
}

/** Key for provided data by Puzzle component */
export const puzzleKey = Symbol() as InjectionKey<PuzzleProvide>