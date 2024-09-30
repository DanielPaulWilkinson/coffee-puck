<script setup lang="ts">
import Table from "../components/tables/Table.vue";
import Text from "../components/fields/Text.vue";
import { onMounted, reactive, watch } from "vue";
import { variety } from "../data/types";
import ToggleButtons from "../components/fields/ToggleButtons.vue";
import Facets from "../components/layout/Facets.vue";
import { getVarieties, updateVariety } from "../data/varieties";
import { useVarietyStore } from "../stores/varietyPagination";
import { useAppStore } from "../stores/app";
const store = useVarietyStore();
const app = useAppStore();

type ManageVarieties = {
    search: string | null;
    count: number | null,
    filters: boolean,
    tableType: "vertical" | "horizontal",
    isTableSearch: boolean,
};

const state = reactive<ManageVarieties>({
    search: null,
    count: 3,
    tableType: 'vertical',
    filters: false,
    isTableSearch: true,
});

onMounted(async () => {
    await callData(1);
});

watch(() => state.count, async (x) => {
    await callData(1);
});

async function callData(page: number, search?: string) {
    const result = await getVarieties(page, Number(state.count), "id", "DESC", search ?? undefined);
    store.data = result.data;
    store.pagination = result.pagination;
}
const openFilters = async () => {
    state.filters = !state.filters;
}

const saveVariety = async (variety: variety) => {
    try {
        await updateVariety(variety);
        app.addNotification({
            notificationType: 'success',
            message: 'Successfully saved bean variety',
            title: "Success!",
            autoClose: true,
            duration: 15,
        });
    } catch (err) {
        app.addNotification({
            notificationType: 'error',
            message: 'Could not save bean variety',
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
                <h1>Roasters Management</h1>
                <i>Edit, delete & update those providers of yummy coffee </i>
                <ToggleButtons v-model="state.isTableSearch" />
            </div>
        </div>
        <div class="row mt-2" v-if="state.isTableSearch">
            <div class="col-md-6">
                <Text id="search" class="search" v-model="state.search" type="text" placeholder="Search..."
                    @input="callData(1, $event.target.value)" inputMode="text" prepend-class="icon" error="ew">
                    <template #append class="icon">
                        <font-awesome-icon :icon="['fas', 'search']" />
                    </template>
                </Text>
            </div>
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
                <Table caption="Roaster List" v-if="store.data.length > 0" id="test" :rows="store.data"
                    :current-page="store.pagination.current_page" :totalPages="store.pagination.total_pages"
                    @previous-page="callData($event)" @next-page="callData($event)"
                    @save="saveVariety($event as variety)" :table-type="state.tableType" />
                <p v-else>No data found for search</p>
            </div>
        </div>
        <div class="row" v-else>
        </div>
    </div>
</template>