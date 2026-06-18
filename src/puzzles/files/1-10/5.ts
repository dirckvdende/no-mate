
import type { Puzzle } from "@/types/puzzle"
import { knight, bishop, king } from "@/puzzles/pieces"

export const puzzle: Puzzle = {
    spaces: [
        { x: 1, y: 0 },
        { x: 2, y: 0 },
        { x: 0, y: 1 },
        { x: 2, y: 1 },
        { x: 0, y: 2 },
        { x: 1, y: 2 },
        { x: 2, y: 2 },
    ],
    pieces: [king, king, bishop, knight],
}