<script setup lang="ts">
import { on } from 'events';
import { onMounted, reactive } from 'vue';

const props = withDefaults(defineProps<{
    id: string;
    series: number[];
    labels: string[];
    colours: string[];
    type: "number" | "percentage";
    lines: boolean,
}>(), ({
    lines: true,
}));


type State = {
    bars: number[],
    labels: string[],
    colours: string[],
    lines: number[],
    lineNumbers: number[]
}

const state = reactive<State>({
    bars: [],
    labels: [],
    colours: [],
    lines: [],
    lineNumbers: [],
});

onMounted(() => {
    if (props.type === "number") {
        let biggestValue = 0;
        props.series.forEach((s) => {
            s > biggestValue ? biggestValue = s : biggestValue = biggestValue;
        });

        for(let ii = 0; ii < 6; ii++){
            state.lines.push(Math.round(biggestValue / 5 * ii));
            state.lineNumbers.push(Math.round(biggestValue / 5 * ii));
        }
        
        for (let i = 0; i < props.series.length; i++) {
            state.bars.push(Math.round(props.series[i] / biggestValue * 100))

        }
    } else {
        state.bars = props.series;
        for(let i = 0; i < 6; i++){
            state.lines.push(20 * i);
            state.lineNumbers.push(20 * i);
        }
    }

    state.labels = props.labels;
    state.colours = props.colours
});
</script>
<template>
    <div class="row">
        <div class="col-12">
            <div class="graph">
                <div class="labels">
                    <span v-for="(label, i) in state.labels" :style="`color:${colours[i]};`" class="label">
                        {{ label }} {{ props.series[i] }}
                    </span>

                </div>
                <div class="bars">
                    <span class="bar" :style="`width: ${bar}%;background:${colours[i]};`"
                        v-for="(bar, i) in state.bars"></span>
                    <div class="lines" v-if="lines" v>
                        <span class="line" v-for="() in state.lines"></span>
                    </div>
                </div>
                <div class="numbers">
                    <span class="number" v-for="(number) in state.lines">{{ number }}</span>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.graph {
    position: relative;
    padding: 20px;
}

.graph .labels {
    left: 0;
    position: absolute;
    top: 10px;
    text-align: right;
}

.graph .labels .label {
    display: block;
    font-size: 14px;
    margin: 0 10px 10px 7px;
    text-align: right;
    width: 110px;
    margin-top: 15px;
}

.graph .bars {
    margin-left: 110px;
    position: relative;
}

.graph .bars .bar {
    background: #7A0000;
    display: block;
    height: 30px;
    margin: 0 0 7px;
    animation: graph-bars 2s;
}

@keyframes graph-bars {
    0% {
        width: 0;
    }
}

.graph .lines {
    left: 0;
    height: 100%;
    position: absolute;
    top: 0;
    width: 100%;
}

.graph .lines .line {
    background: #848484;
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 1px;
}

.graph .lines .line:nth-child(1) {
    left: 0;
}

.graph .lines .line:nth-child(2) {
    left: 20%;
}

.graph .lines .line:nth-child(3) {
    left: 40%;
}

.graph .lines .line:nth-child(4) {
    left: 60%;
}

.graph .lines .line:nth-child(5) {
    left: 80%;
}

.graph .lines .line:nth-child(6) {
    left: 100%;
}

.graph .numbers {
    border-top: 1px solid #848484;
    font-size: 12px;
    height: 20px;
    margin-left: 110px;
    margin-top: -8px;
    position: relative;
}

.graph .numbers .number {
    left: 0;
    margin-left: -7px;
    position: absolute;
    top: 5px;
}

.graph .numbers .number:nth-child(1) {
    left: 0;
    margin-left: 0;
}

.graph .numbers .number:nth-child(2) {
    left: 20%;
}

.graph .numbers .number:nth-child(3) {
    left: 40%;
}

.graph .numbers .number:nth-child(4) {
    left: 60%;
}

.graph .numbers .number:nth-child(5) {
    left: 80%;
}

.graph .numbers .number:nth-child(6) {
    left: 100%;
    margin-left: -10px;
}
</style>