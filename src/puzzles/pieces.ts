
import type { Piece } from "@/types/puzzle"
import type { Position } from "@/types/position"
import { mdiChessBishop, mdiChessQueen, mdiChessRook } from "@mdi/js"

export const bishop: Piece = {
    name: "bishop",
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

export const rook: Piece = {
    name: "rook",
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

export const queen: Piece = {
    name: "queen",
    icon: mdiChessQueen,
    color: "#ff0062",
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
            && followRay({ x: 1, y: -1 })
            && followRay({ x: 1, y: 1 })
            && followRay({ x: -1, y: -1 })
            && followRay({ x: -1, y: 1 })

    },
}