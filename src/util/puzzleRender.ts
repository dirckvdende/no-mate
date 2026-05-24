
import type { Puzzle } from "@/types/Puzzle"
import type { Position } from "@/types/Position"
import { puzzleUtil } from "./puzzleUtil"

/** Margins around the rendered puzzle */
const PUZZLE_MARGIN = .1
/** Spacing between the rendered spaces and puzzle pieces */
const MIDDLE_SPACING = 1
/** Spacing between puzzle piece base positions */
const PIECE_SPACING = .2
/** Minimum width of the board render */
const MIN_WIDTH = 5

/**
 * A description of how a puzzle should be rendered
 */
export type PuzzleRender = {
    /** Top left coordinates of the rendered puzzle */
    topLeft: Position
    /** Bottom right coordinates of the rendered puzzle */
    bottomRight: Position
    /**
     * Board spaces that should be rendered, in the same order as the puzzle
     * this PuzzleRender is sourced from
     */
    spaces: SpaceRender[]
    /**
     * Board pieces that should be rendered, in the same order as the puzzle
     * this PuzzleRender is sourced from
     */
    pieces: PieceRender[]
}

/**
 * Describes the way a space on a puzzle board should be rendered
 */
export type SpaceRender = {
    /** Position at which the space should be rendered */
    position: Position
    /** Connections with other spaces in the order top, right, bottom, left */
    connections: [boolean, boolean, boolean, boolean]
}

/**
 * Describes the way a puzzle piece should be rendered
 */
export type PieceRender = {
    /** Initial position the piece should be rendered (when not moved) */
    position: Position
}

/**
 * Generate rendering information from a puzzle
 * @param puzzle The puzzle to get rendering info from
 * @returns The rendering info
 */
export function puzzleRender(puzzle: Puzzle): PuzzleRender {

    const { topLeft, bottomRight } = puzzleUtil(puzzle)

    const extraWidth = MIN_WIDTH - (bottomRight.x - topLeft.x)
    if (extraWidth > 0) {
        topLeft.x -= extraWidth / 2
        bottomRight.x += extraWidth / 2
    }

    bottomRight.y += MIDDLE_SPACING

    const piecesPerRow = Math.floor(1 + (bottomRight.x - topLeft.x - 1)
        / (1 + PIECE_SPACING))
    const piecePositions: Position[] = []
    const pieces = puzzle.pieces.slice()
    const centerX = (topLeft.x + bottomRight.x) / 2
    while (pieces.length > 0) {
        const row = pieces.splice(0, piecesPerRow)
        const rowWidth = (row.length - 1) * (1 + PIECE_SPACING) + 1
        const y = bottomRight.y
        bottomRight.y += 1 + (pieces.length > 0 ? PIECE_SPACING : 0)
        for (const [index, _] of row.entries()) {
            piecePositions.push({
                x: centerX - rowWidth / 2 + (1 + PIECE_SPACING) * index,
                y,
            })
        }    
    }

    topLeft.x -= PUZZLE_MARGIN
    topLeft.y -= PUZZLE_MARGIN
    bottomRight.x += PUZZLE_MARGIN
    bottomRight.y += PUZZLE_MARGIN

    return {
        topLeft,
        bottomRight,
        spaces: puzzle.spaces.map((space) => ({
            position: space,
            // TODO: connections
            connections: [false, false, false, false],
        })),
        pieces: piecePositions.map((position) => ({ position })),
    }

}