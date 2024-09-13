<script setup lang="ts">
import Select from '@/components/fields/Select.vue';
import { useCoffeeStore } from '@/stores/addCoffee';
import { coffeeAltitude, coffeeProcess, coffeeRoast } from "@/utils/consts";
import {variety } from "../../data/types";
import Question from './Question.vue';
import Text from '../fields/Text.vue';
import { computed, reactive } from 'vue';
import { getVarieties, varietyPaginationResponse } from '@/data/varieties';
import AutoComplete, { Suggestion } from '../fields/AutoComplete.vue';
import { beanFormValidator } from '@/validation/validators';

defineProps<{
    id: number,
}>();

const removeBean = async (index: number) => {
    if (store.beans[index]) {
        store.beans.splice(index, 1);
    }
}

const setSelectedVariety = (index: number, suggestion: Suggestion) => {
    store.coffee.beans[index].variety = state.varietyPagination?.data.find(x => x.id === suggestion.id as number);
}

type varietySearch = {
    varietyPagination: varietyPaginationResponse | null;
    search: string;
};

const state = reactive<varietySearch>({
    search: "",
    varietyPagination: null,
});

async function callData(page: number, search?: string) {
    state.varietyPagination = await getVarieties(page, 5, "id", "DESC", search);
}

const suggestions = computed(() => state.varietyPagination?.data.map((e: variety) => { return { id: e.id, name: e.name, type: e.name}}))
const store = useCoffeeStore();
const validator = beanFormValidator();
</script>
<template>
    <div class="bean">
        <div class="row">
            <div class="col-6">
                <h1>Bean {{ id }}</h1>
            </div>
            <div class="col-6">
                <font-awesome-icon class="shevron" :icon="['fas', 'chevron-up']" />
            </div>
        </div>

        <div>
            <Question :name="`${id}-altitude`" tooltip="" label="Altitude" class="" :form-group="false" error="">
                <Select :id="`${id}-altitude`" placeholder="" v-model="store.coffee.beans[id].altitude" :options="coffeeAltitude"
                :validation="validator.altitude"  />
            </Question>
            <Question :name="`${id}-process`" tooltip="" label="Process" class="" :form-group="false" error="">
                <Select :id="`${id}-process`" placeholder="" v-model="store.coffee.beans[id].process" :options="coffeeProcess"
                :validation="validator.process" />
            </Question>
            <Question :name="`${id}-producers`" tooltip="" label="Producers" class="" :form-group="false" error="">
                <Text :id="`${id}-producers`" v-model="store.coffee.beans[id].producers" input-mode="text" type="text" 
                :validation="validator.producers"/>
            </Question>
            <Question :name="`${id}-roast`" tooltip="" label="Roast" class="" :form-group="false" error="">
                <Select :id="`${id}-roast`" placeholder="" v-model="store.coffee.beans[id].roast" :options="coffeeRoast" 
                :validation="validator.roast"/>
            </Question>
            <Question :name="`${id}-variety`" tooltip="" label="Variety" class="" :form-group="false" error="">
                <AutoComplete
                    :id="`${id}-variety-search`"
                    :search="state.search"
                    :placeholder="state.search"
                    not-found-message="no varieties found"
                    :suggestions="suggestions as Suggestion[]"
                    @update:suggestion="callData(1, $event)"
                    @click:suggestion="setSelectedVariety(id, $event)"
                    :validation="validator.variety"
                />
            </Question>
            <div class="form-button-group">
                <button class="btn btn-danger mt-2"
                    @click.prevent="store.coffee.beans?.splice(id, 1); removeBean(id);">Delete</button>
            </div>
        </div>
    </div>
</template>