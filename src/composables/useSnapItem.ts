
import { computed, type ComputedRef, type MaybeRefOrGetter, type Ref, ref,
    toValue } from "vue"
import type { UseSnapAreaReturn } from "./useSnapArea"
import type { Position } from "@/types/Position"
import { syncRefs, useDraggable } from "@vueuse/core"

export function useSnapItem(
    element: MaybeRefOrGetter<HTMLElement | null>,
    snapArea: UseSnapAreaReturn,
    basePosition: MaybeRefOrGetter<Position>,
): {
    target: Readonly<Ref<string | null>>
    style: ComputedRef<string>
} {

    const target = ref<string | null>(null)
    const targetPosition = ref<Position | null>(null)
    const { container, snap } = snapArea
    let unsnap = () => {}
    const position = computed(() =>
        targetPosition.value ?? toValue(basePosition))
    const isDragging = ref(false)

    function start(): void {
        target.value = null
        targetPosition.value = null
        unsnap()
        unsnap = () => {}
    }

    function end(position: Position): void {
        const {
            target: localTarget,
            position: localPosition,
            unsnap: localUnsnap,
        } = snap(position)
        const { stop: stopTargetSync } = syncRefs(localTarget, target)
        const { stop: stopPositionSync } = syncRefs(localPosition,
            targetPosition)
        unsnap = () => {
            stopTargetSync()
            stopPositionSync()
            localUnsnap()
        }
    }

    const { style: dragStyle } = useDraggable(element, {
        onMove: () => {
            if (!isDragging.value)
                start()
            isDragging.value = true
        },
        onEnd: (position: Position) => {
            end(position)
            isDragging.value = false
        },
        containerElement: container,
        preventDefault: true,
        initialValue: position,
    })

    const style = computed(() => {
        if (isDragging.value)
            return dragStyle.value
        return `
            left: ${position.value.x}px;
            top: ${position.value.y}px;
        `
    })

    return {
        target,
        style,
    }

}