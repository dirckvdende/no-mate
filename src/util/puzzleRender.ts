
import type { Puzzle } from "@/types/Puzzle"
import type { PuzzleRender } from "@/types/PuzzleRender"

/** Margins around the rendered puzzle */
const PUZZLE_MARGIN = .1
/** Spacing between the rendered spaces and puzzle pieces */
const MIDDLE_SPACING = 1
/** Spacing between puzzle piece base positions */
const PIECE_SPACING = .2
/** Minimum width of the board render */
const MIN_WIDTH = 5

/**
 * Generate rendering information from a puzzle
 * @param puzzle The puzzle to get rendering info from
 * @returns The rendering info
 */
export function puzzleRender(puzzle: Puzzle): PuzzleRender {
    const topLeft: [number, number] = [Infinity, Infinity]
    const bottomRight: [number, number] = [-Infinity, -Infinity]
    for (const space of puzzle.spaces) {
        topLeft[0] = Math.min(topLeft[0], space[0])
        topLeft[1] = Math.min(topLeft[1], space[1])
        bottomRight[0] = Math.max(bottomRight[0], space[0] + 1)
        bottomRight[1] = Math.max(bottomRight[1], space[1] + 1)
    }

    const extraWidth = MIN_WIDTH - (bottomRight[0] - topLeft[0])
    if (extraWidth > 0) {
        topLeft[0] -= extraWidth / 2
        bottomRight[0] += extraWidth / 2
    }

    bottomRight[1] += MIDDLE_SPACING

    const piecesPerRow = Math.floor(1 + (bottomRight[0] - topLeft[0] - 1)
        / (1 + PIECE_SPACING))
    const piecePositions: [number, number][] = []
    const pieces = puzzle.pieces.slice()
    const centerX = (topLeft[0] + bottomRight[0]) / 2
    while (pieces.length > 0) {
        const row = pieces.splice(0, piecesPerRow)
        console.log(row, pieces)
        const rowWidth = (row.length - 1) * (1 + PIECE_SPACING) + 1
        const y = bottomRight[1]
        bottomRight[1] += 1 + (pieces.length > 0 ? PIECE_SPACING : 0)
        for (const [index, _] of row.entries()) {
            piecePositions.push([
                centerX - rowWidth / 2 + (1 + PIECE_SPACING) * index,
                y,
            ])
        }    
    }

    topLeft[0] -= PUZZLE_MARGIN
    topLeft[1] -= PUZZLE_MARGIN
    bottomRight[0] += PUZZLE_MARGIN
    bottomRight[1] += PUZZLE_MARGIN

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