<script setup lang="ts">
import Table from "../components/fields/Table.vue";
import { inject, onMounted, reactive, watch } from "vue";
import Text from "../components/fields/Text.vue";
import { getBrews, updateBrew } from "../data/brew";
import type { CreateNotification } from "../services/notifications";
import { useBrewPagination } from "../stores/brewPagination";
import BrewForm from "../components/BrewForm.vue";
import type { brew } from '../data/types';
import Select from "@/components/fields/Select.vue";

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

const store = useBrewPagination();
const createNotification = <CreateNotification>inject("create-notification");

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
        createNotification({
            type: 'success',
            message: 'dont panic',
        })
    } catch (err) {
        createNotification({
            type: 'error',
            message: 'panic',
        })
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
                <div class="btn-group btn-group-toggle" data-toggle="buttons">
                    <label class="btn btn-secondary" :class="[{ 'active': state.isTableSearch }]"
                        @click="state.isTableSearch = true">
                        <font-awesome-icon :icon="['fas', 'table']" /> Table
                    </label>
                    <label class="btn btn-secondary" :class="[{ 'active': !state.isTableSearch }]"
                        @click="state.isTableSearch = false">
                        <font-awesome-icon :icon="['fas', 'table-cells-large']" /> Add
                    </label>
                </div>
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
            <div class="col-3">
                <p>Table Type:</p>
                <div class="btn-group btn-group-toggle" data-toggle="buttons">
                    <label class="btn btn-secondary" :class="state.tableType === 'horizontal' ? 'active' : ''"
                        @click="state.tableType = 'horizontal'">
                        <font-awesome-icon :icon="['fas', 'table']" />
                    </label>
                    <label class="btn btn-secondary" :class="state.tableType === 'vertical' ? 'active' : ''"
                        @click="state.tableType = 'vertical'">
                        <font-awesome-icon :icon="['fas', 'table']" />
                    </label>
                    <label class="btn btn-secondary">
                        <font-awesome-icon :icon="['fas', 'table-cells-large']" />
                    </label>
                </div>
            </div>
            <div class="col-2">
                <p>Amount:</p>
                <Select id="select" placeholder="hello" v-model="state.count" :options="[{
                        value: 5,
                        label: '5',
                    }, {
                        value: 25,
                        label: '25',
                    }, {
                        value: 50,
                        label: '50',
                    }]" />
            </div>
        </div>
        <div class="row" v-if="state.isTableSearch">
            <div class="col-md-12 mt-2">
                <Table caption="Brew List" id="test" :rows="store.data" :current-page="store.pagination.current_page"
                    :totalPages="store.pagination.total_pages" @previous-page="callData($event)"
                    @next-page="callData($event)" @save="saveBrew($event as brew)" :table-type="state.tableType" />
            </div>
        </div>
        <div class="row mt-2" v-else>
            <BrewForm />
        </div>
    </div>
</template>
