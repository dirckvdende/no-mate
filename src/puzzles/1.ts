
import type { Piece } from "@/types/Piece"
import type { Puzzle } from "@/types/Puzzle"
import { mdiChessBishop } from "@mdi/js"

const piece: Piece = {
    name: "piece",
    icon: mdiChessBishop,
    color: "#9500ff",
    isValid: (puzzle, puzzleState, position) => {
        position = { ...position }
        return true
    },
}

export const puzzle: Puzzle = {
    spaces: [
        { x: 0, y: 0 },
        { x: 0, y: 1 },
        { x: 1, y: 0 },
    ],
    pieces: [piece, piece],
}