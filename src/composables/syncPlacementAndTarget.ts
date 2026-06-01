
import type { Position } from "@/types/position"
import type { Ref } from "vue"
import { computedSyncRef } from "./computedSyncRef"

/**
 * Sync a ref with the position of a puzzle piece and a ref with the associated
 * snap target
 * @param placement Ref to the placement position of the puzzle piece
 * @param target Ref to the target ID of the puzzle piece
 * @returns Callback to stop sync
 */
export function syncPlacementAndTarget(
    placement: Ref<Position | null>,
    target: Ref<string | null>,
): () => void {
    return computedSyncRef(
        placement,
        target,
        (placement) => {
            if (!placement)
                return null
            return `${placement.x},${placement.y}`
        },
        (target) => {
            if (!target)
                return null
            const [x, y] = target.split(",")
            if (!x || !y)
                return null
            return { x: Number(x), y: Number(y) }
        },
    )
}