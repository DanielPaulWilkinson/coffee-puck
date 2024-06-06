<script setup lang="ts">
import { inject, onBeforeMount, onMounted, reactive, watch } from 'vue';
import { useBrewStore } from '../stores/addBrew'
import { type Brew, type Coffee } from '../stores/brewPagination';
import Question from './../components/FormElements/Question.vue';
import Text from './../components/FormElements/Text.vue';
import FillCoffee from '../components/FillCoffee.vue'
import { createBrew } from '../data/brew'
import type { CreateNotification } from '../services/notifications';
import StarRating from './FormElements/StarRating.vue';
import { getCoffee, getCoffees, type CoffeePaginationResponse } from '../data/coffee';
import { useRoute } from 'vue-router'
import { getTypePage, type CoffeeType, type CoffeeTypePaginationResponse } from '../data/coffeeTypes';
const store = useBrewStore();
const route = useRoute()
const createNotification = <CreateNotification>inject("create-notification");

export type BrewViewState = {
    coffeeTypeSearchIsOpen: boolean,
    selectedCoffee: Coffee | null,
    coffeeSuggestions: CoffeePaginationResponse | null,
    coffeeTypeSuggestions: CoffeeTypePaginationResponse | null
    suggestionMoreInformation: Coffee | null,
    submitSuccess: boolean,
    selectedCoffeeType: CoffeeType | null,
};

const state = reactive<BrewViewState>({
    coffeeTypeSearchIsOpen: false,
    selectedCoffee: null,
    selectedCoffeeType: null,
    coffeeSuggestions: null,
    coffeeTypeSuggestions: null,
    suggestionMoreInformation: null,
    submitSuccess: false,
});

onBeforeMount(async () => {
    const id = route.params.coffeeId
    store.brew = {} as Brew;
    if (id) {
        const coffee = await getCoffee(Number(id));
        if (coffee) {
            store.coffee = coffee.name;
            store.brew.coffeeId = coffee.id;
            state.coffeeSuggestions = await getCoffees(1, 3, "id", "DESC", store.coffee);
            await selectCoffee(coffee, 0);
        }
    } else {
        state.coffeeSuggestions = await getCoffees(1, 3, "id", "DESC", store.coffee);
    }

    state.coffeeTypeSuggestions = await getTypePage(1, 3, "id", "DESC", store.coffeeType);
})

const selectCoffee = async (coffee: Coffee, index: number) => {
    state.coffeeSuggestions?.data.forEach(card => {
        card.isSelected = false;
    });

    if (state.coffeeSuggestions) {
        state.coffeeSuggestions.data[index].isSelected = true;
        state.selectedCoffee = coffee;
    }
}

const runCoffeeSearch = async () => {
    state.coffeeSuggestions = await getCoffees(1, 3, "id", "DESC", store.coffee);
}

const runCoffeeTypeSearch = async () => {
    state.coffeeTypeSuggestions = await getTypePage(1, 3, "id", "DESC", store.coffeeType);
}

const selectCoffeeType = async (type: CoffeeType, index: number) => {
    state.coffeeTypeSuggestions?.data.forEach((card: CoffeeType) => {
        card.isSelected = false;
    });

    if (state.coffeeTypeSuggestions && type) {
        state.coffeeTypeSuggestions.data[index].isSelected = true;
        state.selectedCoffeeType = type;
    }
}

