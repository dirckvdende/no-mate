
import { snapAreaKey } from "@/types/SnapAreaProvide"
import { useDraggable } from "@vueuse/core"
import { computed, inject, ref, toValue, type ComputedRef, type MaybeRefOrGetter
    } from "vue"

/**
 * Object returned by the useSnapItem composable
 */
export type UseSnapItemReturn = {
    /** Style to apply to the snap item element */
    style: ComputedRef<string>
}

/**
 * Make an HTML element snappable, meaning it will snap to a SnapArea target
 * (the SnapArea is assumed to exist as a parent component) once it is dragged
 * @param element The element to make a snap item
 * @param itemId Unique identifier of the item within the snap area
 * @param initialPosition The initial position of the snap item, which is also
 * the position to move back to when snapping is not possible
 * @returns The style to apply to the item to make it snappable
 */
export function useSnapItem(
    element: MaybeRefOrGetter<HTMLElement | null>,
    itemId: string,
    initialPosition: MaybeRefOrGetter<[number, number]>,
): UseSnapItemReturn {
    const { container: containerElement, snap } = inject(snapAreaKey)!
    const styleOverride = ref<string | null>(null)
    const targetId = ref("")
    const initialValue = computed(() => ({
        x: toValue(initialPosition)[0],
        y: toValue(initialPosition)[1],
    }))

    const { style: draggableStyle } = useDraggable(element, {
        containerElement,
        initialValue,
        onMove: () => {
            styleOverride.value = null
        },
        onEnd: (position) => {
            const result = snap(itemId, [position.x, position.y])
            targetId.value = result?.id ?? ""
            const targetPosition = result?.position ?? initialPosition
            styleOverride.value = `
                left: ${toValue(initialPosition)[0]}px;
                top: ${toValue(initialPosition)[1]}px;
            `
        }
    })
    const style = computed(() => styleOverride.value ?? draggableStyle.value)

    return { style }
}