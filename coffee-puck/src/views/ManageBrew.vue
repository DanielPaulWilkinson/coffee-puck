<script setup lang="ts">
import Table from "../components/FormElements/Table.vue";
import { inject, onMounted, reactive } from "vue";
const store = useBrewPagination();
import Text from "../components/FormElements/Text.vue";
import { getBrews, updateBrew } from "../data/brew";
import type { CreateNotification } from "../services/notifications";
import { useBrewPagination, type Brew } from "../stores/brewPagination";
import AddBrewForm from "../components/AddBrewForm.vue";
const createNotification = <CreateNotification>inject("create-notification");

async function callData(page: number, search?: string) {
    const result = await getBrews(page, 2, "id", "DESC", search ?? undefined);
    store.data = result.data;
    store.pagination = result.pagination;
}

onMounted(async () => {
    await callData(1);
});

export type State = {
    search: string | null;
    isTableSearch: boolean;
};

const state = reactive<State>({
    search: null,
    isTableSearch: true,
});

const addBrew = async () => {
    state.isTableSearch = !state.isTableSearch;
};

const saveBrew = async (brew: Brew) => {
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
                    <div class="col-md-2">
                        <button class="btn btn-primary" type="button" value="Add" @click="addBrew">
                            Add
                        </button>
                    </div>
                    <div class="col-2">
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
                </div>
            </div>
            <div class="col-md-12 mt-2">
                <Table caption="Brew List" id="test" :rows="store.data" :current-page="store.pagination.current_page"
                    :totalPages="store.pagination.total_pages" @previous-page="callData($event)"
                    @next-page="callData($event)" @save="saveBrew($event as Brew)" />
            </div>
        </div>
        <div class="row mt-2" v-else>
            <AddBrewForm />
        </div>
    </div>
</template>
