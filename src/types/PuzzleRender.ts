
/**
 * Defines a description of how a puzzle should be rendered
 */
export type PuzzleRender = {
    /** Top left coordinates of the rendered puzzle */
    topLeft: [number, number]
    /** Bottom right coordinates of the rendered puzzle */
    bottomRight: [number, number]
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
    position: [number, number]
    /** Connections with other spaces in the order top, right, bottom, left */
    connections: [boolean, boolean, boolean, boolean]
}

/**
 * Describes the way a piece should be rendered
 */
export type PieceRender = {
    /** Initial position the piece should be rendered (when not moved) */
    position: [number, number]
}