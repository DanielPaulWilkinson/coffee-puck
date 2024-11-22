<script setup lang="ts">
import CheckBox from '@/components/fields/CheckBox.vue';
import Facets from '@/components/layout/Facets.vue';
import { coffeeTypePaginationResponse, getScrapeResults } from '@/data/scrape';
import { onMounted, reactive, watch } from 'vue';
import { roaster } from '@/data/types';

type State = {
    data: coffeeTypePaginationResponse | null;
    sortedNotes: { note: string, checked: boolean }[];
    sortedRoasters: { roaster: roaster, checked: boolean }[];
    selectedNotes: string[];
    selectedRoasters: string[];
    currentPage: number;
    seeMoreNotes: boolean;
    pageCount: number;
    roaster: string;
}

const state = reactive<State>({
    data: null,
    sortedNotes: [],
    sortedRoasters: [],
    selectedNotes: [],
    selectedRoasters: [],
    currentPage: 1,
    pageCount: 5,
    seeMoreNotes: false,
    roaster: ""
});

function sortNotes() {
    state.sortedNotes = [];
    state.data?.notes.forEach(note => {
        return state.sortedNotes.push({
            note,
            checked: state.selectedNotes.find(x => x === note) ? true : false,
        });
    });
    state.sortedRoasters = [];
    console.log(state.selectedRoasters);
    state.data?.roasters.forEach(roaster => {
        return state.sortedRoasters.push({
            roaster,
            checked: state.selectedRoasters.find(x => x === roaster.id) ? true : false,
        });
    });
}

onMounted(async () => {
    await callData();
});

watch(() => [state.currentPage, state.pageCount], async () => {
    await callData();
}, { deep: true });

const callData = async () => {
    state.selectedNotes = state.sortedNotes.filter(x => x.checked).map(x => x.note);
    state.selectedRoasters = state.sortedRoasters.filter(x => x.checked).map(x => x.roaster.id);
    state.data = await getScrapeResults(state.currentPage, state.pageCount, "id", "desc", state.selectedNotes, state.selectedRoasters);
    sortNotes();
}

</script>
<template>
    <h1>Sip or Skip</h1>
    <p>Find your next coffee using our filters below</p>
    <div class="row">
        <div class="col-md-12 right">
            <div class="row">
                <div class="col-md-3">
                    <Facets :amount="state.pageCount" @change-amount="state.pageCount = Number($event)" />
                </div>
            </div>
        </div>
    </div>
    <div class="row mt-2">
        <div class="col-md-3">
            <div id="facet-sidebar">
                <p class="mt-2">Notes</p>
                <hr>
                <div id="d" class="" v-for="note in state.sortedNotes.sort((a, b) => a.note.localeCompare(b.note))">
                    <CheckBox :name="note.note" :id="note.note" :model-value="note.checked" :checked="note.checked"
                        @update:model-value="note.checked = !$event; callData();" />
                </div>
                <p class="mt-2">Roasters</p>
                <hr>
                <div id="d" class="" v-for="roaster in state.sortedRoasters">
                    <CheckBox :name="roaster.roaster.name" :id="roaster.roaster.name" :model-value="roaster.checked"
                        :checked="roaster.checked" @update:model-value="roaster.checked = !$event; callData();" />
                </div>
            </div>
        </div>
        <div class="col-md-9">
            <div class="row">
                <div class="col-xs-12 col-sm-6 col-md-6 col-xl-4 mt-4"
                    v-for="(item) in state.data?.data.sort((a, b) => b.notes.localeCompare(a.notes))">
                    <div class="card">
                        <img :src="item.image" class="card-img-top"></img>
                        <div class="card-body">
                            <h5 class="card-title">{{ item.name }}</h5>
                            <p class="card-text">£{{ item.price }}</p>
                            <p class="card-text">{{ item.notes }}</p>
                            <a :href="item.url" class="btn btn-primary">View</a>
                        </div>
                    </div>
                </div>
            </div>
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