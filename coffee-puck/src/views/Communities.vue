<script setup lang="ts">
import CheckBox from '@/components/fields/CheckBox.vue';
import { coffeeTypePaginationResponse, getScrapeResults } from '@/data/scrape';
import { onMounted, reactive, watch } from 'vue';
import { date } from 'zod';

type State = {
    data: coffeeTypePaginationResponse | null;
    selectedNotes: string[];
    currentPage: number;
}

const state = reactive<State>({
    data: null,
    selectedNotes: [],
    currentPage: 1,
});

onMounted(async () => {
    state.data = await getScrapeResults(state.currentPage,10,"id","desc",state.selectedNotes);
});

watch(() => [state.currentPage, state.selectedNotes], async () => {
    callData()
})

const callData = async () => {
    state.data = await getScrapeResults(state.currentPage, 10, "id", "desc", state.selectedNotes);
}

</script> 
<template>
    <h1>Communities</h1>
    <div id="d" class="row">
            <CheckBox v-for="i in state.data?.notes" :id="i" :model-value="i" :label="i" @uncheck="delete state.selectedNotes[i]; callData()" @check="state.selectedNotes.push(i); callData()"/>
    </div>
    <div class="card result-card" style="width: 18rem;" v-for="(item, index) in state.data?.data">
        <img :src="item.image" class="card-img-top"></img>
        <div class="card-body">
            <h5 class="card-title">{{ item.name }}</h5>
            <p class="card-text">{{ item.roaster }}</p>
            <p class="card-text">{{ item.notes }}</p>
            <a :href="item.url" class="btn btn-primary">View</a>
        </div>
    </div>
    <nav aria-label="Page navigation example">
        <ul class="pagination">
            <li class="page-item">
                <a class="previous" :class="state.currentPage === 1 ? 'disabled' : ''" href="#" @click.prevent="state.currentPage -= 1;
        ">
                    Previous
                </a>
            </li>
            <li class="page-item" v-if="state.data?.pagination">
                <a class="next" href="#" :class="state.currentPage >= state.data.pagination.total_pages ? 'disabled' : ''
                    " @click.prevent="state.currentPage += 1">Next</a>
            </li>
        </ul>
    </nav>

</template>