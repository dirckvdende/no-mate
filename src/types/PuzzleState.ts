
import type { Piece } from "./Piece"
import type { Position } from "./Position"

/**
 * State of a puzzle being solved
 */
export type PuzzleState = {
    /**
     * Placements of the puzzle pieces. This only contains pieces that are
     * actually placed
     */
    placements: {
        /** The piece that is placed */
        piece: Piece
        /** The position at which the piece is placed */
        position: Position
    }[]
}