<script setup lang="ts">
import { onMounted, reactive } from 'vue';

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
    if(props.coffeeDelay) {
        setTimeout(function () {
            var coffeeElement = document.getElementsByClassName("coffee");
            for(let i = 0; i < coffeeElement.length; i++){
                coffeeElement[i].classList.add('fill');
            }
        }, props.coffeeDelay);
    }
    if(props.espressoDelay) {
        setTimeout(function () {
            var coffeeElement = document.getElementsByClassName("espresso");
            for(let i = 0; i < coffeeElement.length; i++){
                coffeeElement[i].classList.add('fill');
            }
        }, props.espressoDelay);
    }
    if(props.milkDelay){
        setTimeout(function () {
            var milkElement = document.getElementsByClassName("milk");
            for(let i = 0; i < milkElement.length; i++){
                milkElement[i].classList.add('fill');
            }
        }, props.milkDelay);
    }
    if(props.foamDelay) {
        setTimeout(function () {
            var foamElement = document.getElementsByClassName("foam");
            for(let i = 0; i < foamElement.length; i++){
                foamElement[i].classList.add('fill');
            }
        }, props.foamDelay);
    }
    if(props.chocolateDelay){
        setTimeout(function () {
		var chocolateElement = document.getElementsByClassName("chocolate");
        for(let i = 0; i < chocolateElement.length; i++){
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
            <div v-show="chocolateDelay"  :style="`bottom:${(coffeePercent ?? 0) + (espressoPercent ?? 0) + (milkPercent ?? 0) + (foamPercent ?? 0)}%; height:${chocolatePercent}%`" class="chocolate"/>
            <div v-show="foamDelay" :style="`bottom:${(coffeePercent ?? 0) + (espressoPercent ?? 0) + (milkPercent ?? 0)}%; height:${foamPercent}%`" class="foam"/>
            <div v-show="milkDelay" :style="`bottom:${(coffeePercent ?? 0) + (espressoPercent ?? 0)}%; height:${milkPercent}%`" class="milk"/>
            <div v-show="espressoDelay" :style="`bottom:0%; height:${espressoPercent}%`" class="espresso"/>
            <div v-show="coffeeDelay" :style="`bottom:0%; height:${coffeePercent}%`" class="coffee"/>
        </div>
    </div>
</template>
<style scoped lang="scss">

$espresso: #562215;
$water: #74ccf4;
$milk: #eeeeee;
$chocolate: #4d2e07;
$foam: #fff8ef;
$white: #fff;
$coffee: #cfb495;

#coffee-container {
    margin: 10px;
    width: 100px;
    height: 75px;
    position: relative;

    .coffee {
		width: 100%;
		height: 100%;
		position: absolute;
		bottom: 0;
		height: 0;
		transition: 1500ms;

		&.fill {
			height: 100%;
			background: $coffee;
		}

		&:after {
			content: "";
			position: absolute;
			width: 100%;
			height: 100%;
			background: $coffee;
			right: 0;
		}
	}

    .milk {
		width: 100%;
		height: 100%;
		position: absolute;
		bottom: 16%;
		height: 0;
		transition: 1500ms;
        &.fill {
            height: 84%;
            background: $milk;
        }
        &:after {
			content: "";
			position: absolute;
			width: 100%;
			height: 100%;
			background: $milk;
			right: 0;
		}
    }

    .espresso {
		width: 100%;
		height: 100%;
		position: absolute;
		bottom: 0;
		height: 0;
		transition: 1500ms;

		&.fill {
			height: 16%;
			background: $espresso;
		}

		&:after {
			content: "";
			position: absolute;
			width: 100%;
			height: 100%;
			background: $espresso;
			right: 0;
		}
	}

    .glass {
        position: absolute;
        background-color: white;
        left: 30px;
        width: 40%;
        height: 100%;
        border: solid 10px #e8e4d9;
        border-top: solid 10px #e8e4d9;
        border-bottom: solid 18px #e8e4d9;
        border-radius: 5px;
        transform: perspective(300px) rotateX(-30deg);
    }

    .handle {
        position: absolute;
        border: solid 22px #e8e4d9;
        border-top: solid 15px #e8e4d9;
        border-bottom: solid 15px #e8e4d9;
        border-radius: 5px;
        top: 30px;
        right: 500px;
        width: 200px;
        height: 100px;
        z-index: -1;
        border-radius: 70%;
    }
}
</style>