
<script setup lang="ts">
import { inject, onBeforeMount, onMounted, reactive, watch } from 'vue';
import { useBrewStore } from '../stores/brew'
import { type Brew, type Coffee } from '../stores/coffeeStore';
import Question from './../components/FormElements/Question.vue';
import Text from './../components/FormElements/Text.vue';
import FillCoffee from '../components/FillCoffee.vue'
import { createBrew } from '../data/brew'
import type { CreateNotification } from '../services/notifications';
import StarRating from '../components/FormElements/StarRating.vue';
import { getCoffee, getCoffeePage, type CoffeePaginationResponse } from '../data/coffee';
import { useRoute } from 'vue-router'
import  { getTypePage, type CoffeeType, type CoffeeTypePaginationResponse } from '../data/coffeeTypes';
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
    hasSubmitted: boolean,
    selectedCoffeeType: CoffeeType | null,
}

const state = reactive<BrewViewState>({
    coffeeTypeSearchIsOpen: false,
    selectedCoffee: null,
    selectedCoffeeType: null,
    coffeeSuggestions: null,
    coffeeTypeSuggestions: null,
    suggestionMoreInformation: null,
    submitSuccess: false,
    hasSubmitted: false,
})

onMounted(async () => {
    const id = route.params.coffeeId

})

onBeforeMount(async () => {
    const id = route.params.coffeeId
    store.brew = {} as Brew;
    if (id) {
        const coffee = await getCoffee(Number(id));
        if(coffee){
            store.coffee = coffee.name;
            store.brew.coffeeId = coffee.id;
            state.coffeeSuggestions = await getCoffeePage(1, 3, "id", "DESC", store.coffee);
            await selectCoffee(coffee, 0);
        }
    } else {
        state.coffeeSuggestions = await getCoffeePage(1, 3, "id", "DESC", store.coffee);
    }

    state.coffeeTypeSuggestions = await getTypePage(1, 3, "id", "DESC", store.coffeeType);
})

const selectCoffee = async (coffee: Coffee, index: number) => {
    state.coffeeSuggestions?.data.forEach(card => {
        card.isSelected = false;
    });

    if(state.coffeeSuggestions){
        state.coffeeSuggestions.data[index].isSelected = true;
        state.selectedCoffee = coffee;
    }
}

const runCoffeeSearch = async () => {
    state.coffeeSuggestions = await getCoffeePage(1, 3, "id", "DESC", store.coffee);
}

const runCoffeeTypeSearch = async () => {
    state.coffeeTypeSuggestions = await getTypePage(1, 3, "id", "DESC", store.coffeeType);
}


