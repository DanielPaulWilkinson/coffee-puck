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
        <div class="col-2">
            <div class="card shadow">
                <div class="col text-center">
                    <h1>{{ state.stats?.coffee.total.value }}</h1>
                    <p>{{state.stats?.coffee.total.name}}</p>
                </div>
            </div>
        </div>
    </div>
</template>