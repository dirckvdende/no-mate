
import type { Puzzle } from "@/types/puzzle"
import { knight, pawn, rook } from "../pieces"

export const puzzle: Puzzle = {
    spaces: [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 0, y: 1 },
        { x: 1, y: 1 },
        { x: 1, y: 2 },
        { x: 0, y: 3 },
        { x: 1, y: 3 },
        { x: 0, y: 4 },
        { x: 1, y: 4 },
    ],
    pieces: [pawn, pawn, pawn, pawn, knight, rook],
}