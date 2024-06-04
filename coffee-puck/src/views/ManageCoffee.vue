<script setup lang="ts">
import { useCoffeePagination } from "../stores/coffeePagination";
import {
    createCoffee,
    getCoffees,
    updateCoffee,
} from "@/data/coffee";
import Table from "../components/FormElements/Table.vue";
import { computed, inject, onMounted, provide, reactive, watch } from "vue";
import Text from "@/components/FormElements/Text.vue";
import type { CreateNotification } from "@/services/notifications";
import type { Coffee } from "@/stores/brewPagination";
import Select from "@/components/FormElements/Select.vue";

const store = useCoffeePagination();
const createNotification = <CreateNotification>inject("create-notification");

type ManageCoffee = {
    search: string | null;
    count: number | null,
    filters: boolean,
};

const state = reactive<ManageCoffee>({
    search: null,
    count: 5,
    filters: false,
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

const addCoffee = async () => {
    await createCoffee({
        name: "A new coffee",
        createdOn: "1",
        updatedOn: "1",
        cost: "19.99",
        size: "200g",
        isDecaf: false,
        rating: 1,
        image: "w",
        recipe: "1",
        roasterId: 1,
        beans: [{
            varietyId: 1,
            process: "washed",
            producers: "el sharoon",
            altitude: "200msl",
            roast: "dark"
        }]
    });
};

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
            </div>
        </div>
        <div class="row mt-2">
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
                    <div class="col-2">
                        <button class="btn btn-primary" type="button" value="Add" @click="addCoffee">
                            Add
                        </button>
                    </div>
                    <div class="col-1">
                        <button class="btn btn-primary" type="button" value="Add" @click.prevent="openFilters">
                            Filters
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="row mt-4" v-if="state.filters">
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
                    <Select 
                        id="select"
                        placeholder="hello"
                        v-model="state.count" 
                        :options="[{
                            value: 5,
                            label: '5',
                        }, {
                            value: 25,
                            label: '25',
                        }, {
                            value: 50,
                            label: '50',
                        }]"/>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12 mt-2">
                <Table caption="Coffee List" v-if="store.data.length > 0" id="test" :rows="store.data" :current-page="store.pagination.current_page"
                    :totalPages="store.pagination.total_pages" @previous-page="callData($event)"
                    @next-page="callData($event)" @save="saveCoffee($event as Coffee)"/>
                <p v-else>No data found for search</p>
            </div>
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