
import type { Piece, PuzzleStateInterface } from "@/types/puzzle"
import type { Position } from "@/types/position"
import { mdiChessBishop, mdiChessKing, mdiChessKnight, mdiChessPawn,
    mdiChessQueen, mdiChessRook } from "@mdi/js"

/**
 * Check whether a piece can attack another piece by going in some specific
 * direction. The function iterated until finding a position that is not a
 * space (returns true), or a position with a placed piece (returns false)
 * @param puzzleInterface The puzzle state interface passed to the isValid
 * function
 * @param position The position from which to start looking (the position
 * itself it not checked though)
 * @param diff Step to take at every iteration
 * @returns Whether another piece can be attacked by moving the given direction
 */
function followRay(
    puzzleInterface: PuzzleStateInterface,
    position: Position,
    diff: Position,
): boolean {
    const { isSpace, pieceAtPosition } = puzzleInterface
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

export const bishop: Piece = {
    name: "Bishop",
    description: "Can attack diagonally.",
    icon: mdiChessBishop,
    color: "#9500ff",
    isValid: (puzzleInterface, position) => {
        return followRay(puzzleInterface, position, { x: 1, y: 1 })
            && followRay(puzzleInterface, position, { x: 1, y: -1 })
            && followRay(puzzleInterface, position, { x: -1, y: 1 })
            && followRay(puzzleInterface, position, { x: -1, y: -1 })
    },
}

export const rook: Piece = {
    name: "Rook",
    description: "Can attack horizontally and vertically.",
    icon: mdiChessRook,
    color: "#ff9900",
    isValid: (puzzleInterface, position) => {
        return followRay(puzzleInterface, position, { x: 1, y: 0 })
            && followRay(puzzleInterface, position, { x: -1, y: 0 })
            && followRay(puzzleInterface, position, { x: 0, y: 1 })
            && followRay(puzzleInterface, position, { x: 0, y: -1 })
    },
}

export const queen: Piece = {
    name: "Queen",
    description: "Can attack horizontally, vertically, and diagonally.",
    icon: mdiChessQueen,
    color: "#ff0062",
    isValid: (puzzleInterface, position) => {
        return followRay(puzzleInterface, position, { x: 1, y: 0 })
            && followRay(puzzleInterface, position, { x: -1, y: 0 })
            && followRay(puzzleInterface, position, { x: 0, y: 1 })
            && followRay(puzzleInterface, position, { x: 0, y: -1 })
            && followRay(puzzleInterface, position, { x: 1, y: -1 })
            && followRay(puzzleInterface, position, { x: 1, y: 1 })
            && followRay(puzzleInterface, position, { x: -1, y: -1 })
            && followRay(puzzleInterface, position, { x: -1, y: 1 })
    },
}

export const knight: Piece = {
    name: "Knight",
    description: "Can move 2 in one direction, then 1 in another.",
    icon: mdiChessKnight,
    color: "#15b158",
    isValid: ({ pieceAtPosition }, position) => {

        function hasPiece(diff: Position): boolean {
            return pieceAtPosition({
                x: position.x + diff.x,
                y: position.y + diff.y,
            }) !== null
        }

        return !hasPiece({ x: 1, y: 2 })
            && !hasPiece({ x: -1, y: 2 })
            && !hasPiece({ x: 1, y: -2 })
            && !hasPiece({ x: -1, y: -2 })
            && !hasPiece({ x: 2, y: 1 })
            && !hasPiece({ x: -2, y: 1 })
            && !hasPiece({ x: 2, y: -1 })
            && !hasPiece({ x: -2, y: -1 })

    },
}

export const pawn: Piece = {
    name: "Pawn",
    description: "Can attack any piece immediately to its top-left or "
        + "top-right.",
    icon: mdiChessPawn,
    color: "#249baa",
    isValid: ({ pieceAtPosition }, position) => {
        return pieceAtPosition({
            x: position.x - 1,
            y: position.y - 1,
        }) === null && pieceAtPosition({
            x: position.x + 1,
            y: position.y - 1,
        }) === null
    },
}

export const king: Piece = {
    name: "King",
    description: "Can attack any piece in one of the 8 squared surrounding it.",
    icon: mdiChessKing,
    color: "#1f53c4",
    isValid: ({ pieceAtPosition }, position) => {
        for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
                if (dx == 0 && dy == 0)
                    continue
                if (pieceAtPosition({
                    x: position.x + dx,
                    y: position.y + dy,
                }) !== null)
                    return false
            }
        }
        return true
    },
}