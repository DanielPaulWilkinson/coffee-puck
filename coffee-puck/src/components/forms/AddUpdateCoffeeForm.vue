<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import { useRoute } from 'vue-router';
import useVuelidate from '@vuelidate/core';

import type { bean, variety } from '@/data/types';
import type { BeanPaginationResponse } from '@/data/beans';

import Question from '@/components/layout/Question.vue';
import Text from '@/components/fields/Text.vue';
import VarietySearch from '@/components/search/VarietySearch.vue';
import Rating from '@/components/fields/StarRating.vue';
import RadioSet from '@/components/fields/RadioSet.vue';
import Radio from '@/components/fields/RadioInput.vue';
import RoasterSearch from '../search/RoasterSearch.vue';
import Select from '@/components/fields/Select.vue';

import { useAppStore } from "@/stores/app";
import { useCoffeeStore } from '@/stores/addCoffee';

import { createCoffee, getCoffee, updateCoffee } from '@/data/coffee';
import { getRoaster } from '@/data/roasters';

import { coffeeAltitude, coffeeProcess, coffeeRoast } from "@/utils/consts";
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
};

const state = reactive<CoffeeViewState>({
    selectedBeans: [],
    newBeans: [],
    beanSuggestions: null,
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

const removeBean = async (index: number) => {
    if (store.beans[index]) {
        store.beans.splice(index, 1);
    }
}

const setSelectedVariety = (index: number, variety: variety) => {
    if (state.newBeans) {
        state.newBeans[index].variety = variety;
    }
}

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

    store.coffee.beans = state.newBeans as bean[];
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
                    <RoasterSearch id="roaster-search" :model-value="state.selectedRoaster"
                        @selected="store.coffee.roasterId = $event" :validaton="validator.roasterId" />
                </Question>
            </div>
        </div>
        <hr>
        <div class="row">
            <div class="col-12">
                <button value="Add Bean" @click.prevent="state.newBeans?.push({} as bean)">Add Bean</button>
            </div>
            <div v-for="(bean, i) in state.newBeans" class="col-md-6 mt-2">
                <div class="bean">
                    <div class="row">
                        <div class="col-6">
                            <h1>Bean {{ i + 1 }}</h1>
                        </div>
                        <div class="col-6">
                            <font-awesome-icon class="shevron" :icon="['fas', 'chevron-up']" />
                        </div>
                    </div>

                    <div>
                        <Question :name="`${i}-altitude`" tooltip="" label="Altitude" class="" :form-group="false"
                            error="">
                            <Select :id="`${i}-altitude`" placeholder="" v-model="bean.altitude"
                                :options="coffeeAltitude" />
                        </Question>
                        <Question :name="`${i}-process`" tooltip="" label="Process" class="" :form-group="false"
                            error="">
                            <Select :id="`${i}-process`" placeholder="" v-model="bean.process"
                                :options="coffeeProcess" />
                        </Question>
                        <Question :name="`${i}-producers`" tooltip="" label="Producers" class="" :form-group="false"
                            error="">
                            <Text :id="`${i}-producers`" v-model="bean.producers" input-mode="text" type="text" />
                        </Question>
                        <Question :name="`${i}-roast`" tooltip="" label="Roast" class="" :form-group="false" error="">
                            <Select :id="`${i}-roast`" placeholder="" v-model="bean.roast" :options="coffeeRoast" />
                        </Question>
                        <Question :name="`${i}-variety`" tooltip="" label="Variety" class="" :form-group="false"
                            error="">
                            <VarietySearch :id="`${i}-variety-search`" :model-value="bean.variety?.name"
                                @selected="setSelectedVariety(i, $event as variety)" />
                        </Question>
                        <div class="form-button-group">
                            <button class="btn btn-danger mt-2"
                                @click.prevent="state.newBeans?.splice(i, 1); removeBean(i);">Delete</button>
                        </div>
                    </div>
                </div>
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