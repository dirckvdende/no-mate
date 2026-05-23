
import type { Puzzle } from "@/types/Puzzle"
import { createGlobalState } from "@vueuse/core"
import { ref, type Ref } from "vue"

/** Store for the currently loaded puzzle */
export const usePuzzleStore = createGlobalState(() => {
    const puzzle: Ref<Puzzle | null> = ref(null)
    return { puzzle }
})