<script setup lang="ts">
    import { type SnapAreaSettings } from "@/types/SnapAreaSettings"
    import { provide, useTemplateRef } from "vue"
    import { snapAreaKey } from "@/types/SnapAreaProvide"

    const {
        targets,
        snapDistance = 10,
        allowMultipleAtTarget = false,
    } = defineProps<SnapAreaSettings>()

    const snappedItems: Map<string, string> = new Map()
    const occupiedTargets: Set<string> = new Set()
    const container = useTemplateRef("container")

    /**
     * Get the Euclidean distance between two points in 2D space
     * @param pointA The first point
     * @param pointB The second point
     * @returns The distance between the points
     */
    function distance(
        pointA: readonly [number, number],
        pointB: readonly [number, number],
    ): number {
        return Math.sqrt(Math.pow((pointA[0] - pointB[0]), 2)
            + Math.pow((pointA[1] - pointB[1]), 2))
    }

    /**
     * Snap an item with the given ID to the snap area. Note that this does not
     * affect the style of any element, this needs to be handled in the SnapItem
     * component
     * @param itemId The ID of the item to snap to a target in the area
     * @param position The position at which the item should be (approximately)
     * snapped
     * @returns The ID and the position of the target that the item is now
     * snapped to, or null if the item could not be snapped
     */
    function snap(itemId: string, position: [number, number]): {
        id: string
        position: [number, number]
    } | null {
        if (snappedItems.has(itemId))
            unsnap(itemId)
        let minDistance = snapDistance
        let minTarget: null | string = null
        for (const [targetId, targetPosition] of targets.entries()) {
            if (!allowMultipleAtTarget && occupiedTargets.has(targetId))
                continue
            const curDistance = distance(position, targetPosition)
            if (curDistance < minDistance) {
                minDistance = curDistance
                minTarget = targetId
            }
        }
        if (minTarget === null)
            return null
        snappedItems.set(itemId, minTarget)
        if (!allowMultipleAtTarget)
            occupiedTargets.add(minTarget)
        return {
            id: minTarget,
            position: [...targets.get(minTarget)!],
        }
    }

    /**
     * Unsnap an item with the given ID from the snap area
     * @param itemId The ID of the item to unsnap
     */
    function unsnap(itemId: string): void {
        const targetId = snappedItems.get(itemId)
        if (targetId === undefined)
            return
        if (!allowMultipleAtTarget)
            occupiedTargets.delete(targetId)
        snappedItems.delete(itemId)
    }

    provide(snapAreaKey, { snap, unsnap, container })
</script>

<template>
    <div ref="container" :class="$style.container">
        <slot />
    </div>
</template>

<style lang="scss" module>
    .container {
        position: relative;
        width: 100%;
        height: 100%;
    }
</style>