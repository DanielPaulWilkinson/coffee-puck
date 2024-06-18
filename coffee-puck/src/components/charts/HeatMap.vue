<script setup lang="ts">
import { onMounted, reactive } from "vue";

const props = defineProps<{
    days:[],
}>();

type date = {
    data: { day: number; value: number }[];
    days: number;
};

const state = reactive<date>({
    data: [],
    days: 0,
});

const daysInMonth = (year: number, month: number) =>
    new Date(year, month, 0).getDate();


onMounted(() => {
    var currentDate = new Date();
    var currentYear = currentDate.getFullYear();
    var currentMonth = currentDate.getMonth();
    state.days = daysInMonth(currentYear, currentMonth);
    for (let i = 0; i < state.days; i++) {

        const ii = props.days.find((x) => x.day === i + 1)?.value ?? 0;

        const u = {
            day: i + 1,
            value: ii,
        };
        state.data.push(u);
    }
});

const getShade = (number: number) => {
    if (number <= 2) {
        return "#754";
    } else if (number <= 4 && number > 2) {
        return "#dbc1ac";
    } else {
        return "#800020";
    }
};
</script>
<template>
    <div class="graph">
        <h1>Coffee Per Day in June</h1>
        <i>Shows all coffee drank per day!</i><br>
        <div :id="`day-${i}`" class="date" :style="`background:${getShade(day.value)};`" v-for="(day, i) in state.data"
            @click="console.log(state.data[i])">
            {{ day.value }}
            <p class="day">{{ day.day }}</p>
        </div>
    </div>
</template>

<style scoped>
.graph {
    width: fit-content;
}

.day {
    color: #000;
}

.date {
    display: inline-block;
    background-color: black;
    width: 25px;
    height: 25px;
    margin: 10px 10px;
    color: #fff;
    opacity: 1;
    text-align: center;
    border-radius: 25px;
    animation: roll-in 2s ease;
}

@keyframes roll-in {
    0% {
        opacity: 0;
        transform: translateX(-100%) rotate(-120deg);
    }

    100% {
        opacity: 1;
        transform: translateX(0px) rotate(0deg);
    }
}
</style>