const submit = async () => {
    if (state.selectedCoffee) {
        store.brew.coffeeId = state.selectedCoffee.id;
    } else {
        store.brew.coffeeId = Number(route.params.coffeeId);
    }

    store.brew.coffeeTypeId =1;
    if (state.selectedCoffeeType) {
        store.brew.coffeeTypeId = state.selectedCoffeeType?.id;
    }
    state.submitSuccess = await createBrew(store.brew);

    if (state.submitSuccess) {
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

    <form @submit.prevent="submit" v-if="!state.submitSuccess">
        <h2>Add Brew Form</h2>
        <hr>
        <div class="row">
            <h2>How does the coffee smell?</h2>
            <div class="col-6">
                <Question name="preGrindAroma" tooltip="Before grinding the coffee beans, how do they smell?" label="Pre-Grind?" class="" :form-group="false" error="">
                    <Text id="preGrindAroma" type="text" v-model="store.brew.preGrindAroma" class="input" />
                </Question>
            </div>
            <div class="col-6">
                <Question name="postGrindAroma" tooltip="After grinding the coffee beans, how do they smell?" label="Post-Grind?" class="" :form-group="false" error="">
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
            <div class="col-6">
                <h2>Which Coffee did you use?</h2>
                <Question name="coffee" tooltip="" label="Search for a coffee..." class="" :form-group="true" error="">
                    <Text pre input-mode="text" id="coffee" type="text" v-model="store.coffee"
                        placeholder="search..." error="" @input="runCoffeeSearch" class="input" prepend-class="icon">
                        <template #append>
                        <font-awesome-icon :icon="['fas', 'search']" />
                    </template>
                    </Text>
                </Question>

                <div class="row mt-2" v-if="state.coffeeSuggestions">
                    <div class="col-md-4 col-sm-6 col-xs-6" v-for="(coffee, index) in state.coffeeSuggestions.data">
                        <div class="card selectable" :class="{ 'selected': coffee.isSelected }"
                            @click="selectCoffee(coffee, index);">
                            <img src="https://howdencoffee.co.uk/wp-content/uploads/2022/08/HC-116.jpg"
                                class="card-img-top" alt="...">
                            <div class="card-body">
                                <h5 class="card-title">{{ coffee.name }}</h5>
                                <a href="#" class="btn btn-primary" data-bs-toggle="modal"
                                    data-bs-target="#exampleModal"
                                    @click.prevent="state.suggestionMoreInformation = coffee;">View</a>
                            </div>
                            <div v-if="coffee.isSelected" class="check">
                                <img src="../assets/check.svg" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-6">
                <h2>What coffee type did you brew?</h2>

                <Question name="coffeeType" tooltip="" label="What type of coffee did you brew?" class=""
                    :form-group="true" error="">
                    <Text input-mode="text" id="coffeeType" type="text" v-model="store.coffeeType"
                        placeholder="search..." error="" @blur="state.coffeeTypeSearchIsOpen = false"
                        @input="runCoffeeTypeSearch" class="input" prepend-class="icon">
                        <template #append>
                        <font-awesome-icon :icon="['fas', 'search']" />
                    </template>
                    </Text>
                </Question>

                <div class="row mt-2" v-if="state.coffeeTypeSuggestions">
                    <div class="col-md-4 col-sm-6 col-xs-6" v-for="(type, index) in state.coffeeTypeSuggestions.data">
                        <div class="card selectable" :class="{ 'selected': type.isSelected }"
                            @click="selectCoffeeType(type, index);">
                            <div class="card-top">
                                <FillCoffee v-if="type.icon === 'espresso'" :id="type.icon" :type="type.name"
                                    :espresso-delay="1000" :espresso-percent="16" />
                                <FillCoffee v-if="type.icon === 'double-espresso'" id="double-espresso"
                                    :type="type.name" :espresso-delay="1000" :espresso-percent="32" />
                                <FillCoffee v-if="type.icon === 'cafe-latte'" id="latte" :type="type.name"
                                    :espresso-delay="1000" :milk-delay="2000" :espresso-percent="16"
                                    :milk-percent="84" />
                                <FillCoffee v-if="type.icon === 'americano'" id="americano" :type="type.name"
                                    :coffee-delay="1000" :coffee-percent="100" />
                                <FillCoffee v-if="type.icon === 'long-black'" id="long-black" :type="type.name"
                                    :coffee-delay="1000" :coffee-percent="100" />
                            </div>
                            <div class="card-body text-center">
                                <h5 class="card-title">{{ type?.name }}</h5>
                                <i> {{ type?.ratio }}</i>
                            </div>
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
   
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">{{ state.suggestionMoreInformation?.name }}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    {{ state.suggestionMoreInformation?.name }}
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Select</button>
                </div>
            </div>
        </div>
    </div>
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
}
</style>