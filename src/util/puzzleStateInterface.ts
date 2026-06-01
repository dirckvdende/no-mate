
import type { Position } from "@/types/position"
import type { Piece, Puzzle, PuzzleState, PuzzleStateInterface } from
    "@/types/puzzle"

/**
 * Get a puzzle state interface that can be passed to the Piece.isValid
 * function. This interface can be used to determine positions of spaces and
 * placed pieces, for example
 * @param puzzle The puzzle
 * @param state The puzzle solution state
 * @returns The state interface
 */
export function puzzleStateInterface(
    puzzle: Puzzle,
    state: PuzzleState,
): PuzzleStateInterface {

    // TODO: Optimize
    function isSpace(position: Position): boolean {
        const space = puzzle.spaces.find((other) =>
            other.x == position.x && other.y == position.y)
        return space !== undefined
    }

    // TODO: Optimize
    function pieceAtPosition(position: Position): Piece | null {
        const index = state.placements.findIndex((placement) =>
            placement !== null
            && position.x == placement.x
            && position.y == placement.y)
        const piece = puzzle.pieces[index]
        return piece ? piece : null
    }

    return { isSpace, pieceAtPosition }

}