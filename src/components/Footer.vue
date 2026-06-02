<script setup lang="ts">
</script>

<template>
    <p :class="$style.credit">
        Created by Dirck van den Ende<br />
        <a href="https://dirck.dev/projects">View more projects</a>
    </p>
</template>

<style lang="scss" module>
    .credit {
        text-align: center;
        color: #666;
        font-size: .8em;
        margin-bottom: 1em;

        & > a {
            color: inherit;
            text-decoration: underline;
        }
    }
</style>