const selectCoffeeType = async (type: CoffeeType, index: number) => {
    state.coffeeTypeSuggestions?.data.forEach((card: CoffeeType) => {
        card.isSelected = false;
    });

    if(state.coffeeTypeSuggestions && type){
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

    if(state.selectedCoffeeType){
        store.brew.coffeeTypeId = state.selectedCoffeeType?.id;
    }
    state.hasSubmitted = true;
    state.submitSuccess = await createBrew(store.brew);

    if(state.submitSuccess){
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
        <div class="row">
            <div class="col-12">
                <form @submit.prevent="submit" v-if="!state.submitSuccess">
                    <h2>Smell</h2>
                    <Question name="preGrindAroma" tooltip="" label="How does it smell pregrind?"
                        class="" :form-group="false" error="">
                        <template #input>
                            <Text id="preGrindAroma" type="text" v-model="store.brew.preGrindAroma" />
                        </template>
                    </Question>
                    <Question name="postGrindAroma" tooltip="" label="How does it smell postgrind?"
                        class="" :form-group="false" error="">
                        <template #input>
                            <Text id="postGrindAroma" type="text" v-model="store.brew.postGrindAroma" />
                        </template>
                    </Question>

                    <h2>Taste</h2>
                    <Question name="acidity" tooltip="" label="How acidic was it?" class=""
                        :form-group="false" error="">
                        <template #input>
                            <Text id="acidity" type="text" v-model="store.brew.acidity" />
                        </template>
                    </Question>
                    <Question name="sweet" tooltip="" label="How sweet was it?" class="" :form-group="false"
                        error="">
                        <template #input>
                            <Text id="sweet" type="text" v-model="store.brew.sweetness" />
                        </template>
                    </Question>
                    <Question name="flavour" tooltip="" label="How did it taste?" class="" :form-group="false"
                        error="">
                        <template #input>
                            <Text id="flavour" type="text" v-model="store.brew.flavour" />
                        </template>
                    </Question>
                    <Question name="finish" tooltip="" label="How was the aftertaste?" class=""
                        :form-group="false" error="">
                        <template #input>
                            <Text id="sweet" type="text" v-model="store.brew.finish" />
                        </template>
                    </Question>

                    <h2>Texture</h2>
                    <Question name="body" tooltip="" label="How was the texture?" class=""
                        :form-group="false" error="">
                        <template #input>
                            <Text id="body" type="text" v-model="store.brew.body" />
                        </template>
                    </Question>
                    <Question name="coffee" tooltip="" label="What coffee was this?" class="" :form-group="true"
                        error="">
                        <template #input>
                            <Text prepend="Search" input-mode="text" id="coffee" type="text" v-model="store.coffee"
                                placeholder="search..." error="" @input="runCoffeeSearch"/>
                        </template>
                    </Question>

                    <div class="row" v-if="state.coffeeSuggestions">
                        <div class="col-md-4 col-sm-6 col-xs-6" v-for="(coffee, index) in state.coffeeSuggestions.data">
                            <div class="card selectable" :class="{ 'selected': coffee.isSelected }"
                                @click="selectCoffee(coffee, index);">
                                <img src="https://howdencoffee.co.uk/wp-content/uploads/2022/08/HC-116.jpg"
                                    class="card-img-top" alt="...">
                                <div class="card-body">
                                    <h5 class="card-title">{{ coffee.name }}</h5>
                                    <StarRating id="stars" :fill-percentage="50" :star-count="5" />
                                    <a href="#" class="btn btn-primary" data-bs-toggle="modal"
                                        data-bs-target="#exampleModal"
                                        @click.prevent="$event.stopPropagation(); state.suggestionMoreInformation = coffee;">View</a>
                                </div>
                                <div v-if="coffee.isSelected" class="check">
                                    <img src="../assets/check.svg" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <Question name="coffeeType" tooltip="" label="What type of coffee did you brew?" class="" :form-group="true"
                        error="">
                        <template #input>
                            <Text prepend="Search" input-mode="text" id="coffeeType" type="text" v-model="store.coffeeType"
                                placeholder="search..." error="" @blur="state.coffeeTypeSearchIsOpen = false"
                                @input="runCoffeeTypeSearch" />
                        </template>
                    </Question>

                    <div class="row" v-if="state.coffeeTypeSuggestions">
                        <div class="col-md-4 col-sm-6 col-xs-6" v-for="(type, index) in state.coffeeTypeSuggestions.data">
                            <div class="card selectable" :class="{ 'selected': type.isSelected }" @click="selectCoffeeType(type, index);">
                                <div class="card-top">
                                    <FillCoffee
                                        v-if="type.icon === 'espresso'"
                                        :id="type.icon"
                                        :type="type.name"
                                        :espresso-delay="1000"
                                        :espresso-percent="16"
                                    />
                                    <FillCoffee
                                        v-if="type.icon === 'double-espresso'"
                                        id="double-espresso"
                                        :type="type.name"
                                        :espresso-delay="1000"
                                        :espresso-percent="32"
                                    />
                                    <FillCoffee
                                        v-if="type.icon === 'cafe-latte'"
                                        id="latte"
                                        :type="type.name"
                                        :espresso-delay="1000"
                                        :milk-delay="2000"
                                        :espresso-percent="16"
                                        :milk-percent="84"
                                    />
                                    <FillCoffee
                                        v-if="type.icon === 'americano'"
                                        id="americano"
                                        :type="type.name"
                                        :coffee-delay="1000"
                                        :coffee-percent="100"
                                    />
                                    <FillCoffee
                                        v-if="type.icon === 'long-black'"
                                        id="long-black"
                                        :type="type.name"
                                        :coffee-delay="1000"
                                        :coffee-percent="100"
                                    />
                                </div>
                                <div class="card-body text-center">
                                    <h5 class="card-title">{{ type?.name }}</h5>
                                    <i> {{ type?.ratio }}</i>
                            </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <StarRating id="stars" :fill-percentage="10" :star-count="5"/>
                    </div>
                    <button type="submit" class="btn btn-primary margin-top-10 right">
                        Submit
                    </button>
                </form>
                <div class="table-responsive" v-if="state.submitSuccess">
                    <h1>You told us:</h1>
                    <p>You drank a {{ state.selectedCoffeeType?.name }} with beans from {{ state.selectedCoffee?.name }}</p>
                    <table class="table table-dark">
                        <thead>
                            <tr>
                                <th scope="col">preGrindAroma</th>
                                <th scope="col">postGrindAroma</th>
                                <th scope="col">Acidity</th>
                                <th scope="col">sweet</th>
                                <th scope="col">flavour</th>
                                <th scope="col">finish</th>
                                <th scope="col">body</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{{ store.brew.preGrindAroma }}</td>
                                <td>{{ store.brew.postGrindAroma }}</td>
                                <td>{{ store.brew.acidity }}</td>
                                <td>{{ store.brew.sweetness }}</td>
                                <td>{{ store.brew.flavour }}</td>
                                <td>{{ store.brew.finish }}</td>
                                <td>{{ store.brew.body }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
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
        </div>
</template>
<style>
.background {
    background-image: url('https://mdbcdn.b-cdn.net/img/new/slides/041.webp');
    ;
}

.mask {
    background-color: rgba(0, 0, 0, 0.6);
    padding: 20px;
}
</style>