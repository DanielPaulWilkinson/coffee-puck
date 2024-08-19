<script setup lang="ts">
import { inject, onBeforeMount, reactive, watch } from 'vue';
import { useRoute } from 'vue-router'

import Question from './../components/fields/Question.vue';
import Text from './../components/fields/Text.vue';
import StarRating from './fields/StarRating.vue';
import Search from './fields/Search.vue';

import type { CreateNotification } from '../services/notifications';
import { coffee, coffeeType } from '../data/types';

import { getTypePage, type coffeeTypePaginationResponse, getCoffeeType } from '../data/coffeeTypes';
import { useBrewStore } from '../stores/addBrew'
import { createBrew, getBrew, updateBrew } from '../data/brew'
import { type coffeePaginationResponse, getCoffee, getCoffees } from '../data/coffee';

const store = useBrewStore();
const route = useRoute();
const createNotification = <CreateNotification>inject("create-notification");


export type BrewViewState = {
    selectedCoffee: coffee | null,
    selectedCoffeeType: coffeeType | null,
    coffeeSuggestions: coffeePaginationResponse | null,
    coffeeTypeSuggestions: coffeeTypePaginationResponse | null
    suggestionMoreInformation: coffee | null,
    submitSuccess: boolean,
};

const state = reactive<BrewViewState>({
    selectedCoffee: null,
    selectedCoffeeType: null,
    coffeeSuggestions: null,
    coffeeTypeSuggestions: null,
    suggestionMoreInformation: null,
    submitSuccess: false,
});

onBeforeMount(async () => {
    store.$reset();
    const brewId = route.query.id;
    if (brewId) {
        store.brew = await getBrew(Number(brewId));
        if (store.brew.coffeeId) {
            const coffee = await getCoffee(store.brew.coffeeId);
            store.coffee = coffee.name;
            await runCoffeeSearch();
            selectItem(coffee);
        } else {
            await runCoffeeSearch();
        }
        if (store.brew.coffeeTypeId) {
            const type = await getCoffeeType(store.brew.coffeeTypeId);
            store.coffeeType = type.name;
            await runCoffeeTypeSearch();
            selectItem(type);
        } else {
            await runCoffeeTypeSearch();
        }
    } else {
        runCoffeeSearch();
        runCoffeeTypeSearch();
    }

});

const runCoffeeSearch = async () => state.coffeeSuggestions = await getCoffees(1, 3, "id", "DESC", store.coffee);
const runCoffeeTypeSearch = async () => state.coffeeTypeSuggestions = await getTypePage(1, 3, "id", "DESC", store.coffeeType);

const selectItem = async (value: coffee | coffeeType) => {
    if(typeof value === typeof coffee){
         state.selectedCoffee = value as coffee;
    }
    else if(typeof value === typeof coffeeType){
        state.selectedCoffeeType = value as coffeeType;
    }
}


const submit = async () => {
    if (state.selectedCoffee) {
        store.brew.coffeeId = state.selectedCoffee.id;
    }

    if (state.selectedCoffeeType) {
        store.brew.coffeeTypeId = state.selectedCoffeeType?.id ?? 0;
    }
    if (route.query.id) {
        const success = await updateBrew(store.brew);
        if (success) {
            createNotification({
                type: 'success',
                message: 'we have saved your brew!',
            })
        } else {
            createNotification({
                type: 'error',
                message: 'we have not managed to save your brew',
            })
        }
    } else {
        const success = await createBrew(store.brew);
        if (success) {
            createNotification({
                type: 'success',
                message: 'we have saved your brew!',
            })
        } else {
            createNotification({
                type: 'error',
                message: 'we have not managed to save your brew',
            })
        }
    }
}

watch(() => store.coffee, () => {
    runCoffeeSearch();
});

watch(() => store.coffeeType, () => {
    runCoffeeTypeSearch();
});

</script>
<template>

    <form @submit.prevent="submit">
        <h2>Add Brew Form</h2>
        <hr>
        <div class="row">
            <h2>How does the coffee smell?</h2>
            <div class="col-6">
                <Question name="preGrindAroma" tooltip="Before grinding the coffee beans, how do they smell?"
                    label="Pre-Grind?" class="" :form-group="false" error="">
                    <Text id="preGrindAroma" type="text" v-model="store.brew.preGrindAroma" class="input" />
                </Question>
            </div>
            <div class="col-6">
                <Question name="postGrindAroma" tooltip="After grinding the coffee beans, how do they smell?"
                    label="Post-Grind?" class="" :form-group="false" error="">
                    <Text id="postGrindAroma" type="text" v-model="store.brew.postGrindAroma" class="input" />
                </Question>
            </div>
        </div>
        <hr>
        <div class="row">
            <h2>How does the coffee Taste?</h2>
            <div class="col-6">
                <Question name="acidity" tooltip="" label="How acidic was it?" class="" :form-group="false" error="">
                    <Text id="acidity" type="text" v-model="store.brew.acidity" class="input" />
                </Question>
            </div>
            <div class="col-6">
                <Question name="sweet" tooltip="" label="How sweet was it?" class="" :form-group="false" error="">
                    <Text id="sweet" type="text" v-model="store.brew.sweetness" class="input" />
                </Question>
            </div>
            <div class="col-6">
                <Question name="flavour" tooltip="" label="How did it taste?" class="" :form-group="false" error="">
                    <Text id="flavour" type="text" v-model="store.brew.flavour" class="input" />
                </Question>
            </div>
            <div class="col-6">
                <Question name="finish" tooltip="" label="How was the aftertaste?" class="" :form-group="false"
                    error="">
                    <Text id="sweet" type="text" v-model="store.brew.finish" class="input" />
                </Question>
            </div>
        </div>
        <hr>
        <div class="row">
            <div class="col-6">
                <h2>How was the texture?</h2>
                <Question name="body" tooltip="" label="How was the texture?" class="" :form-group="false" error="">
                    <Text id="body" type="text" v-model="store.brew.body" class="input" />
                </Question>
            </div>
            <div class="col-6">
                <h2>Rate the coffee</h2>
                <Question name="coffee" tooltip="" label="Rate your coffee out of 5?" class="" :form-group="true"
                    error="">
                    <StarRating id="stars" :star-count="5" :model-value="store.brew.rating"
                        @update:model-value="store.brew.rating = $event" />
                </Question>
            </div>
        </div>
        <hr>
        <div class="row">
            <Search 
                id="coffee-search"
                :modelValue="store.coffee"
                :suggestions="state.coffeeSuggestions"
                question="Which Coffee did you use?"
                label="Search for a coffee..."
                class=""
                error=""
                tooltip=""
                @search="store.coffee = $event"
                @select-item="selectItem"
            />
            <Search 
                id="type-search"
                :modelValue="store.coffeeType"
                :suggestions="state.coffeeTypeSuggestions"
                question="Which Coffee Type did you use?"
                label="Search for a type..."
                class=""
                error=""
                tooltip=""
                @search="store.coffeeType = $event"
                @select-item="selectItem"
            />
        </div>
        <hr>
        <button type="submit" class="btn btn-primary margin-top-10 right">
            {{ route.query.id ? "Update Brew" : "Add Brew" }}
        </button>
    </form>
</template>
<style>
h1,
h2 {
    font-family: marker;
}

h2 {
    font-size: large;
}

.input {
    border: 1px solid #765;
    border-radius: 10px;
}

.selected {
    background-color: #765;
}

.check {
    position: absolute;
    top: -5px;
    right: 2px;
}

.selectable {
    cursor: pointer;
}

.card-top {
    margin: auto;
}
</style>