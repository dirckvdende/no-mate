
import type { BoundingBox, Position } from "@/types/position"
import type { Puzzle } from "@/types/puzzle"

/**
 * Get the bounding box of the spaces of a puzzle
 * @param puzzle The puzzle to get the bounding box of
 * @returns The bounding box as two sets of coords: the top left and bottom
 * right corners
 */
export function boundingBox(puzzle: Puzzle): BoundingBox {
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