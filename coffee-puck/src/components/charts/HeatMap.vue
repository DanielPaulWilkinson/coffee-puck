<script setup lang="ts">
import { onMounted, reactive } from "vue";

type DataItem = {
    date: Date;
    dateNumber: number;
    displayValue: number
};

const props = defineProps<{
    days: DataItem[],
}>();

type HeatMapState = {
    data: DataItem[];
    selectedData: DataItem | null;
    showModal: boolean;
    today: Date | null;
};

const state = reactive<HeatMapState>({
    data: [],
    showModal: false,
    selectedData: null,
    today: null,
});

const daysInMonth = (year: number, month: number) =>
    new Date(year, month, 0).getDate();

const getDateFromNumber = (dayNumber: number): Date => {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), dayNumber);
};

onMounted(() => {
    const today = new Date();
    state.today = today;
    const numberOfDaysInMonth = daysInMonth(today.getFullYear(), today.getMonth());
    for (let i = 0; i < numberOfDaysInMonth; i++) {
        const ii: number = props.days.find((x: DataItem) => x.dateNumber === i + 1)?.displayValue ?? 0;
        const date = getDateFromNumber(i + 1);
        state.data.push({
            date,
            dateNumber: i + 1,
            displayValue: ii,
        });
    }
});

function getOrdinalSuffix(dayNumber: number): string {
    const suffixes = ["th", "st", "nd", "rd"];
    const value = dayNumber % 100;
    return dayNumber + (suffixes[(value - 20) % 10] || suffixes[value] || suffixes[0]);
}

const getShade = (number: number) => {
    if (number <= 2) {
        return "#754";
    } else if (number <= 4 && number > 2) {
        return "#dbc1ac";
    } else {
        return "#800020";
    }
};

const showModal = (day: DataItem) => {
    state.showModal = true;
    state.selectedData = day;
}

const getStyles = (day: DataItem) => {
    const todayHighlight = state.today?.getDate() === day.date.getDate() ? `border: 1px solid red;` : ``;
    const coffeeQuantityShade = `background:${getShade(day.displayValue)};`;
    return `${coffeeQuantityShade} ${todayHighlight}`;
}

</script>
<template>
    <div class="graph">
        <div :id="`day-${i}`" class="date" v-for="(day, i) in state.data" @mouseover="showModal(day)"
            @mouseleave="state.showModal = false;">
            <div class="coffee-amount" :style="getStyles(day)">{{ day.displayValue }}</div>
            <p class="day">{{ getOrdinalSuffix(day.dateNumber) }}</p>
            <div class="pop-up" v-if="state.showModal && i === state.selectedData?.dateNumber">
                <p>You drank {{ state.selectedData?.displayValue }} on {{ state.selectedData?.date }}{{
            getOrdinalSuffix(state.selectedData?.dateNumber) }}</p>
            </div>
        </div>
    </div>
</template>

<style scoped>
.graph {
    width: fit-content;
    padding: 5px;
}

.day {
    color: #000;
    width: 50px;
    text-align: center;
}

.pop-up {
    position: absolute;
    left: 0;
    top: 0;
    color: #000;
    background-color: #fff;
    border-radius: 10px;
    border: solid black 1px;
    width: 100px;
    z-index: 1;
    height: auto;
    padding: auto;
    margin: auto;
}

.pop-up p {
    margin: 0px;
}

.coffee-amount {
    width: 25px;
    height: 25px;
    border-radius: 25px;
    margin: auto;
    cursor: pointer;
}

.date {
    display: inline-block;
    color: #fff;
    opacity: 1;
    text-align: center;
    animation: roll-in 2s ease;
    position: relative;
}

@keyframes roll-in {
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}
</style>
