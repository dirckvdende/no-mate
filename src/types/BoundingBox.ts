
import type { Position } from "./Position"

/**
 * A 2D bounding box with top-left and bottom-right coords
 */
export type BoundingBox = {
    /** Top left (min) coords of the bounding box */
    topLeft: Position
    /** Bottom right (max) coords of the bounding box */
    bottomRight: Position
}