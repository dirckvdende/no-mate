
import type { BoundingBox } from "@/types/BoundingBox"
import type { Position } from "@/types/Position"
import type { Puzzle } from "@/types/Puzzle"

/**
 * Puzzle definition with extra utility functions and info
 */
export type PuzzleWithUtil = Puzzle & {
    /** Top left (min) coords of the puzzle's spaces */
    topLeft: Position
    /** Bottom right (max) coords of the puzzle's spaces */
    bottomRight: Position
}

/**
 * Add utility functions and info to a puzzle
 * @param puzzle The puzzle to add utility functions to
 * @returns The puzzle with utility functions and info
 */
export function puzzleUtil(puzzle: Puzzle): PuzzleWithUtil {
    return {
        ...puzzle,
        ...boundingBox(puzzle),
    }
}

/**
 * Get the bounding box of the spaces of a puzzle
 * @param puzzle The puzzle to get the bounding box of
 * @returns The bounding box as two sets of coords: the top left and bottom
 * right corners
 */
function boundingBox(puzzle: Puzzle): BoundingBox {
    const topLeft: Position = { x: Infinity, y: Infinity }
    const bottomRight: Position = { x: -Infinity, y: -Infinity }

    for (const space of puzzle.spaces) {
        topLeft.x = Math.min(topLeft.x, space.x)
        topLeft.y = Math.min(topLeft.y, space.y)
        bottomRight.x = Math.max(bottomRight.x, space.x + 1)
        bottomRight.y = Math.max(bottomRight.y, space.y + 1)
    }

    if (topLeft.x == Infinity)
        topLeft.x = topLeft.y = bottomRight.x = bottomRight.y = 0

    return { topLeft, bottomRight }
}