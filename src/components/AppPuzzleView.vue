<script setup lang="ts">
    import { usePuzzleStore } from "@/stores/usePuzzleStore.ts"
    import Footer from "./Footer.vue"
    import Header from "./Header.vue"
    import Puzzle from "./Puzzle.vue"
    import { computed } from "vue"

    const { puzzleId } = usePuzzleStore()
    const title = computed(() => `Puzzle #${puzzleId.value}`)
</script>

<template>
    <Header :title="title" />
    <Puzzle />
    <Footer />
</template>

<style lang="scss" module>
</style>