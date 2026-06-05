
import type { Puzzle } from "@/types/puzzle"
import { bishop, rook } from "../pieces"

export const puzzle: Puzzle = {
    spaces: [
        { x: 0, y: 0 },
        { x: 0, y: 1 },
        { x: 0, y: 2 },
        { x: 1, y: 2 },
        { x: 2, y: 2 },
        { x: 1, y: 3 },
    ],
    pieces: [bishop, bishop, rook, rook],
}