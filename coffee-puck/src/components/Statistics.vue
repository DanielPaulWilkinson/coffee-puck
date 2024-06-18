<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import { getStatistics } from '../data/stats';
import HorizontalBarChart from '../components/charts/HorizontalBarChart.vue';
import HeatMap from '../components/charts/HeatMap.vue';
import type { statistics } from '@/data/types';

type State = {
    stats: statistics | null
}

const state = reactive<State>({
    stats: null,
});

onMounted(async () => {
    state.stats = await getStatistics();
});

</script>
<template>
    <div class="row">
        <div v-for="(statistic, i) in state.stats?.coffee">
            <div v-if="statistic.chartStyle === 'number'" class="col-6 mt-2">
                <div class="card shadow">
                    <div class="col text-center">
                        <HorizontalBarChart id="coffeeBarChart2" type="number" :colours="statistic.colours"
                            :series="statistic.series" :labels="statistic.label" />
                    </div>
                </div>

            </div>
            <div v-else-if="statistic.chartStyle === 'heatmap'" class="col-6 mt-2">
                <div class="card shadow">
                    <div class="col text-center">
                        {{ statistic.title }}
                        <HeatMap :days="statistic.days" />
                    </div>
                </div>
            </div>
            <div v-else class="col-3 mt-2">
                <div class="card shadow">
                    <div class="col text-center">
                        <h1>{{ statistic.value }}</h1>
                        {{ statistic.title }}
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>
<style></style>