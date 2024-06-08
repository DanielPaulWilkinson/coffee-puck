<script setup lang="ts">
import { useCoffeeStore } from '../stores/addCoffee';

const store = useCoffeeStore();
import Question from './../components/fields/Question.vue';
import Text from './../components/fields/Text.vue';
import RadioSet from './fields/RadioSet.vue';
import Radio from './fields/Radio.vue';
import { inject, onMounted, reactive } from 'vue';
import { bean } from '../data/types';
import { getBeans, type BeanPaginationResponse } from '@/data/beans';
import Select from './fields/Select.vue';
import type { CreateNotification } from '@/services/notifications';
import Rating from '../components/fields/StarRating.vue';
const createNotification = <CreateNotification>inject("create-notification");
import VarietySearch from '../components/search/VarietySearch.vue';
import { createCoffee } from '@/data/coffee';

export type CoffeeViewState = {
    selectedBeans: bean[] | null,
    newBeans: bean[] | null,
    beanSuggestions: BeanPaginationResponse | null,
    beanSearch: string,
};

const state = reactive<CoffeeViewState>({
    selectedBeans: [],
    newBeans: [],
    beanSuggestions: null,
    beanSearch: "",
});

onMounted(async () => {
    store.$reset();
    state.beanSuggestions = await getBeans(1, 3, "id", "DESC", state.beanSearch);
});

const runBeanSearch = async () => state.beanSuggestions = await getBeans(1, 3, "id", "DESC", state.beanSearch);

const removeBean = async (index: number) => {
    if (store.beans[index]) {
        store.beans.splice(index, 1);
    }
}

const submit = async () => {
    store.coffee.beans = store.beans;
    const success = await createCoffee(store.coffee);

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

</script>
<template>
    <form @submit.prevent="submit">
        <h2>Add Coffee Form</h2>
        <hr>
        <div class="row">
            <h2>How does the coffee smell?</h2>
            <div class="col-6">
                <Question name="name" tooltip="" label="What is the name of the coffee?" class="" :form-group="false"
                    error="">
                    <Text id="name" type="text" v-model="store.coffee.name" class="input" />
                </Question>
            </div>
            <div class="col-6">
                <Question name="decaf" tooltip="" label="Is this coffee decaf?" class="" :form-group="false" error="">
                    <RadioSet id="decaf-group" name="decaf">
                        <Radio id="decaf" v-model="store.coffee.isDecaf" :value="true" title="Yes" />
                        <Radio id="decaf" v-model="store.coffee.isDecaf" :value="false" title="No" />
                    </RadioSet>
                </Question>
            </div>
            <div class="col-6">
                <Question name="path" tooltip="" label="What is the path of the image?" class="" :form-group="false"
                    error="">
                    <Text id="path" type="text" v-model="store.coffee.image" class="input" />
                </Question>
            </div>
            <div class="col-6">
                <Question name="cost" tooltip="" label="What is the cost of the coffee?" class="" :form-group="false"
                    error="">
                    <Text id="cost" type="text" v-model="store.coffee.cost" class="input" />
                </Question>
            </div>
            <div class="col-6">
                <Question name="cost" tooltip="" label="What is the recipe?" class="" :form-group="false" error="">
                    <Text id="cost" type="text" v-model="store.coffee.recipe" class="input" />
                </Question>
            </div>
            <div class="col-6">
                <Question name="cost" tooltip="" label="What is the size?" class="" :form-group="false" error="">
                    <Text id="cost" type="text" v-model="store.coffee.size" class="input" />
                </Question>
            </div>
            <div class="col-6">
                <h2>Rate the coffee</h2>
                <Question name="coffee" tooltip="" label="Rate your coffee out of 5?" class="" :form-group="true"
                    error="">
                    <Rating id="stars" :star-count="5" :model-value="store.coffee.rating"
                        @update:model-value="store.coffee.rating = $event" />
                </Question>
            </div>
            <div class="col-6">
                <Question name="roaster" tooltip="" label="Who is the roaster?" class="" :form-group="false" error="">
                    <Text id="roaster" type="text" v-model="store.coffee.roasterId" class="input" />
                </Question>
            </div>
        </div>
        <hr>
        <div class="row">
            <div class="col-12">
                <button value="Add Bean" @click.prevent="state.newBeans?.push({} as bean)">Add Bean</button>
            </div>
            <div v-for="(bean, i) in state.newBeans" class="col-6 mt-2">
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
                            <Select :id="`${i}-altitude`" placeholder="" v-model="bean.altitude" :options="[
        { value: 'Low Altitude', label: 'Low Altitude - Below 3,000 Feet' },
        { value: 'Medium Altitude', label: 'Medium Altitude - 3,000-4,000 Feet' },
        { value: 'High Altitude', label: 'High Altitude - 4,000-5,000 Feet' },
        { value: 'Very High Altitude', label: 'Very High Altitude - 5,000 Feet and Above' },
        { value: 'Unknown', label: 'Unknown' }
    ]" input-mode="text" type="text" class="input" />
                        </Question>
                        <Question :name="`${i}-process`" tooltip="" label="Process" class="" :form-group="false"
                            error="">
                            <Select :id="`${i}-process`" placeholder="" v-model="bean.process" :options="[
        { value: 'Natural', label: 'Natural' },
        { value: 'Washed', label: 'Washed' },
        { value: 'Honey', label: 'Honey' },
        { value: 'Unknown', label: 'Unknown' }
    ]" input-mode="text" type="text" class="input" />
                        </Question>
                        <Question :name="`${i}-producers`" tooltip="" label="Producers" class="" :form-group="false"
                            error="">
                            <Text :id="`${i}-producers`" v-model="bean.producers" input-mode="text" type="text"
                                class="input" />
                        </Question>
                        <Question :name="`${i}-roast`" tooltip="" label="Roast" class="" :form-group="false" error="">
                            <Select :id="`${i}-roast`" placeholder="" v-model="bean.roast" :options="[
        { value: 'Light', label: 'Light' },
        { value: 'Medium', label: 'Medium' },
        { value: 'Medium dark', label: 'Medium dark' },
        { value: 'Dark', label: 'Dark' }
    ]" input-mode="text" type="text" class="input" />
                        </Question>
                        <Question :name="`${i}-variety`" tooltip="" label="Variety" class="" :form-group="false"
                            error="">
                            <VarietySearch :id="`${i}-variety-search`" :model-value="bean.varietyId" @selected="bean.varietyId = $event"/>
                        </Question>
                        <div class="form-button-group">
                            <button class="btn btn-primary mt-2" @click.prevent="store.beans.push(bean)">Save</button>
                            <button class="btn btn-danger mt-2"
                                @click.prevent="state.newBeans?.splice(i, 1); removeBean(i);">Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <hr>
        <button type="submit" class="btn btn-primary margin-top-10 right">
            Submit
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