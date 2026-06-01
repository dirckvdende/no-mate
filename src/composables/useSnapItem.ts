
import { computed, type ComputedRef, type MaybeRefOrGetter, type Ref, ref,
    toValue, watch} from "vue"
import type { UseSnapAreaReturn } from "./useSnapArea"
import type { Position } from "@/types/position"
import { syncRefs, useDraggable } from "@vueuse/core"

/**
 * Object returned by the useSnapItem composable
 */
type UseSnapItemReturn = {
    /**
     * The name of the target the item is currently snapped to, or null if the
     * item is not snapped. Can be updated externally to change snapped to
     * target. Note that if this is changed to an invalid/occupied target, the
     * ref is set back to null again
     */
    target: Ref<string | null>
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

    const {
        pause: pauseTargetWatch,
        resume: resumeTargetWatch,
    } = watch(target, (value) => {
        if (isDragging.value) {
            pauseTargetWatch()
            target.value = null
            resumeTargetWatch()
            return
        }
        if (value === null) {
            unsnap()
            unsnap = () => {}
            targetPosition.value = null
            return
        }
        snapTo(value)
    })

    function snapTo(positionOrTarget: Position | string): void {
        unsnap()
        const {
            target: localTarget,
            position: localPosition,
            unsnap: localUnsnap,
        } = snap(positionOrTarget)

        const { stop: stopTargetSync } = watch(localTarget, value => {
            pauseTargetWatch()
            target.value = value
            resumeTargetWatch()
        }, { immediate: true })
        const { stop: stopPositionSync } = syncRefs(localPosition,
            targetPosition)
        unsnap = () => {
            stopTargetSync()
            stopPositionSync()
            localUnsnap()
        }
    }

    function startDrag(): void {
        pauseTargetWatch()
        target.value = null
        resumeTargetWatch()
        targetPosition.value = null
        unsnap()
        unsnap = () => {}
    }

    function endDrag(position: Position): void {
        snapTo(position)
    }

    const {
        style: dragStyle,
        isDragging,
    } = useCustomDraggable(element, container, position, startDrag, endDrag)

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

/**
 * Custom version of VueUse's useDraggable
 * @param element Element to drag
 * @param container Container element
 * @param initialPosition Starting position of the draggable element
 * @param start Callback when starting drag
 * @param end Callback when ending drag
 * @returns The style to give the dragged element and a ref indicating if the
 * element is currently being dragged
 */
function useCustomDraggable(
    element: MaybeRefOrGetter<HTMLElement | null>,
    container: MaybeRefOrGetter<HTMLElement | null>,
    initialPosition: MaybeRefOrGetter<Position>,
    start?: () => void,
    end?: (position: Position) => void,
): {
    style: ComputedRef<string>,
    isDragging: Readonly<Ref<boolean>>,
} {

    const isDragging = ref(false)
    const { style } = useDraggable(element, {
        onMove: () => {
            if (!isDragging.value)
                start?.()
            isDragging.value = true
        },
        onEnd: (position: Position) => {
            end?.(position)
            isDragging.value = false
        },
        containerElement: container,
        preventDefault: true,
        initialValue: initialPosition,
    })

    return { style, isDragging }

}