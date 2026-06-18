
import type { Puzzle } from "@/types/puzzle"
import { pawn, knight } from "@/puzzles/pieces"

export const puzzle: Puzzle = {
    spaces: [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 2, y: 0 },
        { x: 3, y: 0 },
        { x: 4, y: 0 },
        { x: -1, y: 1 },
        { x: 0, y: 1 },
        { x: 1, y: 1 },
        { x: 2, y: 1 },
        { x: 3, y: 1 },
        { x: -2, y: 2 },
        { x: -1, y: 2 },
        { x: 0, y: 2 },
        { x: 1, y: 2 },
        { x: 2, y: 2 },
    ],
    pieces: [ pawn, pawn, pawn, pawn, knight, knight, knight, knight ],
}