
import { type MaybeRefOrGetter, type Ref, ref, toValue, watch } from "vue"
import type { Position } from "@/types/Position"

export type UseSnapAreaReturn = {
    container: MaybeRefOrGetter<HTMLElement | null>
    targets: Ref<SnapAreaTarget[]>
    options: Required<UseSnapAreaOptions>
    snap: (position: Position) => {
        target: Readonly<Ref<string | null>>
        position: Readonly<Ref<Position | null>>
        unsnap: () => void
    }
}

export type SnapAreaTarget = {
    name: string
    position: Position
}

export type UseSnapAreaOptions = {
    snapDistance?: MaybeRefOrGetter<number>
    multipleAtTarget?: MaybeRefOrGetter<boolean>
}

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
        })

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

function addDefaultOptions(
    options?: UseSnapAreaOptions,
): Required<UseSnapAreaOptions> {
    return {
        snapDistance: 20,
        multipleAtTarget: false,
        ...options,
    }
}