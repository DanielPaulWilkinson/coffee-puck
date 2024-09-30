<script setup lang="ts">
import { onMounted, reactive, watch } from "vue";

import type { brew } from '../data/types';

import Table from "../components/tables/Table.vue";
import Text from "../components/fields/Text.vue";
import Facets from "../components/layout/Facets.vue";
import ToggleButtons from "../components/fields/ToggleButtons.vue";
import AddUpdateBrewForm from "../components/forms/AddUpdateBrewForm.vue";

import { getBrews, updateBrew } from "../data/brew";
import { useBrewPagination } from "../stores/brewPagination";
import { useAppStore } from "../stores/app";
const app = useAppStore();
const store = useBrewPagination();

export type State = {
    search: string | null;
    count: number | null,
    filters: boolean,
    isTableSearch: boolean,
    tableType: "vertical" | "horizontal",
};

const state = reactive<State>({
    search: null,
    count: 3,
    tableType: 'vertical',
    filters: false,
    isTableSearch: true,
});

async function callData(page: number, search?: string) {
    const result = await getBrews(page, Number(state.count), "id", "DESC", search ?? undefined);
    store.data = result.data;
    store.pagination = result.pagination;
}

onMounted(async () => {
    await callData(1);
});

watch(() => state.count, async (x) => {
    await callData(1);
});

const openFilters = async () => {
    state.filters = !state.filters;
}

const saveBrew = async (brew: brew) => {
    try {
        brew.coffeeTypeId = Number(brew.coffeeTypeId);
        await updateBrew(brew);
        app.addNotification({
            notificationType: 'success',
            message: 'Successfully saved brew',
            title: "Success",
            autoClose: true,
            duration: 15,
        });
    } catch (err) {
        app.addNotification({
            notificationType: 'error',
            message: 'Could not save brew',
            title: "Error",
            autoClose: true,
            duration: 15,
        });
    }
    await callData(store.pagination.current_page);
};

</script>
<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-12">
                <h1>Brew Management</h1>
                <i>Edit, delete & update those yummy brews </i>
                <ToggleButtons v-model="state.isTableSearch" />
            </div>
        </div>
        <div class="row mt-2" v-if="state.isTableSearch">
            <div class="col-md-6">
                <Text id="search" class="search" :model-value="state.search" type="text" placeholder="Search..."
                    @input="callData(1, $event.target.value)" input-mode="text" prepend-class="icon">
                    <template #append class="icon">
                        <font-awesome-icon :icon="['fas', 'search']" />
                    </template>
                </Text>
            </div>
            <div class="col-md-6">
                <div class="row">
                    <div class="col-1">
                        <button class="btn btn-primary" type="button" value="Add" @click.prevent="openFilters">
                            Filters
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="row mt-4" v-if="state.filters && state.isTableSearch">
            <Facets :table-type="state.tableType" :amount="state.count" @change-amount="state.count = Number($event)"
                @change-table-type="state.tableType = $event" />
        </div>
        <div class="row" v-if="state.isTableSearch">
            <div class="col-md-12 mt-2">
                <Table caption="Brew List" id="test" :rows="store.data" :current-page="store.pagination.current_page"
                    :totalPages="store.pagination.total_pages" @previous-page="callData($event)"
                    @next-page="callData($event)" @save="saveBrew($event as brew)" :table-type="state.tableType" />
            </div>
        </div>
        <div class="row mt-2" v-else>
            <AddUpdateBrewForm />
        </div>
    </div>
</template>
