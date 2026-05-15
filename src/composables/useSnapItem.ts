
import { snapAreaKey } from "@/types/SnapAreaProvide"
import { useDraggable } from "@vueuse/core"
import { computed, inject, ref, toValue, watch, type ComputedRef,
    type MaybeRefOrGetter, type Ref } from "vue"

/**
 * Object returned by the useSnapItem composable
 */
export type UseSnapItemReturn = {
    /** Style to apply to the snap item element */
    style: ComputedRef<string>
    /** The ID of the target the item is currently snapped to */
    targetId: Readonly<Ref<string | null>>
}

/**
 * Make an HTML element snappable, meaning it will snap to a SnapArea target
 * (the SnapArea is assumed to exist as a parent component) once it is dragged
 * @param element The element to make a snap item
 * @param itemId Unique identifier of the item within the snap area
 * @param initialPosition The initial position of the snap item, which is also
 * the position to move back to when snapping is not possible
 * @returns The style to apply to the item to make it snappable, and the current
 * ID of the target the item is snapped to
 */
export function useSnapItem(
    element: MaybeRefOrGetter<HTMLElement | null>,
    itemId: string,
    initialPosition: MaybeRefOrGetter<[number, number]>,
): UseSnapItemReturn {
    const { container: containerElement, snap, unsnap } = inject(snapAreaKey)!
    const styleOverride = ref<string | null>(null)
    const targetId = ref<string | null>(null)

    watch(initialPosition, () => {
        if (targetId.value !== null)
            return
        styleOverride.value = `
            left: ${toValue(initialPosition)[0]}px;
            top: ${toValue(initialPosition)[1]}px;
        `
    }, { immediate: true })

    const initialValue = computed(() => ({
        x: toValue(initialPosition)[0],
        y: toValue(initialPosition)[1],
    }))

    const { style: draggableStyle } = useDraggable(element, {
        containerElement,
        initialValue,
        onMove: () => {
            styleOverride.value = null
            unsnap(itemId)
        },
        onEnd: (position) => {
            const result = snap(itemId, [position.x, position.y])
            targetId.value = result?.id ?? null
            const targetPosition = result?.position ?? toValue(initialPosition)
            styleOverride.value = `
                left: ${targetPosition[0]}px;
                top: ${targetPosition[1]}px;
            `
        }
    })

    const style = computed(() => styleOverride.value ?? draggableStyle.value)

    return { style, targetId }
}