<script setup lang="ts">
import { onBeforeMount, reactive } from 'vue';
import { useRoute } from 'vue-router'
import { useVuelidate } from "@vuelidate/core";

import Question from '../../components/layout/Question.vue';
import Text from '../../components/fields/Text.vue';
import StarRating from '../fields/StarRating.vue';
import Search from '../fields/Search.vue';

import { coffee, coffeeType } from '../../data/types';

import { getTypePage, type coffeeTypePaginationResponse, getCoffeeType } from '../../data/coffeeTypes';
import { useBrewStore } from '../../stores/addBrew'
import { createBrew, getBrew, updateBrew } from '../../data/brew'
import { type coffeePaginationResponse, getCoffee, getCoffees } from '../../data/coffee';
import { useAppStore } from "../../stores/app";
import { brewFormValidator } from "../../validation/validators";

const app = useAppStore();
const store = useBrewStore();
const route = useRoute();
const v$ = useVuelidate();
const validator = brewFormValidator(store);

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
            selectCoffee(coffee);
        } else {
            await runCoffeeSearch();
        }
        if (store.brew.coffeeTypeId) {
            const type = await getCoffeeType(store.brew.coffeeTypeId);
            store.coffeeType = type.name;
            await runCoffeeTypeSearch();
            selectCoffeeType(type);
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

const selectCoffee = async (value: coffee) => {
    store.coffee = value.name;
    state.selectedCoffee = value;
    if (state.coffeeSuggestions?.data) {
        state.coffeeSuggestions.data = [state.selectedCoffee];
    }
}

const selectCoffeeType = async (value: coffeeType) => {
    state.selectedCoffeeType = value;

}

const createBrewPath = async () => {
    const success = await createBrew(store.brew);
    if (success) {
        if (success) {
            app.addNotification({
                notificationType: 'success',
                message: 'Successfully created brew',
                title: "Success",
                autoClose: true,
                duration: 15,
            });
        } else {
            app.addNotification({
                notificationType: 'error',
                message: 'Could not create brew',
                title: "Error",
                autoClose: true,
                duration: 15,
            });
        }
    }
}

const updateBrewPath = async () => {
    const success = await updateBrew(store.brew);
    if (success) {
        app.addNotification({
            notificationType: 'success',
            message: 'Successfully updated brew',
            title: "Success",
            autoClose: true,
            duration: 15,
        });
    } else {
        app.addNotification({
            notificationType: 'error',
            message: 'Could not update brew',
            title: "Error",
            autoClose: true,
            duration: 15,
        });
    }
}

const submit = async () => {

    const isValid = await v$.value.$validate();

    if (!isValid) {
        return;
    }

    if (state.selectedCoffee) {
        store.brew.coffeeId = state.selectedCoffee.id as number;
    }

    if (state.selectedCoffeeType) {
        store.brew.coffeeTypeId = state.selectedCoffeeType?.id ?? 0;
    }

    route.query.id ? updateBrewPath() : createBrewPath();
}
</script>
<template>

    <form @submit.prevent="submit">
        <h2>Add Brew Form</h2>
        <hr>
        <div class="row">
            <h2>How does the coffee smell?</h2>
            <div class="col-md-6">
                <Question name="preGrindAroma" tooltip="Write the smell of the coffee before you grind your beans here."
                    label="Pre-grind" class="" :form-group="false" error="">
                    <Text id="preGrindAroma" type="text" v-model="store.brew.preGrindAroma"
                        :validation="validator.preGrindAroma" />
                </Question>
            </div>
            <div class="col-md-6">
                <Question name="postGrindAroma" tooltip="Write the smell of the coffee after you grind your beans here."
                    label="Post-grind" class="" :form-group="false" error="">
                    <Text id="postGrindAroma" type="text" v-model="store.brew.postGrindAroma"
                        :validation="validator.postGrindAroma" />
                </Question>
            </div>
        </div>
        <hr>
        <div class="row">
            <h2>How does the coffee Taste?</h2>
            <div class="col-md-6">
                <Question name="acidity" tooltip="How would you describe the acidity?" label="Acidity" class=""
                    :form-group="false" error="">
                    <Text id="acidity" type="text" v-model="store.brew.acidity" :validation="validator.acidity" />
                </Question>
            </div>
            <div class="col-md-6">
                <Question name="sweet" tooltip="How would you describe the sweetness?" label="Sweetness" class=""
                    :form-group="false" error="">
                    <Text id="sweet" type="text" v-model="store.brew.sweetness" :validation="validator.sweetness" />
                </Question>
            </div>
            <div class="col-md-6">
                <Question name="flavour" tooltip="How would you describe the flavour?" label="Flavour" class=""
                    :form-group="false" error="">
                    <Text id="flavour" type="text" v-model="store.brew.flavour" :validation="validator.flavour" />
                </Question>
            </div>
            <div class="col-md-6">
                <Question name="finish" tooltip="How would you describe the finish?" label="Finish" class=""
                    :form-group="false" error="">
                    <Text id="sweet" type="text" v-model="store.brew.finish" :validation="validator.finish" />
                </Question>
            </div>
        </div>
        <hr>
        <div class="row">
            <div class="col-md-6">
                <h2>How was the texture?</h2>
                <Question name="body" tooltip="How would you describe the texture?" label="Texture" class=""
                    :form-group="false" error="">
                    <Text id="body" type="text" v-model="store.brew.body" :validation="validator.body" />
                </Question>
            </div>
            <div class="col-md-6 mt-xs-4">
                <h2>Rate the Brew</h2>
                <Question name="coffee" tooltip="select a star to give your rating!" label="Rating" class=""
                    :form-group="true" error="">
                    <StarRating id="stars" :star-count="5" :model-value="store.brew.rating"
                        @update:model-value="store.brew.rating = $event" :validation="validator.rating" />
                </Question>
            </div>
        </div>
        <hr>
        <div class="row">
            <Search id="coffee-search" :modelValue="store.coffee" :suggestions="state.coffeeSuggestions"
                question="Which Coffee did you use?" label="Search for a coffee..." class="" error="" tooltip=""
                @search="store.coffee = $event; runCoffeeSearch();"
                @select-item="(value) => selectCoffee(value as coffee)" :validation="validator.coffeeId" />
            <Search id="type-search" :modelValue="store.coffeeType" :suggestions="state.coffeeTypeSuggestions"
                question="Which Coffee Type did you use?" label="Search for a type..." class="" error="" tooltip=""
                @search="store.coffeeType = $event; runCoffeeTypeSearch();"
                @select-item="(value) => selectCoffeeType(value as coffeeType)" :validation="validator.coffeeTypeId" />
        </div>
        <hr>
        <button type="submit" class="primary mt-10">
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