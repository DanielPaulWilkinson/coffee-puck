<script setup lang="ts">
import { onMounted, reactive } from "vue";

const props = defineProps<{
    days: [],
}>();

type date = {
    data: { day: number; value: number }[];
    days: number;
    selectedData: { day: number; value: number } | null;
    showModal: boolean;
    currentDate: number;
};

const state = reactive<date>({
    data: [],
    days: 0,
    showModal: false,
    selectedData: null,
    currentDate: 0,
});

const daysInMonth = (year: number, month: number) =>
    new Date(year, month, 0).getDate();


onMounted(() => {
    var currentDate = new Date();
    var currentYear = currentDate.getFullYear();
    var currentMonth = currentDate.getMonth();
    var currentDay = currentDate.getDate();
    state.currentDate = currentDay;
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

const nthNumber = (number: number) => {
  if (number > 3 && number < 21) return "th";
  switch (number % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};
const getShade = (number: number) => {
    if (number <= 2) {
        return "#754";
    } else if (number <= 4 && number > 2) {
        return "#dbc1ac";
    } else {
        return "#800020";
    }
};

const showModal = (day, i) => {
    state.showModal = true;
    state.selectedData = day;
}
const getStyles = (day, i) => {
    const todayHighlight = state.currentDate === i + 1 ? `border: 1px solid red;` : ``;
    const coffeeQuantityShade = `background:${getShade(day.value)};`;
    return `${coffeeQuantityShade} ${todayHighlight}`;
}

</script>
<template>
    <div class="graph">
        <div :id="`day-${i}`" class="date"  v-for="(day, i) in state.data"
            @mouseover="showModal(day, i)" @mouseleave="state.showModal = false;">
            <div class="coffee-amount" :style="getStyles(day, i)">{{ day.value }}</div>
            <p class="day">{{ day.day }}{{ nthNumber(day.day) }}</p>
            <div class="pop-up" v-if="state.showModal && i === state.selectedData?.day">
                <p>You drank {{ state.selectedData?.value }} on {{ state.selectedData?.day }}{{ nthNumber(state.selectedData?.day) }}</p>
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
