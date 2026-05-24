
import type { PuzzleWithUtil } from "@/util/puzzleUtil"
import type { Position } from "./Position"
import type { PuzzleState } from "./PuzzleState"

/**
 * A piece of the puzzle to be placed
 */
export type Piece = {
    /**
     * Name of the puzzle piece, which should be a unique identifier for its
     * type
     */
    name: string
    /** Display icon of the puzzle piece */
    icon: string
    /** Display color of the puzzle piece */
    color: string
    /**
     * Function that returns whether the placement of this specific piece is a
     * valid placement with respect to the other pieces
     * @param puzzle The puzzle that the piece is placed in
     * @param puzzleState Complete state of the placed puzzle pieces
     * @param position Position this specific puzzle piece is placed at
     * @returns Whether the puzzle piece placement is valid
     */
    isValid: (
        puzzle: PuzzleWithUtil,
        puzzleState: PuzzleState,
        position: Position,
    ) => boolean
}