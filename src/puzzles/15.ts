
import type { Puzzle } from "@/types/puzzle"
import { bishop, pawn, rook } from "./pieces"

export const puzzle: Puzzle = {
    spaces: [
        { x: 2, y: 0 },
        { x: 1, y: 1 },
        { x: 2, y: 1 },
        { x: 3, y: 1 },
        { x: 0, y: 2 },
        { x: 1, y: 2 },
        { x: 3, y: 2 },
        { x: 4, y: 2 },
        { x: 1, y: 3 },
        { x: 2, y: 3 },
        { x: 3, y: 3 },
        { x: 2, y: 4 },
    ],
    pieces: [bishop, bishop, bishop, rook, pawn],
}