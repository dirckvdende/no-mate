
import type { Puzzle } from "@/types/puzzle"
import { rook } from "./pieces"

export const puzzle: Puzzle = {
    spaces: [
        { x: 0, y: 0 },
        { x: 0, y: 1 },
        { x: 1, y: 0 },
        { x: 1, y: 1 },
    ],
    pieces: [rook, rook],
}