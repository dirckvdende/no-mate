
import { useElementSize, type MaybeComputedElementRef, type MaybeElement } from
    "@vueuse/core"
import { computed, toValue, type ComputedRef, type MaybeRefOrGetter } from "vue"

/**
 * Object returned by the useViewTransform composable
 */
export type UseViewTransformReturn = {
    /** The size of a single screen pixel in view units */
    pixelSize: ComputedRef<number>
    /**
     * Convert local coordinates to pixel coordinates
     * @param localCoords The local coordinates to convert
     * @returns The pixel coordinates
     */
    toPixelCoords: (localCoords: [number, number]) => [number, number]
    /**
     * Convert pixel coordinates to local coordinates
     * @param pixelCoords The pixel coordinates to convert
     * @returns The local coordinates
     */
    toLocalCoords: (pixelCoords: [number, number]) => [number, number]
}

/**
 * A composable for creating a "view transform", which is a tool similar to
 * world/screen coordinates in game engines. This will return functions for
 * converting between local and pixel coordinates. The transform will adapt such
 * that a certain bounding box is always contained inside the view
 * @param element The container element to get the transform for
 * @param boundingBox The bounding box that should be (at least) visible when
 * the transform is applied, given as `[[xmin, ymin], [xmax, ymax]]`
 * @returns Helper functions for converting between local coords and pixel
 * coords. These helper functions use the reactive values of the element and
 * bounding box
 */
export function useViewTransform(
    element: MaybeComputedElementRef<MaybeElement>,
    boundingBox: MaybeRefOrGetter<[[number, number], [number, number]]>,
): UseViewTransformReturn {
    const { width, height } = useElementSize(element)
    const boxWidth = computed(() => boundingBoxSize(toValue(boundingBox))[0])
    const boxHeight = computed(() => boundingBoxSize(toValue(boundingBox))[1])
    const pixelSize = computed(() => Math.max(
        boxWidth.value / width.value,
        boxHeight.value / height.value,
    ))
    const extraWidth = computed(() =>
        width.value * pixelSize.value - boxWidth.value)
    const extraHeight = computed(() =>
        height.value * pixelSize.value - boxHeight.value)
    const topLeft = computed<[number, number]>(() => [
        toValue(boundingBox)[0][0] - extraWidth.value / 2,
        toValue(boundingBox)[0][1] - extraHeight.value / 2,
    ])

    function toPixelCoords(localCoords: [number, number]): [number, number] {
        return [
            (localCoords[0] - topLeft.value[0]) / pixelSize.value,
            (localCoords[1] - topLeft.value[1]) / pixelSize.value,
        ]
    }

    function toLocalCoords(pixelCoords: [number, number]): [number, number] {
        return [
            pixelCoords[0] * pixelSize.value + topLeft.value[0],
            pixelCoords[1] * pixelSize.value + topLeft.value[1],
        ]
    }

    return { pixelSize, toPixelCoords, toLocalCoords }
}

/**
 * Get the size of a bounding box
 * @param box The bounding box to get the size of
 * @returns The size of the bounding box as [width, height]
 */
function boundingBoxSize(
    box: [[number, number], [number, number]],
): [number, number] {
    return [box[1][0] - box[0][0], box[1][1] - box[0][1]]
}