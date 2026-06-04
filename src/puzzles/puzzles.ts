
/** List of all puzzles */
export const puzzles = {
    '1': (await import("./1")).puzzle,
    '2': (await import("./2")).puzzle,
    '3': (await import("./3")).puzzle,
    '4': (await import("./4")).puzzle,
    '5': (await import("./5")).puzzle,
    '6': (await import("./6")).puzzle,
    '7': (await import("./7")).puzzle,
} as const