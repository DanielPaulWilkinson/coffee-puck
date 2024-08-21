<script setup lang="ts">
import { onMounted, reactive } from 'vue';

type State = {
	slices: string[],
	data: number[],
}

const props = defineProps<{
	data: number[];
	labels: string[],
	colors: string[],
}>();

const state = reactive<State>({
	slices: [],
	data: [],
});

onMounted(async () => {
	let biggestValue = 0;
	props.data.forEach((s) => {
		biggestValue += s;
	});

	for (let i = 0; i < props.data.length; i++) {
		state.data.push(Math.round(props.data[i] / biggestValue * 100))
	}


	let accumulator: number = 0;
	for (let i = 0; i < state.data.length; i++) {
		state.slices.push(`${props.colors[i]} 0 ${(accumulator += state.data[i])}%`)
	}
});
</script>

<template>
	<div class="row chart">
		<div class="col-6">
			<div class="pie-keys">
				<div class="key" v-for="(item, i) in state.data.length">
					<div class="color-box" :style="`background: ${colors[i]};`"></div>
					<span>{{ props.labels[i] }} {{ data[i] }}</span>
				</div>
			</div>
		</div>
		<div class="col-6">
			<div class="pie-chart" :style="`background: conic-gradient(${state.slices.join(', ')})`"></div>
		</div>
	</div>
</template>

<style>
.color-box {
	height: 20px;
	width: 20px;
	display: inline-block;
	border-radius: 20px;
}

.chart {
	padding: 20px;
}

.pie-chart {
	border-radius: 50%;
	height: 200px;
	width: 200px
}

.pie-keys {
	padding: 20px;
	text-align: left;
}

.key {
	display: flex;
	flex-direction: row;
	align-items: center;
}

.key>span {
	display: block;
	margin-left: 10px;
}
</style>