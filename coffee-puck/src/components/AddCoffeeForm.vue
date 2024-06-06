<script setup lang="ts">
import { useCoffeeStore } from '../stores/addCoffee';

const store = useCoffeeStore();
import Question from './../components/fields/Question.vue';
import Text from './../components/fields/Text.vue';
import RadioSet from './fields/RadioSet.vue';
import Radio from './fields/Radio.vue';
import { onMounted, reactive } from 'vue';
import type { bean } from '@/data/types';


export type CoffeeViewState = {
    selectedBeans: bean[] | null,
    BeanSuggestions: BeanPaginationResponse | null,
};

const state = reactive<CoffeeViewState>({
    selectedBeans: [],
    BeanSuggestions: null,
});

onMounted(() => {
    state.BeanSuggestions = await getBeans(1, 3, "id", "DESC", store.coffee);
}),

</script>
<template>
    <form>
        <h2>Add Coffee Form</h2>
        <hr>
        <div class="row">
            <h2>How does the coffee smell?</h2>
            <div class="col-6">
                <Question name="name" tooltip="" label="What is the name of the coffee?" class="" :form-group="false" error="">
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
                <Question name="path" tooltip="" label="What is the path of the image?" class="" :form-group="false" error="">
                    <Text id="path" type="text" v-model="store.coffee.image" class="input" />
                </Question>
            </div>
            <div class="col-6">
                <Question name="cost" tooltip="" label="What is the cost of the coffee?" class="" :form-group="false" error="">
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

        </div>
        <div class="row">
            <div class="col-12">
                <Question name="bean-search" tooltip="" label="What beans are in this coffee?" class="" :form-group="false" error="">
                    <Text id="bean-search" type="text" v-model="store.coffee.cost" class="input" />
                </Question>
            </div>
            <div class="col-12">
                <div class="card" v-for="">

                </div>
            </div>
        </div>
        <hr>
    </form>
</template>