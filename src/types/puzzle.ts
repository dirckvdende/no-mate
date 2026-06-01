
import type { Position } from "./position"

/**
 * Interface of the puzzle state that is passed to the Piece.isValid function.
 * This has some functions that can be used to determine relevant aspects of the
 * current puzzle's state
 */
export type PuzzleStateInterface = {
    /**
     * Check if a specific position has a puzzle space where pieces could be
     * placed
     * @param position The position at which to look
     * @returns Whether the position has a space (may be occupied or not
     * occupied)
     */
    isSpace: (position: Position) => boolean
    /**
     * Get the puzzle piece placed at the given position
     * @param position The position at which to look
     * @returns The piece placed at the position, or null if the position has
     * piece placed
     */
    pieceAtPosition: (position: Position) => Piece | null
}

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
     * @param puzzleState State of the placed puzzle pieces
     * @param position Position this specific puzzle piece is placed at
     * @returns Whether the puzzle piece placement is valid
     */
    isValid: (
        puzzle: PuzzleStateInterface,
        position: Position,
    ) => boolean
}

/**
 * Definition of a puzzle
 */
export type Puzzle = {
    /** The board spaces (x and y coords) at which tiles can be placed */
    spaces: Position[]
    /** The pieces that need to be placed on the board */
    pieces: Piece[]
}

/**
 * State of a puzzle being solved
 */
export type PuzzleState = {
    /**
     * Placements of the puzzle pieces, in the same ordering as the puzzle
     * pieces in the loaded puzzle. If a piece is not placed, the value is null
     */
    placements: (Position | null)[]
}