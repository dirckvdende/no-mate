
import type { Puzzle } from "@/types/puzzle"
import { bishop, knight } from "@/puzzles/pieces"

export const puzzle: Puzzle = {
    spaces: [
        { x: 2, y: 0 },
        { x: 2, y: 1 },
        { x: 0, y: 2 },
        { x: 1, y: 2 },
        { x: 2, y: 2 },
        { x: 3, y: 2 },
        { x: 4, y: 2 },
        { x: 2, y: 3 },
        { x: 2, y: 4 },
    ],
    pieces: [bishop, bishop, bishop, bishop, knight, knight],
}