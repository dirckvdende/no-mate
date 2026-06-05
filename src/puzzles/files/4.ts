
import type { Puzzle } from "@/types/puzzle"
import { knight, pawn } from "../pieces"

export const puzzle: Puzzle = {
    spaces: [
        { x: 0, y: 0 },
        { x: 0, y: 1 },
        { x: 1, y: 0 },
        { x: 1, y: 1 },
        { x: 2, y: 0 },
        { x: 2, y: 1 },
    ],
    pieces: [pawn, pawn, pawn, pawn, knight],
}