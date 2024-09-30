<script setup lang="ts">
import { useCoffeePagination } from "../stores/coffeePagination";
import {
    getCoffees,
    updateCoffee,
} from "../data/coffee";
import Table from "../components/tables/Table.vue";
import { onMounted, reactive, watch } from "vue";
import Text from "../components/fields/Text.vue";
import AddUpdateCoffeeForm from "../components/forms/AddUpdateCoffeeForm.vue";
import { coffee } from '../data/types';
import ToggleButtons from "../components/fields/ToggleButtons.vue";
import Facets from "../components/layout/Facets.vue";
import { useAppStore } from "../stores/app";
import CardView from "@/components/tables/cardView.vue";
const app = useAppStore();
const store = useCoffeePagination();

type ManageCoffee = {
    search: string | null;
    count: number | null,
    filters: boolean,
    tableType: "vertical" | "horizontal" | "card",
    isTableSearch: boolean,
};

const state = reactive<ManageCoffee>({
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
    const result = await getCoffees(page, Number(state.count), "id", "DESC", search ?? undefined);
    store.data = result.data;
    store.pagination = result.pagination;
}

const openFilters = async () => {
    state.filters = !state.filters;
}

const saveCoffee = async (coffee: coffee) => {
    try {
        coffee.isDecaf = coffee.isDecaf ? true : false;
        await updateCoffee(coffee);
        app.addNotification({
            notificationType: 'success',
            message: 'Successfully saved coffee',
            title: "Success",
            autoClose: true,
            duration: 15,
        });
    } catch (err) {
        app.addNotification({
            notificationType: 'error',
            message: 'Could not save coffee',
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
                <h1>Coffee Management</h1>
                <i>Edit, delete & update those yummy coffee's </i>
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
            <Facets :table-type="state.tableType" :amount="state.count" @change-amount="state.count = Number($event);"
                @change-table-type="state.tableType = $event" />
        </div>
        <div class="row" v-if="state.isTableSearch && state.tableType === 'vertical' || state.tableType === 'horizontal' ">
            <div class="col-md-12 mt-2">
                <Table caption="Coffee List" v-if="store.data.length > 0" id="test" :rows="store.data"
                    :current-page="store.pagination.current_page" :totalPages="store.pagination.total_pages"
                    @previous-page="callData($event)" @next-page="callData($event)" @save="saveCoffee($event as coffee)"
                    :table-type="state.tableType" />
                <p v-else>No data found for search</p>
            </div>
        </div>
        <div v-if="state.isTableSearch && state.tableType === 'card'">
            <CardView :data="store.data" type="coffee"/>
        </div>
        <div class="row" v-if="!state.isTableSearch">
            <AddUpdateCoffeeForm />
        </div>
    </div>
</template>
<style>
h1 {
    font-family: marker;
}

.table-types {
    float: right;
}

.add {
    margin: 10px auto;
    font-family: marker;
    float: right;
}

#search {
    border: 1px solid;
}

.icon {
    border: 1px solid;
    background: #765;
}
.result-card {
    display: inline-block;
    margin: 10px 10px 0 0;
}
</style>
