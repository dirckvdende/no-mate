
import type { Piece } from "./Piece"

/**
 * Definition of a puzzle
 */
export type Puzzle = {
    /** The board spaces (x and y coords) at which tiles can be placed */
    spaces: [number, number][]
    /** The pieces that need to be placed on the board */
    pieces: Piece[]
}