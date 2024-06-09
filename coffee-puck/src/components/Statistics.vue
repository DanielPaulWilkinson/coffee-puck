<script setup lang="ts">
import { statistics } from '../data/types';
import { onMounted, reactive } from 'vue';
import { getStatistics } from '../data/stats';

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
        <div class="col-2" v-for="(statistic, i) in state.stats?.coffee">
            <div class="card shadow">
                <div class="col text-center">
                    <h1>{{ statistic.value }}</h1>
                    <p>{{ statistic.name }}</p>
                </div>
            </div>
        </div>
    </div>
</template>