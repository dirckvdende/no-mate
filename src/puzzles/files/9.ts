
import type { Puzzle } from "@/types/puzzle"
import { bishop, knight, pawn } from "../pieces"

export const puzzle: Puzzle = {
    spaces: [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 2, y: 0 },
        { x: 0, y: 1 },
        { x: 2, y: 1 },
        { x: 0, y: 2 },
        { x: 2, y: 2 },
        { x: 0, y: 3 },
        { x: 1, y: 3 },
        { x: 2, y: 3 },
    ],
    pieces: [pawn, pawn, bishop, knight, knight, knight, knight],
}