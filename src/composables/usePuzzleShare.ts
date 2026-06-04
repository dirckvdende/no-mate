
import { useCompletedPuzzlesStore } from "@/stores/useCompletedPuzzlesStore"
import { usePuzzleStore } from "@/stores/usePuzzleStore"

/**
 * Puzzle share functionality by copying text to the clipboard. The text will be
 * different depending on whether the puzzle has been solved or not.
 * @returns A function that can be called to share the current puzzle
 */
export function usePuzzleShare(): () => void {

    const { puzzleId } = usePuzzleStore()
    const { hasSolved } = useCompletedPuzzlesStore()

    function share(): void {
        if (puzzleId.value && hasSolved(puzzleId.value)) {
            navigator.clipboard.writeText(
                `🟩 I solved puzzle #${puzzleId.value}!\n` +
                window.location.href
            )
        } else {
            navigator.clipboard.writeText(
                `🟧 I'm trying to solve puzzle #${puzzleId.value}!\n` +
                window.location.href
            )
        }
    }

    return share

}