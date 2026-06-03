<script setup lang="ts">
    const visible = defineModel("visible", { default: false })
</script>

<template>
    <Teleport to="#app">
        <div :class="[$style.container, {
            [$style.visible]: visible,
        }]">
            <div
                :class="$style.background"
                @click="visible = false" />
            <div :class="$style['inner-container']">
                <div :class="$style.popup">
                    <div>
                        <div :class="$style['title-container']">
                            <h2 :class="$style.title">
                                <slot name="title">Attention!</slot>
                            </h2>
                        </div>
                        <div :class="$style['body-container']">
                            <p :class="$style.text"><slot /></p>
                            <div
                                v-if="$slots.buttons"
                                :class="$style['buttons-container']">
                                <slot name="buttons" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Teleport>
</template>

<style lang="scss" module>
    @use "@/scss/container.scss";

    $border-radius: 1em;

    .container {
        @extend %main-container;
        z-index: 100;
        
        .background {
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            background-color: #0004;
            z-index: 100;
            transition: background-color .2s;
        }

        .inner-container {
            @extend %main-container-inside;
            justify-content: center;
        }
    }

    .container:not(.visible) {
        pointer-events: none;

        .background {
            background-color: transparent;
        }

        .popup {
            translate: 0 1em;
            opacity: 0;
        }
    }

    .popup {
        width: 100%;
        box-sizing: border-box;
        padding: 2em;
        z-index: 101;
        transition: translate .2s, opacity .2s;
        opacity: 1;

        .title-container {
            padding: 1.2em;
            width: 100%;
            box-sizing: border-box;
            text-align: center;
            background-color: #333;
            color: #eee;
            border-top-left-radius: $border-radius;
            border-top-right-radius: $border-radius;

            .title {
                margin: 0;
            }
        }

        .body-container {
            background-color: white;
            box-shadow: 0 .3em 0 0 #0003;
            box-sizing: border-box;
            border-bottom-left-radius: $border-radius;
            border-bottom-right-radius: $border-radius;
            padding: 1.5em;
            display: flex;
            flex-direction: column;
            align-items: stretch;

            .text {
                margin: 0;
            }
        }

        .buttons-container {
            width: 100%;
            display: flex;
            flex-direction: row;
            justify-content: flex-end;
            align-items: center;
        }
    }
</style>