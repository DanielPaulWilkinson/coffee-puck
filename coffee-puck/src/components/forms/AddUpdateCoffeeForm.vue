<script setup lang="ts">
import { computed, onMounted, reactive } from 'vue';
import { useRoute } from 'vue-router';
import useVuelidate from '@vuelidate/core';

import type { bean, roaster, variety } from '@/data/types';
import type { BeanPaginationResponse } from '@/data/beans';

import Question from '@/components/layout/Question.vue';
import Text from '@/components/fields/Text.vue';
import Rating from '@/components/fields/StarRating.vue';
import RadioSet from '@/components/fields/RadioSet.vue';
import Radio from '@/components/fields/RadioInput.vue';
import AutoComplete, { Suggestion } from '../fields/AutoComplete.vue';
import AddBeanToCoffee from '../layout/AddBeanToCoffee.vue';

import { useAppStore } from "@/stores/app";
import { useCoffeeStore } from '@/stores/addCoffee';

import { createCoffee, getCoffee, updateCoffee } from '@/data/coffee';
import { getRoaster, getRoasters, roastersPaginationResponse } from '@/data/roasters';

import { coffeeFormValidator } from '@/validation/validators';

const route = useRoute();
const store = useCoffeeStore();
const app = useAppStore();
const v$ = useVuelidate();
const validator = coffeeFormValidator(store);

export type CoffeeViewState = {
    selectedBeans: bean[] | null,
    selectedRoaster: string,
    newBeans: bean[] | null,
    beanSuggestions: BeanPaginationResponse | null,
    beanSearch: string,
    roasterSuggestions: roastersPaginationResponse | null,
};

const state = reactive<CoffeeViewState>({
    selectedBeans: [],
    newBeans: [],
    beanSuggestions: null,
    roasterSuggestions: null,
    beanSearch: "",
    selectedRoaster: "",
});

onMounted(async () => {
    store.$reset();
    const id = route.query.id;
    if (id) {
        const coffee = await getCoffee(Number(id));
        if (coffee) {
            store.coffee = coffee;
            state.newBeans = coffee.beans;
            const roaster = await getRoaster(coffee.roasterId);
            state.selectedRoaster = roaster.name;
        }
    }
});

const updateCoffeePath = async () => {
    const success = await updateCoffee(store.coffee);
    if (success) {
        app.addNotification({
            notificationType: 'success',
            message: 'Successfully updated coffee',
            title: "Success",
            autoClose: true,
            duration: 15,
        });
    } else {
        app.addNotification({
            notificationType: 'error',
            message: 'Could not update coffee',
            title: "Error",
            autoClose: true,
            duration: 15,
        });
    }
}

async function callRoasterData(page: number, search?: string) {
    state.roasterSuggestions = await getRoasters(page, 5, "id", "DESC", search);
}

const roasterSuggestions = computed(() => state.roasterSuggestions?.data.map((e: roaster) => { return { id: e.id, name: e.name, type: e.name } }))


const createCoffeePath = async () => {
    const success = await createCoffee(store.coffee);
    if (success) {
        app.addNotification({
            notificationType: 'success',
            message: 'Successfully created coffee',
            title: "Success",
            autoClose: true,
            duration: 15,
        });
    } else {
        app.addNotification({
            notificationType: 'error',
            message: 'Could not create coffee',
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

    route.query.id ? updateCoffeePath() : createCoffeePath();
}
</script>
<template>
    <form @submit.prevent="submit">
        <h2>Add Coffee Form</h2>
        <hr>
        <div class="row">
            <h2>Give us some basic information about the coffee?</h2>
            <div class="col-sm-6 col-md-6">
                <Question name="decaf" tooltip="" label="Is this coffee decaf?" class="" :form-group="false" error="">
                    <RadioSet id="decaf-group" name="decaf" v-model="store.coffee.isDecaf"
                        :validation="validator.isDecaf">
                        <Radio id="decaf" v-model="store.coffee.isDecaf" :value="true" title="Yes"
                            :validation="validator.isDecaf" />
                        <Radio id="decaf" v-model="store.coffee.isDecaf" :value="false" title="No"
                            :validation="validator.isDecaf" />
                    </RadioSet>
                </Question>
            </div>
            <div class="col-sm-6 col-md-6">
                <Question name="coffee" tooltip="" label="What was the rating?" class="" :form-group="true" error="">
                    <Rating id="stars" :star-count="5" :model-value="store.coffee.rating"
                        @update:model-value="store.coffee.rating = $event" :validation="validator.rating" />
                </Question>
            </div>
            <div class="col-md-6">
                <Question name="name" tooltip="" label="What is the name of the coffee?" class="" :form-group="false"
                    error="">
                    <Text id="name" type="text" v-model="store.coffee.name" :validation="validator.name" />
                </Question>
            </div>
            <div class="col-md-6">
                <Question name="path" tooltip="" label="What is the path of the image?" class="" :form-group="false"
                    error="">
                    <Text id="path" type="text" v-model="store.coffee.image" :validation="validator.image" />
                </Question>
            </div>
            <div class="col-md-6">
                <Question name="cost" tooltip="" label="What is the cost of the coffee?" class="" :form-group="false"
                    error="">
                    <Text id="cost" type="text" v-model="store.coffee.cost" :validation="validator.cost" />
                </Question>
            </div>
            <div class="col-md-6">
                <Question name="recipe" tooltip="" label="What is the recipe?" class="" :form-group="false" error="">
                    <Text id="recipe" type="text" v-model="store.coffee.recipe" :validation="validator.recipe" />
                </Question>
            </div>
            <div class="col-md-6">
                <Question name="size" tooltip="" label="What is the size?" class="" :form-group="false" error="">
                    <Text id="size" type="text" v-model="store.coffee.size" :validation="validator.size" />
                </Question>
            </div>
            <div class="col-md-6">
                <Question name="roaster" tooltip="" label="Who is the roaster?" class="" :form-group="false" error="">
                    <AutoComplete id="roaster-search" :search="state.selectedRoaster"
                        :placeholder="state.selectedRoaster" not-found-message="No roasters found"
                        :suggestions="roasterSuggestions as Suggestion[]" :validation="validator.roasterId"
                        @update:suggestion="callRoasterData(1, $event)"
                        @click:suggestion="store.coffee.roasterId = $event.id as number" />
                </Question>
            </div>
        </div>
        <hr>
        <div class="row">
            <div class="col-12">
                <button value="Add Bean" @click.prevent="store.coffee.beans?.push({} as bean)">Add Bean</button>
            </div>
            <div v-for="(bean, index) in store.coffee.beans" class="col-md-6 mt-2">
                <AddBeanToCoffee :id="index"  />
            </div>
        </div>
        <hr>
        <button type="submit" class="btn btn-primary margin-top-10 right">
            {{ route.query.id ? "Update Coffee" : "Add Coffee" }}
        </button>
    </form>
</template>
<style>
.bean {
    padding: 10px;
    border: 1px solid #765;
    border-radius: 10px;
}

.form-button-group {
    text-align: right;
}

.shevron {
    float: right;
    height: 40px;
    cursor: pointer;
}

button {
    margin-right: 10px;
}
</style>