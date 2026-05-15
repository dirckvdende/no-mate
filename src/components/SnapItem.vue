<script setup lang="ts">
    import { snapAreaKey } from "@/types/SnapAreaProvide";
    import { useDraggable } from "@vueuse/core"
    import { computed, inject, ref, useTemplateRef } from "vue"

    const { itemId } = defineProps<{
        /** ID of the item to use for snapping. Should be unique */
        itemId: string
    }>()

    const initialPosition: [number, number] = [250, 250]
    const item = useTemplateRef("item")
    const { container, snap, unsnap } = inject(snapAreaKey)!
    const styleOverride = ref<string | null>(null)
    const targetId = ref("")

    const { style: draggableStyle } = useDraggable(item, {
        containerElement: container,
        initialValue: {
            x: initialPosition[0],
            y: initialPosition[1],
        },
        onMove: () => {
            styleOverride.value = null
        },
        onEnd: (position) => {
            const result = snap(itemId, [position.x, position.y])
            targetId.value = result?.id ?? ""
            const targetPosition = result?.position ?? initialPosition
            styleOverride.value = `
                left: ${targetPosition[0]}px;
                top: ${targetPosition[1]}px;
            `
        }
    })
    const style = computed(() => styleOverride.value ?? draggableStyle.value)
</script>

<template>
    <div :class="$style.item" ref="item" :style="style">{{ itemId }}:{{ targetId }}</div>
</template>

<style lang="scss" module>
    .item {
        position: absolute;
        background-color: green;
        width: 30px;
        height: 30px;
    }
</style>