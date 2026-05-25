
import { type MaybeRefOrGetter, type Ref, ref, toValue, watch } from "vue"
import type { Position } from "@/types/Position"

/**
 * Object returned by the useSnapArea composable
 */
export type UseSnapAreaReturn = {
    /** The container element of the snap area */
    container: MaybeRefOrGetter<HTMLElement | null>
    /** Ref to a list of targets that the snap items can snap to */
    targets: Ref<SnapAreaTarget[]>
    /** Passed options to the composable, with defaults filled in */
    options: Required<UseSnapAreaOptions>
    /**
     * Snap an item to the snap area
     * @param position The position to snap the item as close as possible to
     * @returns An object with the currently snapped to target, the position of
     * the target, and a function to unsnap
     */
    snap: (position: Position) => {
        /**
         * The name of the target the item is currently snapped to, or null if
         * the item is not snapped
         */
        target: Readonly<Ref<string | null>>
        /**
         * Position of the target the item is snapped to, or null if the item is
         * not snapped
         */
        position: Readonly<Ref<Position | null>>
        /** Unsnap the snapped item. Has no effect if the item is not snapped */
        unsnap: () => void
    }
}

/**
 * A target that items in a snap area can be snapped to
 */
export type SnapAreaTarget = {
    /** The name of the target, which should be a unique identifier */
    name: string
    /** Position of the target */
    position: Position
}

/**
 * Options to pass to the useSnapArea composable
 */
export type UseSnapAreaOptions = {
    /** Distance below which an item can be snapped to a target (default 20) */
    snapDistance?: MaybeRefOrGetter<number>
    /**
     * Whether multiple items can be snapped to the same target (default false)
     */
    multipleAtTarget?: MaybeRefOrGetter<boolean>
}

/**
 * Create a "snap area", which is a way to keep track of items that are fixed at
 * certain positions ("targets") because they were dragged there
 * @param container The container element of the snap area
 * @param options Options for snapping
 * @returns Snap area info and utils
 */
export function useSnapArea(
    container: MaybeRefOrGetter<HTMLElement | null>,
    options?: UseSnapAreaOptions,
): UseSnapAreaReturn {

    const fullOptions = addDefaultOptions(options)
    const targetSnapCount: Map<string, number> = new Map()
    const targets = ref<SnapAreaTarget[]>([])

    function distanceToTargetSquared(
        position: Position,
        target: SnapAreaTarget,
    ): number {
        return Math.pow(position.x - target.position.x, 2) +
            Math.pow(position.y - target.position.y, 2)
    }

    function targetIsAvailable(target: SnapAreaTarget): boolean {
        return toValue(fullOptions.multipleAtTarget) ||
            (targetSnapCount.get(target.name) ?? 0) == 0
    }

    function getBestSnapTarget(position: Position): SnapAreaTarget | null {
        let closestDistance = Math.pow(toValue(fullOptions.snapDistance), 2)
        let closestTarget: SnapAreaTarget | null = null
        for (const target of targets.value) {
            const distance = distanceToTargetSquared(position, target)
            if (distance < closestDistance && targetIsAvailable(target)) {
                closestDistance = distance
                closestTarget = target
            }
        }
        return closestTarget
    }

    function snap(snapPosition: Position): {
        target: Readonly<Ref<string | null>>
        position: Readonly<Ref<Position | null>>
        unsnap: () => void
    } {
        const bestSnapTarget = getBestSnapTarget(snapPosition)
        const target = ref<string | null>(null)
        const position = ref<Position | null>(null)

        if (bestSnapTarget !== null) {
            target.value = bestSnapTarget.name
            position.value = bestSnapTarget.position
            targetSnapCount.set(target.value,
                (targetSnapCount.get(target.value) ?? 0) + 1)
        }

        const { stop } = watch(targets, () => {
            const targetInfo = targets.value.find(({ name }) =>
                name == target.value)
            if (!targetInfo) {
                unsnap()
                return
            }
            position.value = targetInfo.position
        }, { deep: true })

        function unsnap(): void {
            if (target.value !== null)
                targetSnapCount.set(target.value,
                    (targetSnapCount.get(target.value) ?? 1) - 1)
            target.value = null
            position.value = null
            stop()
        }

        return { target, position, unsnap }
    }

    return { container, targets, options: fullOptions, snap }

}

/**
 * Set all undefined fields in snap area options to default values
 * @param options The options to add the defaults to
 * @returns Options with filled-in defaults
 */
function addDefaultOptions(
    options?: UseSnapAreaOptions,
): Required<UseSnapAreaOptions> {
    return {
        snapDistance: 20,
        multipleAtTarget: false,
        ...options,
    }
}