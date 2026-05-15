
import type { InjectionKey, ShallowRef } from "vue"

/**
 * Provided data by SnapArea component
 */
export type SnapAreaProvide = {
    /**
     * Snap an item with the given ID to the snap area. Note that this does not
     * affect the style of any element, this needs to be handled in the SnapItem
     * component
     * @param itemId The ID of the item to snap to a target in the area
     * @param position The position at which the item should be (approximately)
     * snapped
     * @returns The ID and the position of the target that the item is now
     * snapped to, or null if the item could not be snapped
     */
    snap: (itemId: string, position: [number, number]) => {
        /** ID of the snapped to target */
        id: string
        /** Position of the snapped to target */
        position: [number, number]
    } | null
    /**
     * Unsnap an item with the given ID from the snap area
     * @param itemId The ID of the item to unsnap
     */
    unsnap: (itemId: string) => void
    /** The container element of the snap area */
    container: Readonly<ShallowRef<HTMLDivElement | null>>
}

/** Injection key provided by SnapArea component */
export const snapAreaKey = Symbol() as InjectionKey<SnapAreaProvide>