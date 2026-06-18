
import type { Puzzle } from "@/types/puzzle"

// Import "puzzle" export from all puzzle files
const modules = import.meta.glob("./files/**/*.ts", {
    eager: true,
    import: "puzzle",
})

/**
 * Sort an object by its keys
 * @param obj The object to be sorted, this object is not modified
 * @param compare Compare function for sorting
 * @returns Sorted version of the object
 */
function sortObjectKeys<T>(
    obj: Record<string, T>,
    compare: (a: string, b: string) => number,
): Record<string, T> {
    const entries = Object.entries(obj)
    entries.sort(([keyA], [keyB]) => compare(keyA, keyB))
    const result: Record<string, T> = {}
    for (const [key, value] of entries)
        result[key] = value
    return result
}

/**
 * Find a number in a filename, starting from the end of the path
 * @param filename The name of the file
 * @returns The last number present in the filename, or NaN if no number could
 * be found
 */
function filenameToNumber(filename: string): number {
    const split = filename.split(/(\/|\.)/)
    while (split.length > 0
        && !Number.isInteger(Number(split[split.length - 1])))
        split.pop()
    if (split.length == 0)
        return NaN
    return Number(split[split.length - 1])
}

/**
 * Compare two filenames. Used for sorting
 * @param a First filename to compare
 * @param b Second filename to compare
 * @returns A value less than 0 if a < b, equal to 0 if a == b, and more than 0
 * if a > b
 */
function compareFilenames(a: string, b: string): number {
    return filenameToNumber(a) - filenameToNumber(b)
}

/**
 * Load all puzzles from the modules import
 * @returns Record of the puzzles
 */
function loadPuzzles(): Record<string, Puzzle> {
    const puzzles: Record<string, Puzzle> = {}
    for (const [filename, puzzle] of Object.entries(modules))
        puzzles[filenameToNumber(filename).toFixed(0)] = puzzle as Puzzle
    return sortObjectKeys(puzzles, compareFilenames)
}

/** List of all puzzles */
export const puzzles = loadPuzzles()