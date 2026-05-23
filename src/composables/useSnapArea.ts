
import { watch, type MaybeRefOrGetter, type Ref } from "vue"
import type { Position } from "@/types/Position"
import { useElementBounding } from "@vueuse/core"

export type UseSnapAreaReturn = {
    snap: (target: HTMLElement) => string
    unsnap: (target: HTMLElement) => void
}

export type SnapAreaTarget = {
    name: string
    position: Position
}

export type UseSnapAreaOptions = {
    snapDistance?: number
}

export function useSnapArea(
    container: MaybeRefOrGetter<HTMLElement>,
    targets: Ref<SnapAreaTarget[]>,
    options?: UseSnapAreaOptions,
): UseSnapAreaReturn {

    const targetMap: Map<string, HTMLElement[]> = new Map()
    const snappedElements: Set<HTMLElement> = new Set()
    watch(targets, updateElementPositions)

    function updateElementPositions(): void {
        for (const { name, position } of targets.value) {
            for (const element of targetMap.get(name) ?? []) {
                element.style.left = `${position.x}px`
                element.style.top = `${position.y}px`
            }
        }
    }

    function snap(target: HTMLElement): string | null {
        const { left, right } = useElementBounding(target)

    }

    function unsnap(target: HTMLElement): void {
        if (!snappedElements.has(target))
            return

    }

    return { snap, unsnap }

}