
import type { Puzzle } from "@/types/puzzle"
import { pawn, knight, bishop, rook, king, queen } from "@/puzzles/pieces"

export const puzzle: Puzzle = {
    spaces: [
        { x: -1, y: 1 },
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 2, y: 0 },
        { x: 3, y: 0 },
        { x: 4, y: 0 },
        { x: 0, y: 1 },
        { x: 2, y: 1 },
        { x: 4, y: 1 },
        { x: 0, y: 2 },
        { x: 1, y: 2 },
        { x: 2, y: 2 },
        { x: 3, y: 2 },
        { x: 4, y: 2 },
    ],
    pieces: [ king, bishop, knight, queen, rook, pawn ],
}