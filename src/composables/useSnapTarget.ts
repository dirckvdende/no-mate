
import { toRef, type MaybeRefOrGetter, reactive, onMounted, onUnmounted } from
    "vue"
import type { SnapAreaTarget, UseSnapAreaReturn } from "./useSnapArea"
import type { Position } from "@/types/position"

/**
 * Add a "target" to a snap area, which is a position at which items can be
 * snapped
 * @param snapArea The snap area to add a target to
 * @param name The name of the target
 * @param position The position of the target
 * @returns A remove function to remove the snap target from the snap area. This
 * also happens automatically on unmounting
 */
export function useSnapTarget(
    snapArea: UseSnapAreaReturn,
    name: MaybeRefOrGetter<string>,
    position: MaybeRefOrGetter<Position>,
): {
    remove: () => void
} {

    const { targets } = snapArea
    const target: SnapAreaTarget = reactive({
        name: toRef(name),
        position: toRef(position),
    })

    function add(): void {
        if (targets.value.find(t => t == target))
            return
        targets.value.push(target)
    }

    function remove(): void {
        const index = targets.value.findIndex(t => t == target)
        if (index == -1)
            return
        targets.value.splice(index, 1)
    }

    onMounted(add)
    onUnmounted(remove)

    return { remove }

}