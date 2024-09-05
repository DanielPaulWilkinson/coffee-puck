<script setup lang="ts">
import { onMounted } from 'vue';

const props = withDefaults(defineProps<{
    id: string,
    milkDelay?: number | null,
    coffeeDelay?: number | null,
    foamDelay?: number | null,
    chocolateDelay?: number | null,
    espressoDelay?: number | null,
    coffeePercent?: number | null,
    espressoPercent?: number | null,
    milkPercent?: number | null,
    chocolatePercent?: number | null,
    foamPercent?: number | null
    type: string,
}>(), {
    milkDelay: null,
    coffeeDelay: null,
    foamDelay: null,
    chocolateDelay: null,
    espressoDelay: null,
    espressoPercent: null,
    milkPercent: null,
});

onMounted(async () => {
    if (props.coffeeDelay) {
        setTimeout(function () {
            var coffeeElement = document.getElementsByClassName("coffee");
            for (let i = 0; i < coffeeElement.length; i++) {
                coffeeElement[i].classList.add('fill');
            }
        }, props.coffeeDelay);
    }
    if (props.espressoDelay) {
        setTimeout(function () {
            var coffeeElement = document.getElementsByClassName("espresso");
            for (let i = 0; i < coffeeElement.length; i++) {
                coffeeElement[i].classList.add('fill');
            }
        }, props.espressoDelay);
    }
    if (props.milkDelay) {
        setTimeout(function () {
            var milkElement = document.getElementsByClassName("milk");
            for (let i = 0; i < milkElement.length; i++) {
                milkElement[i].classList.add('fill');
            }
        }, props.milkDelay);
    }
    if (props.foamDelay) {
        setTimeout(function () {
            var foamElement = document.getElementsByClassName("foam");
            for (let i = 0; i < foamElement.length; i++) {
                foamElement[i].classList.add('fill');
            }
        }, props.foamDelay);
    }
    if (props.chocolateDelay) {
        setTimeout(function () {
            var chocolateElement = document.getElementsByClassName("chocolate");
            for (let i = 0; i < chocolateElement.length; i++) {
                chocolateElement[i].classList.add('fill');
            }
        }, props.chocolateDelay);
    }

})
</script>
<template>
    <div :id="`${props.id || props.type}-coffee`" class=""></div>
    <div id="coffee-container">
        <div class="glass">
            <div v-show="chocolateDelay"
                :style="`bottom:${(coffeePercent ?? 0) + (espressoPercent ?? 0) + (milkPercent ?? 0) + (foamPercent ?? 0)}%; height:${chocolatePercent}%`"
                class="chocolate" />
            <div v-show="foamDelay"
                :style="`bottom:${(coffeePercent ?? 0) + (espressoPercent ?? 0) + (milkPercent ?? 0)}%; height:${foamPercent}%`"
                class="foam" />
            <div v-show="milkDelay"
                :style="`bottom:${(coffeePercent ?? 0) + (espressoPercent ?? 0)}%; height:${milkPercent}%`"
                class="milk" />
            <div v-show="espressoDelay" :style="`bottom:0%; height:${espressoPercent}%`" class="espresso" />
            <div v-show="coffeeDelay" :style="`bottom:0%; height:${coffeePercent}%`" class="coffee" />
        </div>
    </div>
</template>