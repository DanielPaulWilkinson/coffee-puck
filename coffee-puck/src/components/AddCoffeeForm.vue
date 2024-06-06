<script setup lang="ts">
import { useCoffeeStore } from '../stores/addCoffee';

const store = useCoffeeStore();
import Question from './../components/FormElements/Question.vue';
import Text from './../components/FormElements/Text.vue';
import RadioSet from './FormElements/RadioSet.vue';
import Radio from './FormElements/Radio.vue';
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
        </div>
        <hr>
    </form>
</template>