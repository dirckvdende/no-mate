
import type { Puzzle } from "@/types/puzzle"
import { bishop, king, knight, pawn, rook } from "../pieces"

export const puzzle: Puzzle = {
    spaces: [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 3, y: 0 },
        { x: 4, y: 0 },
        { x: 0, y: 1 },
        { x: 1, y: 1 },
        { x: 2, y: 1 },
        { x: 3, y: 1 },
        { x: 4, y: 1 },
        { x: 1, y: 2 },
        { x: 2, y: 2 },
        { x: 3, y: 2 },
        { x: 0, y: 3 },
        { x: 1, y: 3 },
        { x: 2, y: 3 },
        { x: 3, y: 3 },
        { x: 4, y: 3 },
        { x: 0, y: 4 },
        { x: 1, y: 4 },
        { x: 3, y: 4 },
        { x: 4, y: 4 },
    ],
    pieces: [ bishop, bishop, king, king, pawn, rook, knight ],
}