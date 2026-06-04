
/** List of all puzzles */
export const puzzles = {
    '1': (await import("./1")).puzzle,
    '2': (await import("./2")).puzzle,
    '3': (await import("./3")).puzzle,
    '4': (await import("./4")).puzzle,
    '5': (await import("./5")).puzzle,
    '6': (await import("./6")).puzzle,
    '7': (await import("./7")).puzzle,
    '8': (await import("./8")).puzzle,
    '9': (await import("./9")).puzzle,
    '10': (await import("./10")).puzzle,
    '11': (await import("./11")).puzzle,
    '12': (await import("./12")).puzzle,
} as const