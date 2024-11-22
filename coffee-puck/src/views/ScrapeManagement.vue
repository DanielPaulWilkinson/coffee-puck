<script setup lang="ts">
import { getScrapeLog } from '@/data/scrape';
import { useAppStore } from '@/stores/app';
import { useScrapeLogStore } from '@/stores/scrapeLog';
import { onMounted, reactive, watch } from 'vue';
import Facets from '@/components/layout/Facets.vue';
import ToggleButtons from '@/components/fields/ToggleButtons.vue';
import Table from '@/components/tables/Table.vue';
const store = useScrapeLogStore();
const app = useAppStore();

type ManageCoffee = {
    search: string | null;
    count: number | null,
    filters: boolean,
    tableType: "vertical" | "horizontal" | "card",
    isTableSearch: boolean,
};

const state = reactive<ManageCoffee>({
    search: null,
    count: 10,
    tableType: 'horizontal',
    filters: false,
    isTableSearch: true,
});

onMounted(async () => {
    await callData(1);
});

watch(() => state.count, async (x) => {
    await callData(1);
});

async function callData(page: number) {
    const result = await getScrapeLog(page, Number(state.count), "id", "DESC");
    store.data = result.data;
    store.pagination = result.pagination;
}

const openFilters = async () => {
    state.filters = !state.filters;
}
</script>
<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-12">
                <h1>Jobs</h1>
                <i>Review job results</i>
                <ToggleButtons v-model="state.isTableSearch" />
            </div>
        </div>
        <div class="row mt-2" v-if="state.isTableSearch">
            <div class="col-md-6">
                <button class="btn btn-primary" type="button" value="Add" @click.prevent="openFilters">
                    Filters
                </button>
            </div>
        </div>
        <div class="row mt-4" v-if="state.filters && state.isTableSearch">
            <Facets :table-type="state.tableType" :amount="state.count" @change-amount="state.count = Number($event)"
                @change-table-type="state.tableType = $event" />
        </div>
        <div class="row" v-if="state.isTableSearch">
            <div class="col-md-12 mt-2">
                <Table caption="Coffee Scrape Results" v-if="store.data.length > 0" id="test" :rows="store.data"
                    :current-page="store.pagination.current_page" :totalPages="store.pagination.total_pages"
                    @previous-page="callData($event)" @next-page="callData($event)" :table-type="state.tableType" />
            </div>
        </div>
    </div>
</template>