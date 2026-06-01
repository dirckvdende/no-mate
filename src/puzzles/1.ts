
import type { Puzzle, Piece } from "@/types/puzzle"
import { mdiChessBishop } from "@mdi/js"

const piece: Piece = {
    name: "piece",
    icon: mdiChessBishop,
    color: "#9500ff",
    isValid: (_, position) => {
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