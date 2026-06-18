
import type { Puzzle } from "@/types/puzzle"
import { knight, rook } from "@/puzzles/pieces"

export const puzzle: Puzzle = {
    spaces: [
        { x: 1, y: 0 },
        { x: 2, y: 0 },
        { x: 3, y: 0 },
        { x: 0, y: 1 },
        { x: 1, y: 1 },
        { x: 3, y: 1 },
        { x: 0, y: 2 },
        { x: 1, y: 2 },
        { x: 2, y: 2 },
        { x: 3, y: 2 },
        { x: 0, y: 3 },
        { x: 1, y: 3 },
        { x: 2, y: 3 },
    ],
    pieces: [knight, knight, rook, rook, rook],
}