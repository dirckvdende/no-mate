
import { computed, type ComputedRef, type MaybeRefOrGetter, type Ref, ref,
    toValue } from "vue"
import type { UseSnapAreaReturn } from "./useSnapArea"
import type { Position } from "@/types/Position"
import { syncRefs, useDraggable } from "@vueuse/core"

/**
 * Object returned by the useSnapItem composable
 */
type UseSnapItemReturn = {
    /**
     * The name of the target the item is currently snapped to, or null if the
     * item is not snapped
     */
    target: Readonly<Ref<string | null>>
    /**
     * CSS style to give to the item element (this does not happen
     * automatically!)
     */
    style: ComputedRef<string>
    /** Whether the item currently being dragged */
    isDragging: Readonly<Ref<boolean>>
}

/**
 * Create a "snap item", which should be a child element of a snap area. This
 * item can be dragged and snapped at specific positions defined by the snap
 * area
 * @param element The element to make a snap item
 * @param snapArea The snap area that this item can snap to
 * @param basePosition The base position to display the element at when the item
 * is not snapped
 * @returns Various info on the snap item
 */
export function useSnapItem(
    element: MaybeRefOrGetter<HTMLElement | null>,
    snapArea: UseSnapAreaReturn,
    basePosition: MaybeRefOrGetter<Position>,
): UseSnapItemReturn {

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
        isDragging,
    }

}