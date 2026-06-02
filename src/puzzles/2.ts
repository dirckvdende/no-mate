
import type { Position } from "@/types/position"
import type { Puzzle, Piece } from "@/types/puzzle"
import { mdiChessBishop, mdiChessRook } from "@mdi/js"

const piece1: Piece = {
    name: "piece",
    icon: mdiChessBishop,
    color: "#9500ff",
    isValid: ({ isSpace, pieceAtPosition }, position) => {

        function followRay(diff: Position): boolean {
            let currentPos: Position = { ...position }
            currentPos.x += diff.x
            currentPos.y += diff.y
            while (isSpace(currentPos)) {
                if (pieceAtPosition(currentPos))
                    return false
                currentPos.x += diff.x
                currentPos.y += diff.y
            }
            return true
        }

        return followRay({ x: 1, y: 1 })
            && followRay({ x: 1, y: -1 })
            && followRay({ x: -1, y: 1 })
            && followRay({ x: -1, y: -1 })

    },
}

const piece2: Piece = {
    name: "piece",
    icon: mdiChessRook,
    color: "#ff9900",
    isValid: ({ isSpace, pieceAtPosition }, position) => {

        function followRay(diff: Position): boolean {
            let currentPos: Position = { ...position }
            currentPos.x += diff.x
            currentPos.y += diff.y
            while (isSpace(currentPos)) {
                if (pieceAtPosition(currentPos))
                    return false
                currentPos.x += diff.x
                currentPos.y += diff.y
            }
            return true
        }

        return followRay({ x: 1, y: 0 })
            && followRay({ x: -1, y: 0 })
            && followRay({ x: 0, y: 1 })
            && followRay({ x: 0, y: -1 })

    },
}

export const puzzle: Puzzle = {
    spaces: [
        { x: 0, y: 0 },
        { x: 0, y: 1 },
        { x: 0, y: 2 },
        { x: 1, y: 2 },
        { x: 2, y: 2 },
        { x: 1, y: 3 },
    ],
    pieces: [piece1, piece1, piece2, piece2],
}