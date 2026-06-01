
import type { Position } from "@/types/position"
import type { Puzzle, Piece } from "@/types/puzzle"
import { mdiChessBishop } from "@mdi/js"

const piece: Piece = {
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

export const puzzle: Puzzle = {
    spaces: [
        { x: 0, y: 0 },
        { x: 0, y: 1 },
        { x: 1, y: 0 },
    ],
    pieces: [piece, piece],
}