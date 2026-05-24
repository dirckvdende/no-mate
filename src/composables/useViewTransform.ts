
import type { BoundingBox } from "@/types/BoundingBox"
import type { Position } from "@/types/Position"
import { useElementSize, type MaybeComputedElementRef, type MaybeElement } from
    "@vueuse/core"
import { computed, toValue, watch, type ComputedRef, type MaybeRefOrGetter } from "vue"

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
    toPixelCoords: (localCoords: Position) => Position
    /**
     * Convert pixel coordinates to local coordinates
     * @param pixelCoords The pixel coordinates to convert
     * @returns The local coordinates
     */
    toLocalCoords: (pixelCoords: Position) => Position
}

/**
 * A composable for creating a "view transform", which is a tool similar to
 * world/screen coordinates in game engines. This will return functions for
 * converting between local and pixel coordinates. The transform will adapt such
 * that a certain bounding box is always contained inside the view
 * @param element The container element to get the transform for
 * @param boundingBox The bounding box that should be (at least) visible when
 * the transform is applied
 * @returns Helper functions for converting between local coords and pixel
 * coords. These helper functions use the reactive values of the element and
 * bounding box
 */
export function useViewTransform(
    element: MaybeComputedElementRef<MaybeElement>,
    boundingBox: MaybeRefOrGetter<BoundingBox>,
): UseViewTransformReturn {
    const { width, height } = useElementSize(element)
    const boxWidth = computed(() => boundingBoxSize(toValue(boundingBox)).x)
    const boxHeight = computed(() => boundingBoxSize(toValue(boundingBox)).y)
    const pixelSize = computed(() => Math.max(
        boxWidth.value / width.value,
        boxHeight.value / height.value,
    ))
    const extraWidth = computed(() =>
        width.value * pixelSize.value - boxWidth.value)
    const extraHeight = computed(() =>
        height.value * pixelSize.value - boxHeight.value)
    const topLeft = computed<Position>(() => ({
        x: toValue(boundingBox).topLeft.x - extraWidth.value / 2,
        y: toValue(boundingBox).topLeft.y - extraHeight.value / 2,
    }))

    function toPixelCoords(localCoords: Position): Position {
        return {
            x: (localCoords.x - topLeft.value.x) / pixelSize.value,
            y: (localCoords.y - topLeft.value.y) / pixelSize.value,
        }
    }

    function toLocalCoords(pixelCoords: Position): Position {
        return {
            x: pixelCoords.x * pixelSize.value + topLeft.value.x,
            y: pixelCoords.y * pixelSize.value + topLeft.value.y,
        }
    }

    return { pixelSize, toPixelCoords, toLocalCoords }
}

/**
 * Get the size of a bounding box
 * @param box The bounding box to get the size of
 * @returns The size of the bounding box in x and y direction
 */
function boundingBoxSize(box: BoundingBox): Position {
    return {
        x: box.bottomRight.x - box.topLeft.x,
        y: box.bottomRight.y - box.topLeft.y,
    }
}