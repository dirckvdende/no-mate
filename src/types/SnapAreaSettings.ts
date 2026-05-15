
/**
 * Props/settings that can be passed to a snap area, and that are communicated
 * to snap items
 */
export type SnapAreaSettings = {
    /** List of targets that items can be snapped to */
    targets: Map<string, [number, number]>
    /** Maximum distance between item and target to snap item to target */
    snapDistance?: number
    /** Allow multiple items to be snapped to the same target */
    allowMultipleAtTarget?: boolean
}