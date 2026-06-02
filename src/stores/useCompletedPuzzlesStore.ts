
import { createGlobalState, useStorage } from "@vueuse/core"
import { puzzles } from "@/puzzles/puzzles"
import type { Ref } from "vue"

/** Store with a list of completed levels/puzzles */
export const useCompletedPuzzlesStore = createGlobalState(() => {

    const storage = useStorage("completed-levels", [] as string[])
    const completedPuzzles: Readonly<Ref<string[]>> = storage

    function resetSolved(): void {
        storage.value = []
    }

    function addSolved(id: keyof typeof puzzles): void {
        if (!hasSolved(id))
            storage.value.push(id)
    }

    function hasSolved(id: keyof typeof puzzles): boolean {
        return storage.value.find(v => v == id) !== undefined
    }

    return { completedPuzzles, resetSolved, addSolved, hasSolved }

})