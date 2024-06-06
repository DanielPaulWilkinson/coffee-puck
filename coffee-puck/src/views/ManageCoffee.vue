<script setup lang="ts">
import { useCoffeePagination } from "../stores/coffeePagination";
import {
    createCoffee,
    getCoffees,
    updateCoffee,
} from "@/data/coffee";
import Table from "../components/fields/Table.vue";
import { computed, inject, onMounted, provide, reactive, watch } from "vue";
import Text from "@/components/fields/Text.vue";
import type { CreateNotification } from "@/services/notifications";
import type { Coffee } from "@/stores/brewPagination";
import Select from "@/components/fields/Select.vue";
import AddCoffeeForm from "../components/AddCoffeeForm.vue";

const store = useCoffeePagination();
const createNotification = <CreateNotification>inject("create-notification");

type ManageCoffee = {
    search: string | null;
    count: number | null,
    filters: boolean,
    isTableSearch: boolean,
};

const state = reactive<ManageCoffee>({
    search: null,
    count: 5,
    filters: false,
    isTableSearch: true,
});

onMounted(async () => {
    await callData(1);
});

watch(() => state.count, async (x) => {
    console.log(x);
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

const saveCoffee = async (coffee: Coffee) => {
    try {
        coffee.isDecaf = coffee.isDecaf ? true : false;
        await updateCoffee(coffee);
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
                <h1>Coffee Management</h1>
                <i>Edit, delete & update those yummy coffee's </i>
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
            <div class="col-3">
                <p>Table Type:</p>
                <div class="btn-group btn-group-toggle" data-toggle="buttons">
                    <label class="btn btn-secondary active">
                        <font-awesome-icon :icon="['fas', 'table']" />
                    </label>
                    <label class="btn btn-secondary">
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
                <Table caption="Coffee List" v-if="store.data.length > 0" id="test" :rows="store.data"
                    :current-page="store.pagination.current_page" :totalPages="store.pagination.total_pages"
                    @previous-page="callData($event)" @next-page="callData($event)"
                    @save="saveCoffee($event as Coffee)" />
                <p v-else>No data found for search</p>
            </div>
        </div>
        <div class="row" v-else>
            <AddCoffeeForm />
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
</style>
