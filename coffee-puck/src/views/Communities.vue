<script setup lang="ts">
import CheckBox from '@/components/fields/CheckBox.vue';
import { coffeeTypePaginationResponse, getScrapeResults } from '@/data/scrape';
import { onMounted, reactive, watch } from 'vue';

type State = {
    data: coffeeTypePaginationResponse | null;
    sortedNotes: { note: string, checked: boolean }[];
    selectedNotes: string[],
    currentPage: number;
}

const state = reactive<State>({
    data: null,
    sortedNotes: [],
    selectedNotes: [],
    currentPage: 1,
});

onMounted(async () => {
    await callData()

    state.data?.notes.forEach(note => {
        return state.sortedNotes.push({
            note,
            checked: false
        });
    });
});

watch(() => [state.currentPage, state.sortedNotes], async () => {
    state.selectedNotes = state.sortedNotes.filter(x => x.checked).map(x => x.note);
    await callData()
}, { deep: true });

const callData = async () => {
    state.data = await getScrapeResults(state.currentPage, 10, "id", "desc", state.selectedNotes);
}

</script> 
<template>
    <h1>Communities</h1>
    <div class="row">
    <div id="d" class="col-md-2" v-for="note in state.sortedNotes.sort((a, b) => a.note.localeCompare(b.note))">
            <CheckBox :name="note.note" :id="note.note" :model-value="note.checked" :checked="note.checked" @update:model-value="note.checked = !$event" />
    </div>
</div>
    <div class="card result-card" style="width: 18rem;" v-for="(item) in state.data?.data">
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
                    " @click.prevent="state.currentPage += 1;">Next</a>
            </li>
        </ul>
    </nav>

</template>