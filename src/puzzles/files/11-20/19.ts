
import type { Puzzle } from "@/types/puzzle"
import { bishop, rook } from "@/puzzles/pieces"

export const puzzle: Puzzle = {
    spaces: [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 2, y: 0 },
        { x: 2, y: 1 },
        { x: 3, y: 0 },
        { x: 4, y: 0 },
        { x: 4, y: -1 },
        { x: 5, y: 0 },
        { x: 5, y: -1 },
    ],
    pieces: [ rook, bishop, bishop, bishop, bishop ],
}