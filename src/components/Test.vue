<script setup lang="ts">
    import SnapArea from './SnapArea.vue';
    import SnapItem from './SnapItem.vue';
</script>

<template>
    <div :class="$style.container">
        <SnapArea :targets="new Map([
            ['1', [100, 100]],
            ['2', [50, 300]],
            ['3', [200, 200]],
        ])" :snap-distance="50">
            <SnapItem item-id="A" />
            <SnapItem item-id="B" />
            <SnapItem item-id="C" />
        </SnapArea>
    </div>
</template>

<style lang="scss" module>
    .container {
        width: 300px;
        height: 300px;
        background: red;
    }
</style>