<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import { getStatistics } from '../data/stats';
import HorizontalBarChart from '../components/charts/HorizontalBarChart.vue';
import HeatMap from '../components/charts/HeatMap.vue';
import PieChart from '../components/charts/PieChart.vue';
import type { statistics } from '@/data/types';

export type baseChart = {
    chartType: "heatmap" | "number" | "percentage" | "radial" | "none" | "pie";
    title: string;
    subtitle?: string;
    tooltip?: string;
    labels?: string[];
    colours?: string[];
    chartOptions?: string[];
};

export type baseStatistic = {
    value: string | number;
} & baseChart;

export type barChart = {
    dataGroups: number[] | string[];
} & baseChart;

export type heatMap = {
    days: { day: number; value: number }[];
} & baseChart;

export type pieChart = {
    data: number[];
} & baseChart;

export type chartError = {
    chartType: "heatmap" | "number" | "percentage" | "radial" | "none";
    title: string;
    error: string;
};

type State = {
    stats: statistics | null,
    heatmap: [],
    bar: [],
    pie: [],
    other: []
}

const state = reactive<State>({
    stats: null,
    heatmap: [],
    bar: [],
    pie: [],
    other: []
});

onMounted(async () => {
    const graphs = await getStatistics();
    console.log(graphs);
    state.other = graphs.statistics.filter(x => x.chartType === undefined || x.chartType === 'none');
    state.pie = graphs.statistics.filter(x => x.chartType === 'pie');
    state.heatmap = graphs.statistics.filter(x => x.chartType === 'heatmap');
    state.bar = graphs.statistics.filter(x => x.chartType === 'number');
});

</script>
<template>
    <div class="row">
        <div class="col-12" v-for="(statistic, i) in state.heatmap">
            <div class="card selectable text-center mt-4">
                <div class="card-title">
                     <h1>{{ statistic.title }}</h1>
                </div>
                <div class="card-body">
                    <HeatMap :days="statistic.days">
                    </HeatMap>
                </div>
            </div>
        </div>
        <div class="col-6">
            <div class="row">
                <div class="col-md-6" v-for="(statistic, i) in state.other">
                    <div class="card selectable text-center mt-4">
                        <div class="card-body">
                            <h1>{{ statistic.title }}</h1>
                            <p>{{ statistic.value }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-6">
            <div class="row">
                <div class="col-md-12" v-for="(statistic, i) in state.pie">
                    <div class="card selectable text-center mt-4">
                        <div class="card-title">
                            <h1>{{ statistic.title }}</h1>
                        </div>
                        <div class="card-body">
                            <PieChart :data="statistic.data" :colors="statistic.colours" :labels="statistic.labels">
                            </PieChart>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
                <div class="col-md-6" v-for="(statistic, i) in state.bar">
                    <div class="card selectable text-center mt-4">

                        <h1>{{ statistic.title }}</h1>

                        <div class="card-body">
                            <HorizontalBarChart :series="statistic.dataGroups" :colours="statistic.colours" :labels="statistic.labels" type="number">
                            </HorizontalBarChart>
                        </div>
                    </div>
                </div>
            </div>
</template>
<style>
h1 {
    font-size: 20px;
}

.card {
    min-height: 100px;
}
</style>