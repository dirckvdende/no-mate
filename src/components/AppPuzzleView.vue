<script setup lang="ts">
    import { usePuzzleStore } from "@/stores/usePuzzleStore.ts"
    import { usePuzzleTitle } from "@/composables/usePuzzleTitle.ts"
    import Footer from "./Footer.vue"
    import Header from "./Header.vue"
    import Puzzle from "./Puzzle.vue"

    const { puzzleId } = usePuzzleStore()
    const title = usePuzzleTitle(puzzleId)
</script>

<template>
    <Header :title="title" />
    <Puzzle />
    <Footer />
</template>

<style lang="scss" module>
</style>