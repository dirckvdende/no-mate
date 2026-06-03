
import { createGlobalState, useStorage } from "@vueuse/core"
import { puzzles } from "@/puzzles/puzzles"
import type { Ref } from "vue"

/** Store with a list of completed/attempted levels/puzzles */
export const useCompletedPuzzlesStore = createGlobalState(() => {

    const completedStorage = useStorage<string[]>("completed-levels", [])
    const attemptedStorage = useStorage<string[]>("attempted-levels", [])
    const completedPuzzles: Readonly<Ref<string[]>> = completedStorage
    const attemptedPuzzles: Readonly<Ref<string[]>> = attemptedStorage

    function resetSolved(): void {
        completedStorage.value = []
        attemptedStorage.value = []
    }

    function addSolved(id: keyof typeof puzzles): void {
        if (hasSolved(id))
            return
        completedStorage.value.push(id)
        const attemptedIndex = attemptedStorage.value.indexOf(id)
        if (attemptedIndex != -1)
            attemptedStorage.value.splice(attemptedIndex, 1)
    }

    function hasSolved(id: keyof typeof puzzles): boolean {
        return completedStorage.value.find(v => v == id) !== undefined
    }

    function addAttempted(id: keyof typeof puzzles): void {
        if (hasAttempted(id))
            return
        attemptedStorage.value.push(id)
    }

    function hasAttempted(id: keyof typeof puzzles): boolean {
        if (hasSolved(id))
            return true
        return attemptedStorage.value.find(v => v == id) !== undefined
    }

    return {
        completedPuzzles,
        attemptedPuzzles,
        resetSolved,
        addSolved,
        hasSolved,
        addAttempted,
        hasAttempted,
    }

})